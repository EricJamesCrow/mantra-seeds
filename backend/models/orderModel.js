const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
