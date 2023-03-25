const express = require('express')
const router = express.Router()

const Cart = require('../../models/cartModel')

const encryptAddress = async (req, res) => {
    try {
        const { id, address, shipping, email } = req.body;
        const cart = await Cart.findById(id);
        console.log("encrypting address triggered")
        await Cart.encryptAddress(address);
        await Cart.findByIdAndUpdate(id, { $set: { address: address, email: email, shipping: shipping } }, { new: true });
        return res.status(200).json({success: true});
    } catch (e) {
        return res.status(400).json({error: e.message});
    }
}

router.post("/encrypt", encryptAddress)

module.exports = router