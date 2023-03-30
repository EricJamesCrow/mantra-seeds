const express = require('express')
const router = express.Router()
const crypto = require("crypto");

const CRC32 = require('crc-32')
const forge = require('node-forge');
const axios = require('axios');

// models
const Cart = require('../../models/cartModel')
const Order = require('../../models/orderModel')
const Transaction = require('../../models/transactionModel')
const User = require('../../models/userModel')

const WEBHOOK_ID = process.env.PAYPAL_WEBHOOK_ID;

const calculateOrderAmount = async (req, res) => {
    try {
        const { id, shippingPrice } = req.body
        const finalShippingPrice = parseFloat(shippingPrice) * 100
        const cart = await Cart.findById(id);
        if(!cart) {
            throw Error(`Cart ${id} not found`)
        }
        const total = cart.subtotal + finalShippingPrice;
        res.send({
          total: `${(total / 100).toFixed(2)}`,
        });
    } catch (e) {
        return res.status(400).send({
            error: {
              message: e.message,
            },
        })
    }
};

const createOrder = async (req, res) => {
    try {
        const { id, shippingPrice, transactionId, user } = req.body
        const finalShippingPrice = parseFloat(shippingPrice) * 100
        const cart = await Cart.findById(id);
        const address = cart.address;
        const items = cart.cartItems;
        const email = cart.email;
        const shipping = cart.shipping;
        const total = cart.subtotal + finalShippingPrice
        var transaction = await Transaction.createTransaction(transactionId, "PayPal", total, "Pending")
        transaction = transaction._id
        const userId = user ? user._id : null;
        // make this so create order adds the cart. this will be a unique id the webhook can find later
        const order = await Order.createOrder(userId, transaction, id, address, items, email, shipping, total);
        if (user) {
            await Cart.findByIdAndUpdate(id, { status: "inactive" });
            await User.findByIdAndUpdate(userId, { $unset: { cart: "" } });
        }
        // create update inventory function
    return res.status(200).send({ success: "Order created", order })
    } catch (e) {
        console.log(e)
        return res.status(400).send({
            error: {
                message: e.message
            }
        })
    }
}


const webhook = async (req, res) => {
    console.log("paypal webhook triggered")
    try {
        const event = req.body;
        const data = JSON.parse(event.toString());
        if(data.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
            const transactionId = data.resource.id;
            const transactionUpdated = await Transaction.findOneAndUpdate({ transactionId }, { $set: { status: data.event_type}})
            if(!transactionUpdated) {
                throw Error(`Transaction ${transactionId} not found`)
            }
        } else {
            console.log(`Unhandled event type: ${data.event_type}`);
        }
        return res.status(200).send({ success: "Webhook event processed" });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: "Webhook event processing failed" });
    }

};

const verify = async (req, res, next) => {
    const transmissionId = req.headers['paypal-transmission-id'];
    const transmissionTime = req.headers['paypal-transmission-time'];
    const signature = req.headers['paypal-transmission-sig'];
    const certUrl = req.headers['paypal-cert-url'];
    const bodyCrc32 = CRC32.buf(req.body)
    const unsigned_crc = bodyCrc32 >>> 0;

    // verify domain is actually paypal.com, or else someone
    // could spoof in their own cert
    const urlObj = new URL(certUrl);
    if (!urlObj.hostname.endsWith('.paypal.com')) {
        throw new Error(
        `URL ${certUrl} is not in the domain paypal.com, refusing to fetch cert for security reasons`);
    }

    const validationString = `${transmissionId}|${transmissionTime}|${WEBHOOK_ID}|${unsigned_crc}`

    const certResult = await axios.get(certUrl)
    const cert = forge.pki.certificateFromPem(certResult.data);
    const publicKey = forge.pki.publicKeyToPem(cert.publicKey);
    const verify = crypto.createVerify('RSA-SHA256');
    verify.update(validationString);
    const result = verify.verify(publicKey, signature, 'base64')

    if (result) {
        // The signature is verified
        console.log('PayPal webhook signature verification succeeded');
        next();
    } else {
        // The signature is not verified
        console.error('PayPal webhook signature verification failed');
        return res.status(400).send({ error: 'PayPal webhook signature verification failed' });
    }
}

const config = (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
}

router.get('/config', config)
router.post('/calculate', calculateOrderAmount)
router.post('/create_order', createOrder)
router.post('/webhook', verify, webhook)

module.exports = router