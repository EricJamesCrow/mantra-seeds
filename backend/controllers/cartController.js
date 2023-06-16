const Cart = require('../models/cartModel')
const User = require('../models/userModel')
const Product = require('../models/productModel')
const mongoose = require('mongoose')

const updateItemQuantity = async (req, res) => {
    const { id } = req.params;
    const { product, quantity } = req.body;
  
    if (!product || !quantity) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
  
    if (isNaN(quantity) || typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ error: "Invalid quantity" });
    }

    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      const foundProduct = await Product.findById(product).session(session);
    
      if (!foundProduct) {
        return res.status(404).json({ error: "Invalid product" });
      }
    
      const cart = await Cart.findById(id).session(session);
  
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      } else {
        const cartItem = cart.cartItems.find(c => c.product.equals(product));
  
        if (!cartItem) {
          return res.status(404).json({ error: "Item not found in cart" });
        } else {
          const reserved = cartItem.reservationTimestamp === null ? foundProduct.reserved : 0;
          
          if (quantity > foundProduct.quantity - reserved) {
            return res.status(400).json({ error: "Requested quantity exceeds available stock" });
          }
  
          cart.subtotal -= cartItem.price * cartItem.quantity;
          
          if(cartItem.reservationTimestamp === null) {
            cartItem.reservationTimestamp = new Date();
            foundProduct.reserved += cartItem.quantity;
          }
          
          foundProduct.reserved -= cartItem.quantity;
          foundProduct.reserved += quantity;
          await foundProduct.save({ session });
  
          for (const item of cart.cartItems) {
            if (!item.product.equals(product)) {
              if (item.reservationTimestamp === null) {
                item.reservationTimestamp = new Date();
                const otherProduct = await Product.findById(item.product).session(session);
                otherProduct.reserved += item.quantity;
                await otherProduct.save({ session });
              }
            }
          }
  
          cartItem.quantity = quantity;
          cart.subtotal += cartItem.price * cartItem.quantity;
          cartItem.reservationTimestamp = Date.now();
  
          cart.markModified('cartItems');
          await cart.save({ session });
          await session.commitTransaction();

          return res.status(200).json(cart);
        }
      }
    } catch (error) {
      await session.abortTransaction();
      
      console.log(error);
      return res.status(500).json({ error });
    } finally {
      session.endSession();
    }
  };
  

const addItemToCart = async (req, res) => {
  const { id } = req.body;
  const { user } = req.body;
  const { product, quantity, price } = req.body.cartItems[0];
  
  if (!product || !quantity || !price) {
      return res.status(400).json({ error: "Missing required parameters" });
  }

  const session = await mongoose.startSession();

  session.startTransaction();

  try {
      const foundProduct = await Product.findById(product).session(session);

      if (!foundProduct) {
          throw new Error("Invalid product");
      }

      if (isNaN(quantity) || typeof quantity !== 'number') {
          throw new Error("Invalid quantity");
      }

      if (isNaN(price) || typeof price !== 'number') {
          throw new Error("Invalid price");
      }

      const name = foundProduct.name;

      if (quantity > foundProduct.quantity - foundProduct.reserved) {
          throw new Error("Requested quantity exceeds available stock");
      }

      const cart = await Cart.findById(id).session(session);

      if (!cart) {
          const newCart = new Cart({
              cartItems: [{ name, product, quantity, price }],
              subtotal: price * quantity
          });
          await newCart.save({ session });
          if(user) {
              await User.findByIdAndUpdate(user, { cart: newCart._id }, { session });
          }

          foundProduct.reserved += quantity;
          await foundProduct.save({ session });

          await session.commitTransaction();

          return res.status(201).json({ cart: newCart });
      } else {
          const cartItem = cart.cartItems.find(c => c.product.equals(product))
          if (cartItem) {
              cartItem.quantity += quantity;
              cart.subtotal += price * quantity;
              if(cartItem.reservationTimestamp === null) {
                  cartItem.reservationTimestamp = new Date();
                  foundProduct.reserved += cartItem.quantity;
              }
          } else {
              cart.cartItems.push({ name, product, quantity, price });
              cart.subtotal += price * quantity;
          }

          foundProduct.reserved += quantity;
          await foundProduct.save({ session });

          for (const item of cart.cartItems) {
              if (!item.product.equals(product)) {
                item.reservationTimestamp = new Date();
                const otherProduct = await Product.findById(item.product);
                otherProduct.reserved = item.quantity;
                await otherProduct.save({ session });
              }
          }

          const updatedCart = await Cart.findOneAndUpdate({ _id: id }, {
            $set: {
              cartItems: cart.cartItems,
              subtotal: cart.subtotal,
            },
          }, { new: true, session });

          await session.commitTransaction();

          return res.status(200).json({ cart: updatedCart });
      }
  } catch (error) {
      await session.abortTransaction();

      console.log(error)
      return res.status(500).json({ error });
  } finally {
      session.endSession();
  }
};

const removeItemFromCart = async (req, res) => {
    const { id } = req.params;
    const { product } = req.body;
    if (!product) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    // Find the product
    const foundProduct = await Product.findById(product);

    // If the product is not found, return an error message
    if (!foundProduct) {
        return res.status(404).json({ error: "Invalid product" });
    }
    
    try {
        const cart = await Cart.findById(id);
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        } else {
            const cartItem = cart.cartItems.find(c => c.product.equals(product));
            if (!cartItem) {
                return res.status(404).json({ error: "Item not found in cart" });
            } else {
                if(cartItem.reservationTimestamp !== null) {
                    foundProduct.reserved -= cartItem.quantity;
                    await foundProduct.save();
                }
                cart.subtotal -= cartItem.price * cartItem.quantity;
                cart.cartItems.pull(cartItem);
                cart.markModified('cartItems');
                await cart.save();
                return res.status(200).json(cartItem);
            }
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getUserCart = async (req, res) => {
    const { id } = req.params 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such cart'})
    }
    try {
      const cart = await Cart.findById(id)

      if (!cart) {
          return res.status(404).json({error: 'No such cart'})
      }

      res.status(200).json(cart)
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find({});
        return res.status(200).json({ carts });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

module.exports = {
    updateItemQuantity,
    addItemToCart,
    removeItemFromCart,
    getUserCart,
    getAllCarts
}
