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
  
    try {
      const cart = await Cart.findById(id);
  
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      } else {
        const cartItem = cart.cartItems.find(c => c.product.equals(product));
  
        if (!cartItem) {
          return res.status(404).json({ error: "Item not found in cart" });
        } else {
          cart.subtotal -= cartItem.price * cartItem.quantity; // Subtract the old price
          cartItem.quantity = quantity; // Update the quantity for the item
          cart.subtotal += cartItem.price * cartItem.quantity; // Add the new price
  
          cart.markModified('cartItems');
          await cart.save();
          return res.status(200).json(cart);
        }
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
  

const addItemToCart = async (req, res) => {
    const { id } = req.body;
    const { user } = req.body;
    const { product, quantity, price } = req.body.cartItems[0];
    
    if (!product || !quantity || !price) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    // Find the product
    const foundProduct = await Product.findById(product);

    // If the product is not found, return an error message
    if (!foundProduct) {
        return res.status(404).json({ error: "Invalid product" });
    }

    if (isNaN(quantity) || typeof quantity !== 'number') {
        return res.status(400).json({ error: "Invalid quantity" });
    }

    if (isNaN(price) || typeof price !== 'number') {
        return res.status(400).json({ error: "Invalid quantity" });
    }

    const name = foundProduct.name;

    if (quantity > foundProduct.quantity) {
        return res.status(400).json({ error: "Requested quantity exceeds available stock" });
    }

    try {
        const cart = await Cart.findById(id);
        if (!cart) {
            const newCart = new Cart({
                cartItems: [{ name, product, quantity, price }],
                subtotal: price * quantity
            });
            await newCart.save();
            if(user) {
                await User.findByIdAndUpdate(user, { cart: newCart._id });
            }
            return res.status(201).json({ cart: newCart });
        } else {
            const cartItem = cart.cartItems.find(c => c.product.equals(product))
            if (cartItem) {
                cartItem.quantity += quantity;
                cart.subtotal += price * quantity;
            } else {
                cart.cartItems.push({ name, product, quantity, price });
                cart.subtotal += price * quantity;
            }
            cart.markModified('cartItems');
            await cart.save();           
            return res.status(200).json({ cart });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
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
        return res.status(404).json({error: 'No such product'})
    }

    const cart = await Cart.findById(id)

    if (!cart) {
        return res.status(404).json({error: 'No such product'})
    }

    res.status(200).json(cart)
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
