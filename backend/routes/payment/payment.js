const express = require('express')
const router = express.Router()

const Cart = require('../../models/cartModel')

const encryptAddress = async (req, res) => {
    try {
        const { address, items, shipping, email } = req.body;
        const id = items._id;
        const cart = await Cart.findOne({ id });
        if (Object.values(cart.address).every(val => !val)) {
            await Cart.encryptAddress(address);
            await Cart.findOneAndUpdate({ id }, { $set: { address: address, email: email, shipping: shipping } }, { new: true });
            return res.status(200).json({success: true});
        } else {
            return res.status(200).json({success: true, message: "Address already encrypted."});
        }
    } catch (e) {
        return res.status(400).json({error: e.message});
    }
}

router.post("/encrypt", encryptAddress)

module.exports = router