const Order = require('../models/orderModel');
const mongoose = require('mongoose');

const { decrypt, decryptAddress } = require('../helpers/encryption-helper');

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
    const order = await getOrderWithTransaction(id);

    if (!order) {
        return res.status(404).json({ error: 'No such order' });
    }

    // check the user role
    if (req.role !== 1 && req.user._id.toString() !== order.user.toString()) {
        return res.status(401).json({ error: 'You are not authorized to access this order' });
    }

    const address = order.address;
    order.address = decryptAddress(address);
    const email = order.email;
    order.email = decrypt(email);

    res.status(200).json(order);
};

const getAllUserOrders = async (req, res) => {
  const { id } = req.params;
  const orders = await Order.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: 'transactions',
        localField: 'transaction',
        foreignField: '_id',
        as: 'transaction',
      },
    },
    {
      $unwind: '$transaction',
    },
  ]);

  if (!orders) {
    return res.status(404).json({ error: 'No orders found for this user' });
  }

  orders.forEach(order => {
    const address = order.address;
    order.address = decryptAddress(address);
    const email = order.email;
    order.email = decrypt(email);
  });

  res.status(200).json(orders);
};



const getAllOrdersWithTransactions = async () => {
  const result = await Order.aggregate([
    {
      $lookup: {
        from: 'transactions',
        localField: 'transaction',
        foreignField: '_id',
        as: 'transaction',
      },
    },
    {
      $unwind: '$transaction',
    },
  ]);

  return result;
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrdersWithTransactions();

    if (!orders) {
      return res.status(404).json({ error: 'No orders found' });
    }

    orders.forEach(order => {
      const address = order.address;
      order.address = decryptAddress(address);
      const email = order.email;
      order.email = decrypt(email);
    });

    res.status(200).json(orders);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
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

      const updatedOrderWithTransaction = await getOrderWithTransaction(id);

      const address = updatedOrderWithTransaction.address;
      updatedOrderWithTransaction.address = decryptAddress(address);
  
      res.status(200).json({ order: updatedOrderWithTransaction, message: `Order: ${id} delivery status updated to ${status}`} );
    } catch (error) {
      // Handle any errors that occurred during the update
      res.status(500).json({ error: "Error updating delivery status" });
    }
};

const getOrderWithTransaction = async (orderId) => {
  const result = await Order.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(orderId),
      },
    },
    {
      $lookup: {
        from: 'transactions',
        localField: 'transaction',
        foreignField: '_id',
        as: 'transaction',
      },
    },
    {
      $unwind: '$transaction',
    },
  ]);

  return result[0];
};

  


module.exports = { getOrder, getAllUserOrders, getAllOrders, updateDeliveryStatus }

