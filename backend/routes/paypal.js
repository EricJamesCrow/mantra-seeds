const express = require('express')
const router = express.Router()
const crypto = require("crypto");

const CRC32 = require('crc-32')
const forge = require('node-forge');
const axios = require('axios');

// models
const Cart = require('../models/cartModel')

const WEBHOOK_ID = process.env.PAYPAL_WEBHOOK_ID;

const calculateOrderAmount = async (req, res) => {
    try {
        const { id, shippingPrice } = req.body
        const finalShippingPrice = parseFloat(shippingPrice) * 100
        const cart = await Cart.findOne({ id });
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


const webhook = async (req, res) => {
    const event = req.body;
    const data = JSON.parse(event.toString());
    console.log(data.event_type)
    if(data.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
        const transactionId = data.resource.parent_payment;
        const amount = data.resource.amount.value;
        console.log(`Payment capture completed for ${transactionId} for $${amount}.`)
    }

  return res.status(200).send({ success: "Webhook event processed" });
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
        console.log('Signature verification succeeded');
        next();
    } else {
        // The signature is not verified
        console.error('Signature verification failed');
        return res.status(400).send({ error: "Signature verification failed" });
    }
}

const config = (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
}

router.get('/config', config)
router.post('/calculate', calculateOrderAmount)
router.post('/webhook', verify, webhook)

module.exports = router