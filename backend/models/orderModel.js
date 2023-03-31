const mongoose = require('mongoose');
const validator = require('validator');
process.env.ORDER_CONFIRMATION_EMAIL
// aws
const { sendEmail } = require('../helpers/ses-helper');
// decryption
const { decryptAddress } = require('../helpers/encryption');

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
  
orderSchema.statics.createOrder = async (user, transaction, cart, address, items, email, shipping, total) => {
try {
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
    });

    const decryptedAddress = decryptAddress(address);

    const formattedAddress = `
        ${decryptedAddress.firstName} ${decryptedAddress.lastName}<br>
        ${decryptedAddress.street}<br>
        ${decryptedAddress.city}, ${decryptedAddress.state} ${decryptedAddress.zip}<br>
        United States
        `;

    // Send order confirmation email
    const emailParams = {
    from: process.env.ORDER_CONFIRMATION_EMAIL,
    to: email,
    subject: `Order ${order.orderNumber} confirmation`,
    html: `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order at Mantra Seeds! Your order details are as follows:</p>
        <ul>
        ${generateOrderDetailsHtml(items)}
        </ul>
        <p><strong>Shipping Address:</strong></p>
        <p>${formattedAddress}</p>
        <p><strong>Shipping Method:</strong> ${shipping.delivery}</p>
        <p><strong>Total:</strong> ${(total / 100).toFixed(2)} (USD)</p>
        <p>If you have any questions, please contact our support team.</p>
    `
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
