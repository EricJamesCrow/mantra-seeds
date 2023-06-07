const Order = require('../models/orderModel');
const mongoose = require('mongoose');

const { decrypt, decryptAddress } = require('../helpers/encryption-helper');
const { sendEmail } = require('../helpers/mailgun-helper');
const deliveryStatusEmail = require('../email_templates/delivery-status');

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
      const populatedOrder = await Order.findById(id).populate('items.product');

      const address = updatedOrderWithTransaction.address;
      const decryptedAddress = decryptAddress(address);
      updatedOrderWithTransaction.address = decryptedAddress;
      const decryptedEmail = decrypt(updatedOrderWithTransaction.email);
      updatedOrderWithTransaction.email = decryptedEmail;

      let itemsHtml = '';
      for (const item of populatedOrder.items) {
          itemsHtml += `
          <div style="margin: 12px">
              <div style="border-radius: 5px; padding: 12px 0; margin: 12px 0; width: 100%; max-width: 520px; margin: 0 auto;">
                  <table style="width: 100%;">
                      <tr>
                          <td>
                              <img src="${item.product.image}" style="width: 150px; height: 150px; border-radius: 5px; margin-left: 12px;" />
                          </td>
                          <td style="margin-left: 12px; font-weight: 400; font-size: 16px; text-align: left;">
                              <p>Item: ${item.name}</p>
                              <p>QTY: ${item.quantity}</p>
                              <p>Price: $${(item.price / 100).toFixed(2)}</p>
                              <p>Subtotal: $${((item.price * item.quantity) / 100).toFixed(2)}</p>
                          </td>
                      </tr>
                  </table>
              </div>
          </div>`;
      }

      const emailParams = {
        from: process.env.ORDER_CONFIRMATION_EMAIL,
        to: decryptedEmail,
        subject: `Order #${updatedOrderWithTransaction.orderNumber} Delivery Status Update - ${status}`,
        html: deliveryStatusEmail(status, updatedOrderWithTransaction, itemsHtml, decryptedAddress),
      }
      
      await sendEmail(emailParams);
  
      res.status(200).json({ order: updatedOrderWithTransaction, message: `Order: ${id} delivery status updated to ${status}`} );
    } catch (error) {
      // Handle any errors that occurred during the update
      console.log(error);
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

