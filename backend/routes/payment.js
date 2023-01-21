const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const Cart = require('../models/cartModel')

const calculateOrderAmount = async (id, shippingPrice) => {
    const finalShippingPrice = parseFloat(shippingPrice) * 100
    const cart = await Cart.findOne({ id });
    if(!cart) {
        throw Error(`Cart ${id} not found`)
    }
    return cart.subtotal + finalShippingPrice;
  };

const createPaymentIntent =  async (req, res) => {
  try {
    const { items, shipping } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: await calculateOrderAmount(items._id, shipping.shippingPrice),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
  })
  }
  };

router.post("/", createPaymentIntent)

module.exports = router