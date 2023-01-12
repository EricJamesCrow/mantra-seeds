const Cart = require('../models/cartModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

const addItemToCart = async (req, res) => {
    const { user } = req.body;
    const { product, quantity, price } = req.body.cartItems[0];
    
    if (!user || !product || !quantity || !price) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    try {
        const cart = await Cart.findOne({ user });
        if (!cart) {
            const newCart = new Cart({
                user,
                cartItems: [{ product, quantity, price }]
            });
            await newCart.save();
            await User.findByIdAndUpdate(user, { cart: newCart._id }); 
            return res.status(201).json({ cart: newCart });
        } else {
            const cartItem = cart.cartItems.find(c => c.product.equals(product))
            if (cartItem) {
                cartItem.quantity += quantity;
            } else {
                cart.cartItems.push({ product, quantity, price });
            }
            cart.markModified('cartItems');
            await cart.save();           
            return res.status(200).json({ cart });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const removeItemFromCart = async (req, res) => {
    const { user, product } = req.body;
    if (!user || !product) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    try {
        const cart = await Cart.findOne({ user });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        } else {
            const cartItem = cart.cartItems.find(c => c.product.equals(product));
            if (!cartItem) {
                return res.status(404).json({ error: "Item not found in cart" });
            } else {
                cart.cartItems.pull(cartItem);
                cart.markModified('cartItems');
                await cart.save();
                return res.status(200).json({ message: "Item removed from cart" });
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
    addItemToCart,
    removeItemFromCart,
    getUserCart,
    getAllCarts
}
