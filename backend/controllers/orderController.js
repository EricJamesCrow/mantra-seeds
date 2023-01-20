const crypto = require('crypto');
const fs = require('fs');
const Order = require('../models/orderModel');

const PRIVATE_KEY = fs.readFileSync('./private.pem', 'utf8');
const PUBLIC_KEY = fs.readFileSync('./public.pem', 'utf8');

const createOrder = async (req, res) => {
    const { user, items, email, shipping, payment, total } = req.body;
    let { address } = req.body;

    // encrypt each property of the address object
    Object.keys(address).forEach(property => {
        const buffer = Buffer.from(address[property], 'utf8');
        const encrypted = crypto.publicEncrypt({ key: PUBLIC_KEY, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, buffer);
        // address[property] = {
        //     property: encrypted.toString('base64'),
        // };
        address[property] = encrypted.toString('base64')
    });

    // create order
    const order = await Order.create({
        user,
        items,
        email,
        shipping,
        payment,
        total,
        address
    });

    res.status(200).json(order);
};

const getOrder = async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
        return res.status(404).json({ error: 'No such order' });
    }

    const address = order.address;
    // decrypt each property of the address object
    Object.keys(address).forEach(property => {
        if (address[property]) {
            const buffer = Buffer.from(address[property], 'base64');
            const decrypted = crypto.privateDecrypt({ key: PRIVATE_KEY, passphrase: process.env.PASSPHRASE, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, buffer);
            address[property] = decrypted.toString('utf8');
        }
    });

    order.address = address;

    res.status(200).json(order);
};




module.exports = { createOrder, getOrder }

