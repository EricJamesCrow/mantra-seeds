const Order = require('../models/orderModel');
const mongoose = require('mongoose');

const { decrypt, decryptAddress } = require('../helpers/encryption-helper');
const { sendEmail } = require('../helpers/mailgun-helper');

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
      const decryptedAddress = decryptAddress(address);
      updatedOrderWithTransaction.address = decryptedAddress;
      const decryptedEmail = decrypt(updatedOrderWithTransaction.email);
      updatedOrderWithTransaction.email = decryptedEmail;

      let itemsHtml = '';
      for (const item of updatedOrderWithTransaction.items) {
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
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Delivery Status Update - ${status} for #${updatedOrderWithTransaction.orderNumber}</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Arial', sans-serif;
                }
                h1 {
                    margin: 0;
                    padding: 0;
                    text-align: left;
                    margin: 6px;
                    margin-left: 24px;
                }
                .centered-title {
                    text-align: center;
                    margin-top: 24px;
                }
            </style>
        </head>
        <body>
            <table width="100%" style="background: #637748; padding: 0 12px; height: 78px;">
                <tr>
                    <td>
                        <h2 style="font-size: 24px; color: #FAFAFA;">MANTRA SEEDS</h2>
                    </td>
                    <td align="right">
                        <img src="${process.env.CLOUDFRONT_URL}/meditating.svg" style="filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); width: 55px; height: 55px;" />
                    </td>
                </tr>
            </table>
            <div style="margin: 0; padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr style="text-align: center; background: #C2C5A2; font-family: 'Roboto'; padding: 24px 12px 12px 12px;">
                        <td colspan="2">
                            <h1 class="centered-title">Delivery Status Update - Order #${updatedOrderWithTransaction.orderNumber} has been ${status}!</h1>
                            <p style="padding: 12px 24px; word-wrap: break-word; font-weight: 400; font-size: 20px;">Your order #${updatedOrderWithTransaction.orderNumber} hsa been ${status.toLowerCase()}!</p>
                            <h1>Order: #${updatedOrderWithTransaction.orderNumber}</h1>
                            <h1>Items</h1>
                            <!-- Item -->
                             ${itemsHtml}
                            <h1>Shipping Details</h1>
                            <table style="text-align: left; padding: 0; margin: 12px 0; display: inline-block; font-size: 20px;">
                                <tr>
                                    <td>${decryptedAddress.firstName} ${decryptedAddress.lastName}</td>
                                </tr>
                                <tr>
                                    <td>${decryptedAddress.street}</td>
                                </tr>
                                <tr>
                                    <td>${decryptedAddress.city}, ${decryptedAddress.state} ${decryptedAddress.zip}</td>
                                </tr>
                                <tr>
                                    <td>United States</td>
                                </tr>
                            </table>
                            <h1>Shipping Method</h1>
                            <table style="text-align: left; padding: 0; margin: 12px 0; display: inline-block; font-size: 20px;">
                                <tr>
                                    <td>${updatedOrderWithTransaction.shipping.delivery}</td>
                                </tr>
                            </table>
                            <h1>Payment Method</h1>
                            <table style="text-align: left; padding: 0; margin: 12px 0; display: inline-block; font-size: 20px;">
                                <tr>
                                    <td>${updatedOrderWithTransaction.transaction.paymentMethod}</td>
                                </tr>
                            </table>
                            <h1>Order Total</h1>
                            <table style="text-align: left; padding: 0; margin: 12px 0; display: inline-block; font-size: 20px;">
                                <tr>
                                    <td>$${(updatedOrderWithTransaction.total / 100).toFixed(2)}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <table width="100%" style="background: #456649; padding: 24px; text-align: center; color: #fff;">
                    <tr>
                        <td style="padding-bottom: 12px;">
                            <a href="https://mantra-seeds.com/about-us" style="color: #fff; text-decoration: none;">About Us</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 12px;">
                            <a href="https://mantra-seeds.com/privacy-policy" style="color: #fff; text-decoration: none;">Privacy Policy</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 12px;">
                            <a href="https://www.instagram.com/mantraseeds" style="outline: none;">
                                <img src='${process.env.CLOUDFRONT_URL}/social_media/instagram.svg' alt='Instagram' style='width: 40px; margin-right: 10px;' />
                            </a>
                            <a href="https://www.facebook.com/mantraseeds" style="outline: none;">
                                <img src='${process.env.CLOUDFRONT_URL}/social_media/facebook.svg' alt='Facebook' style='width: 40px; margin-right: 10px ' />
                            </a>
                            <a href="https://www.twitter.com/mantraseeds" style="outline: none;">
                                <img src='${process.env.CLOUDFRONT_URL}/social_media/twitter.svg' alt='Twitter' style='width: 40px;' />
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td style='margin-top: 12px; font-size: 16px;'>© 2023 Mantra Seeds</td>
                    </tr>
                </table> 
            </div>
        </body>
        </html>
    `}
      
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

