const cryptoJS = require('crypto-js');
const crypto = require('crypto');
const fs = require('fs');
require('dotenv').config();
const Order = require('../models/orderModel');

const PRIVATE_KEY = fs.readFileSync('./private.pem', 'utf8');
const PUBLIC_KEY = fs.readFileSync('./public.pem', 'utf8');

const createOrder = async (req, res) => {
    const { user, items, email, shipping, payment, total } = req.body;
    let { address } = req.body;
  
    // encrypt each property of the address object
    Object.keys(address).forEach(property => {
        const iv = cryptoJS.lib.WordArray.random(128/8);
        const secret = process.env.SECRET;
        const key = cryptoJS.SHA256(secret);
        const ciphertext = cryptoJS.AES.encrypt(address[property], key, { iv: iv });
        address[property] = {
            encrypted: ciphertext.toString(),
            iv: iv.toString()
        };
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

    for (const i in address) {
        if(i.encrypted && i.iv) {
            const element = address.i;
            const iv = cryptoJS.enc.Hex.parse(element.iv);
            const secret = process.env.SECRET;
            const key = cryptoJS.SHA256(secret);
            const plaintext = cryptoJS.AES.decrypt(element.encrypted, key, { iv: iv }).toString(cryptoJS.enc.Utf8);
            i = plaintext;
        }
    }
    order.address = address;

    res.status(200).json(order);
};




module.exports = { createOrder, getOrder }

