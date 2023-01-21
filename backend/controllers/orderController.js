const crypto = require('crypto');
const fs = require('fs');
const Order = require('../models/orderModel');

const PRIVATE_KEY = fs.readFileSync('./private.pem', 'utf8');
const PUBLIC_KEY = fs.readFileSync('./public.pem', 'utf8');

/*
const fs = require('fs');
const crypto = require('crypto');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'your passphrase'
  }
});

fs.writeFileSync('./private.pem', privateKey);
fs.writeFileSync('./public.pem', publicKey);
*/

const createOrder = async (req, res) => {
    console.log('this gets triggered')
    const { user, items, email, shipping, payment, total } = req.body;
    let { address } = req.body;

    // check the user role
    if (req.role !== 1 && req.user._id.toString() !== user) {
        return res.status(401).json({ error: 'You are not authorized to create this order' });
    }

    try {
    await Order.validateOrder(user, address, items, email, shipping, payment)
    // encrypt each property of the address object
    Object.keys(address).forEach(property => {
        const buffer = Buffer.from(address[property], 'utf8');
        const encrypted = crypto.publicEncrypt({ key: PUBLIC_KEY, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, buffer);
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
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

const getOrder = async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
        return res.status(404).json({ error: 'No such order' });
    }

    // check the user role
    if (req.role !== 1 && req.user._id.toString() !== order.user.toString()) {
        return res.status(401).json({ error: 'You are not authorized to access this order' });
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

const getAllOrders = async (req, res) => {
    const orders = await Order.find();

    if (!orders) {
        return res.status(404).json({ error: 'No orders found' });
    }

    orders.forEach(order => {
        const address = order.address;
        Object.keys(address).forEach(property => {
            if (address[property]) {
                const buffer = Buffer.from(address[property], 'base64');
                const decrypted = crypto.privateDecrypt({ key: PRIVATE_KEY, passphrase: process.env.PASSPHRASE, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, buffer);
                address[property] = decrypted.toString('utf8');
            }
        });
        order.address = address;
    });

    res.status(200).json(orders);
};


module.exports = { createOrder, getOrder, getAllOrders }

