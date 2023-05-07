const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const checkInventory = async (req, res) => {
  try {
    const { cartId } = req.body;

    // Fetch the cart from MongoDB
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Iterate over cart items from the database
    for (const item of cart.cartItems) {
      const product = await Product.findById(item.product);
      if (!product || (product.quantity - product.reserved) < item.quantity) {
        return res.status(400).json({
          error: `Insufficient quantity for product: ${item.name}`,
        });
      }

      // If the reservationTimestamp is null, reserve the item again and update the timestamp
      if (item.reservationTimestamp === null) {
        item.reservationTimestamp = new Date();
        product.reserved += item.quantity;
        await product.save();
      }
    }

    cart.markModified('cartItems');
    await cart.save();
    
    res.status(200).send({ success: "Inventory check passed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Inventory check failed"
    });
  }
};

module.exports = {
  checkInventory,
};
