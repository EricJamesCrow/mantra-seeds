const mongoose = require('mongoose');
const validator = require('validator');
const Product = require('./productModel');
const Cart = require('./cartModel');
// aws
const { sendEmail } = require('../helpers/mailgun-helper');
// decryption
const { decrypt, decryptAddress } = require('../helpers/encryption-helper');
// email
const orderConfirmationEmail = require('../email_templates/order-confirmation');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    address:{
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        apt: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: false
        }
    },
    items:[{
        name: {
            type: String,
            ref: 'Name',
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            ref: 'Quantity',
            required: true
        },
        price: {
            type: Number,
            ref: 'Price',
            required: true
        }
    }],
    email: {
        type: String,
        ref: 'Email',
        required: true
    },
    shipping: 
        {
            delivery:{
                type: String,
                ref: 'Delivery',
                required: true
            },
            price:{
                type: Number,
                ref: 'Price',
                required: true
            },
            expected: {
                type: Date,
                ref: 'Expected',
                required: false
            }
        }
    ,
    total: {
        type: Number,
        ref: 'Total',
        required: false
    },
    refund: {
        type: Boolean,
        ref: 'Refund',
        required: false
    },
    deliveryStatus: {
        type: String,
        ref: 'DeliveryStatus',
        default: 'Not Shipped',
        enum: ['Not Shipped', 'Shipped', 'Delivered']
    },
    orderNumber: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

const generateOrderDetailsHtml = (items) => {
    return items.map(item => {
      return `<li>${item.name} (Quantity: ${item.quantity}, Price: ${(item.price / 100).toFixed(2)})</li>`;
    }).join('');
  };

  orderSchema.statics.updateInventory = async function(items, cartId) {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const cart = await Cart.findById(cartId).session(session);
      
      for (const item of items) {
        const product = await Product.findById(item.product).session(session);
        
        if (product) {
          product.quantity -= item.quantity;
          product.reserved -= item.quantity;
          await product.save({ session });
  
          const cartItem = cart.cartItems.find(c => c.product._id.equals(item.product));
          if (cartItem) {
            cartItem.reservationTimestamp = null;
          }
        }
      }
  
      cart.markModified('cartItems');
      await cart.save({ session });
  
      await session.commitTransaction();
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  };
  
  
orderSchema.statics.createOrder = async (user, transaction, cart, address, items, email, shipping, total, checkInventoryResult) => {
try {
    let refund = false;

    if (!checkInventoryResult) {
      refund = true;
    }

    // create order
    const order = await Order.create({
    user,
    transaction,
    cart,
    address,
    items,
    email,
    shipping,
    total,
    refund
    });

    const getOrderWithTransactionAndProductDetails = async (orderId) => {
        const result = await Order.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(orderId),
                },
            },
            {
                $lookup: {
                    from: 'transactions',
                    localField: 'transaction',
                    foreignField: '_id',
                    as: 'transaction',
                },
            },
            { $unwind: "$items" },
            {
                $lookup: {
                    from: 'products',
                    localField: 'items.product',
                    foreignField: '_id',
                    as: 'items.product',
                },
            },
            { $unwind: "$items.product" },
            {
                $group: {
                    _id: "$_id",
                    items: { $push: "$items" },
                    transaction: { $first: "$transaction" }
                    // Add any other fields from the Order document that you need
                }
            }
        ]);
        return result[0];
    };
    

    const orderWithDetails = await getOrderWithTransactionAndProductDetails(order._id);

    const decryptedAddress = decryptAddress(address);

    const formattedAddress = `
        ${decryptedAddress.firstName} ${decryptedAddress.lastName}<br>
        ${decryptedAddress.street}<br>
        ${decryptedAddress.city}, ${decryptedAddress.state} ${decryptedAddress.zip}<br>
        United States
        `;

    const decryptedEmail = decrypt(email);

    let itemsHtml = '';
    for (const item of orderWithDetails.items) {
        itemsHtml += `
        <div style="margin: 12px">
            <div style="border-radius: 5px; padding: 12px 0; margin: 12px 0; width: 100%; max-width: 520px; margin: 0 auto;">
                <table style="width: 100%;">
                    <tr>
                        <td>
                            <img src="${item.product.image}" style="width: 150px; height: 150px; border-radius: 5px; margin-left: 12px;" />
                        </td>
                        <td style="margin-left: 12px; font-weight: 400; font-size: 16px; text-align: left;">
                            <p>Item: ${item.name}</p>
                            <p>QTY: ${item.quantity}</p>
                            <p>Price: $${(item.price / 100).toFixed(2)}</p>
                            <p>Subtotal: $${((item.price * item.quantity) / 100).toFixed(2)}</p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>`;
    }

    let subject, html;

    if (checkInventoryResult) {
       await Order.updateInventory(items, cart);
       subject = `Order ${order.orderNumber} confirmation`;
       html = orderConfirmationEmail(order, itemsHtml, decryptedAddress, orderWithDetails, total)
    } else {
        subject = `Order ${order.orderNumber} confirmation (Inventory Error)`;
        html = `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order at Mantra Seeds! Your order details are as follows:</p>
        <ul>
        ${generateOrderDetailsHtml(items)}
        </ul>
        <p><strong>Shipping Address:</strong></p>
        <p>${formattedAddress}</p>
        <p><strong>Shipping Method:</strong> ${shipping.delivery}</p>
        <p><strong>Total:</strong> ${(total / 100).toFixed(2)} (USD)</p>
        <p>Unfortunately, one or more of the items in your order is out of stock. We apologize for the inconvenience. Please contact our support team for more information.</p>
    `
    }

    // Send order confirmation email
    const emailParams = {
    from: process.env.ORDER_CONFIRMATION_EMAIL,
    to: decryptedEmail,
    subject: subject,
    html: html
    };

    await sendEmail(emailParams);

    return order;
} catch (error) {
    console.log(error);
    throw error;
}
};
  
orderSchema.statics.validateOrder = async function(user, address, items, email, shipping, payment, total) {
    // validation
    if (!user || !address || !items || !email || !shipping || !payment) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    for (const key in address) {
        if (!address[key]) {
            throw Error(`Address ${key} is required`);
        }
    }
    items.forEach(item => {
        if (!validator.isNumeric(item.quantity.toString()) || !validator.isNumeric(item.price.toString())) {
            throw Error('Quantity and Price must be numbers');
        }
    });
    if (!validator.isNumeric(shipping.price.toString())) {
        throw Error('Shipping Price must be a number');
    }
};


orderSchema.pre('save', function(next) {
    // Generate random order number
    if (!this.orderNumber) {
        const currentDate = new Date();
        const year = currentDate.getFullYear().toString().slice(-2);
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        let randomNumber = Math.floor(1000 + Math.random() * 9000).toString();
        let orderNumbers = this.constructor.find({}).select('orderNumber').exec();
        orderNumbers.then(numbers => {
            while(numbers.includes(`MS${year}${month}${randomNumber}`)) {
                randomNumber = Math.floor(1000 + Math.random() * 9000).toString();
            }
            this.orderNumber = `MS${year}${month}${randomNumber}`;
            next();
        });
    } else {
        next();
    }
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
