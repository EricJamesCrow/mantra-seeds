const express = require('express')
const router = express.Router()

const Cart = require('../../models/cartModel')

const { encrypt, encryptAddress } = require('../../helpers/encryption-helper');

const encryptPII = async (req, res) => {
    try {
        const { id, address, shipping, email } = req.body;
        const encryptedAddress = await encryptAddress(address);
        const encryptedEmail = encrypt(email);
        await Cart.findByIdAndUpdate(id, { $set: { address: encryptedAddress, email: encryptedEmail, shipping: shipping } }, { new: true });
        return res.status(200).json({success: true});
    } catch (e) {
        return res.status(400).json({error: e.message});
    }
}

router.post("/encrypt", encryptPII)

module.exports = router