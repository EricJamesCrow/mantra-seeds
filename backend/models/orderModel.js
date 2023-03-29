const mongoose = require('mongoose');
const validator = require('validator');

const orderSchema = new mongoose.Schema({
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
    payment: {
        type: String,
        ref: 'Payment',
        required: true
    },
    total: {
        type: Number,
        ref: 'Total',
        required: false
    },
    date: {
        type: Date,
        default: Date.now()
    },
    orderNumber: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

orderSchema.statics.createOrder = async (cart, address, items, email, shipping, payment, total) => {
    try {
    // await Order.validateOrder(user, address, items, email, shipping, payment)

    // create order
    const order = await Order.create({
        cart,
        address,
        items,
        email,
        shipping,
        payment,
        total,
    });
    return order;
    } catch (error) {
        console.log(error);
    }
}

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
