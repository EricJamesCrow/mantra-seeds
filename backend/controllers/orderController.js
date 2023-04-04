const Order = require('../models/orderModel');

const { decryptAddress } = require('../helpers/encryption');

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
    order.address = decryptAddress(address);

    res.status(200).json(order);
};

const getAllUserOrders = async (req, res) => {
    const { id } = req.params;
    const orders = await Order.find({ user: id });

    if (!orders) {
        return res.status(404).json({ error: 'No orders found for this user' });
    }

    orders.forEach(order => {
        const address = order.address;
        order.address = decryptAddress(address);
    });

    res.status(200).json(orders);
};


const getAllOrders = async (req, res) => {
    const orders = await Order.find();

    if (!orders) {
        return res.status(404).json({ error: 'No orders found' });
    }

    orders.forEach(order => {
        const address = order.address;
        order.address = decryptAddress(address);
    });

    res.status(200).json(orders);
};


const updateDeliveryStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { deliveryStatus: status },
        { new: true, runValidators: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ error: 'No such order' });
      }

      const address = updatedOrder.address;
      updatedOrder.address = decryptAddress(address);
  
      res.status(200).json(updatedOrder);
      console.log("success!");
    } catch (error) {
      // Handle any errors that occurred during the update
      console.error("Error updating delivery status:", error);
      res.status(500).json({ error: "Error updating delivery status" });
    }
  };
  


module.exports = { getOrder, getAllUserOrders, getAllOrders, updateDeliveryStatus }

