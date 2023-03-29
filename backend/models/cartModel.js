const mongoose = require('mongoose');
const crypto = require('crypto');
const fs = require('fs');
const PUBLIC_KEY = fs.readFileSync('./public.pem', 'utf8');

const cartSchema = new mongoose.Schema({
    cartItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    subtotal: {
        type: Number,
        ref: 'Subtotal',
        required: false
    },
    address:{
        firstName: {
            type: String,
            required: false
        },
        lastName: {
            type: String,
            required: false
        },
        street: {
            type: String,
            required: false
        },
        apt: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false
        },
        zip: {
            type: String,
            required: false
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
    shipping: 
    {
        delivery:{
            type: String,
            ref: 'Delivery',
            required: false
        },
        price:{
            type: Number,
            ref: 'Price',
            required: false
        },
        expected: {
            type: Date,
            ref: 'Expected',
            required: false
        }
    },
    email: {
        type: String,
        ref: 'Email',
        required: false
    }
}, {
    timestamps: true
});

cartSchema.statics.encryptAddress = async function(address) {
    try {
    Object.keys(address).forEach(property => {
        const buffer = Buffer.from(address[property], 'utf8');
        const encrypted = crypto.publicEncrypt({ key: PUBLIC_KEY, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, buffer);
        address[property] = encrypted.toString('base64')
        return address;
    });
    } catch (err) {
        console.log(err)
    }
}

cartSchema.statics.deleteCart = async (id) => {
    try {
        const cart = await Cart.findOne({ _id: id });
        if (!cart) {
            throw new Error("Cart not found");
        }
        await Cart.deleteOne({ _id: id });
        return { success: "Cart deleted successfully" };
    } catch (error) {
        throw new Error(error);
    }
};

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
