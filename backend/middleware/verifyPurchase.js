const Order = require('../models/orderModel');

const verifyPurchase = async (req, res, next) => {
  const user = req.body.user;
  const id = req.body.id;

  try {
    // Find all orders where the user is the buyer
    const orders = await Order.find({ user: user });

    // Check if any of the orders contain the specified product
    const hasPurchased = orders.some(order => 
        order.items.some(item => item.product.toString() === id)
      );

    if (!hasPurchased) {
      return res.status(403).json({ message: 'User has not purchased this product.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error verifying purchase: ' + error });
  }
};

module.exports = verifyPurchase;
