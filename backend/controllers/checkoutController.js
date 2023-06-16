const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const mongoose = require('mongoose')

const checkInventory = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { cartId } = req.body;

    // Fetch the cart from MongoDB
    const cart = await Cart.findById(cartId).session(session);

    if (!cart) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Iterate over cart items from the database
    for (const item of cart.cartItems) {
      const product = await Product.findById(item.product).session(session);
      if (!product) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          error: `Product not found for item: ${item.name}`,
        });
      }

      const reserved = item.reservationTimestamp === null ? product.reserved : 0;

      if ((product.quantity - reserved) < item.quantity) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          error: `Insufficient quantity for product: ${item.name}`,
        });
      }

      // If the reservationTimestamp is null, reserve the item again and update the timestamp
      if (item.reservationTimestamp === null) {
        item.reservationTimestamp = new Date();
        product.reserved += item.quantity;
        await product.save({ session });
      }
    }

    cart.markModified('cartItems');
    await cart.save({ session });
    await session.commitTransaction();
    return res.status(200).send({ success: "Inventory check passed" });
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    return res.status(500).json({
      error: "Inventory check failed"
    });
  } finally {
    session.endSession();
  }
};


module.exports = {
  checkInventory,
};
