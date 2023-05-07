const Cart = require('../models/cartModel'); // Adjust the path to your Cart model
const Product = require('../models/productModel'); // Adjust the path to your Product model

const releaseReservedItems = async () => {
    try {
      const reservationTimeout = 15 * 60 * 1000; // 15 minutes
      const carts = await Cart.find({
        'cartItems.reservationTimestamp': { $lt: Date.now() - reservationTimeout },
      });
  
      for (const cart of carts) {
        let cartModified = false;
        for (const cartItem of cart.cartItems) {
          if (cartItem.reservationTimestamp && cartItem.reservationTimestamp.getTime() < Date.now() - reservationTimeout) {
            const product = await Product.findById(cartItem.product);
            product.reserved -= cartItem.quantity;
            await product.save();
            
            cartItem.reservationTimestamp = null;
            cartModified = true;
          }
        }
        if (cartModified) {
          cart.markModified('cartItems');
          await cart.save();
        }
      }
    } catch (error) {
      console.log('Error releasing reserved items:', error);
    }
  };
  
module.exports = { releaseReservedItems };
