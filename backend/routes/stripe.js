const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT

// models
const Cart = require('../models/cartModel')
const Order = require('../models/orderModel')
const User = require('../models/userModel')

const calculateOrderAmount = async (id, shippingPrice) => {
    const finalShippingPrice = parseFloat(shippingPrice) * 100
    const cart = await Cart.findOne({ id });
    if(!cart) {
        throw Error(`Cart ${id} not found`)
    }
    return cart.subtotal + finalShippingPrice;
  };

const createPaymentIntent = async (req, res) => {
  try {
    const { address, items, shipping, email, payment } = req.body;
    const id = items._id
    await Cart.encryptAddress(address)
    await Cart.findOneAndUpdate({ id }, { $set: { address: address, email: email, shipping: shipping } }, { new: true });

    const customer = await stripe.customers.create({
      metadata: {
        cart: id,
        payment: payment
      }
    });

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: await calculateOrderAmount(id, shipping.price),
      currency: "usd",
      customer: customer.id,
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
  

const webhook = async (request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(request.rawBody)
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      /* create check inventory function */
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
    //   if (event.type === 'payment_intent.succeeded') {
    //     const paymentIntent = event.data.object;
    //     if (!hasEnoughInventory(paymentIntent.items)) {
    //         await stripe.paymentIntents.cancel(paymentIntent.id, {
    //             cancellation_reason: 'inventory'
    //         });
    //     } else {
    //         // handle successful payment
    //     }
    // }
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log(`PaymentAttached for ${paymentMethod.amount} was successful!`);
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    case 'charge.succeeded':
      const data = event.data.object;
      stripe.customers.retrieve(data.customer)
                  .then( async (customer) => {
                    await createOrder(customer.metadata.cart, data);
                  }).catch(err => console.log(err))
      console.log(`Charge for ${data.amount} was successful`)
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
};

const createOrder = async (id, data) => {
  try {
    const cart = await Cart.findOne({ id });
    const user = cart.user;
    const address = cart.address;
    const items = cart.cartItems;
    const email = cart.email;
    const shipping = cart.shipping;
    const payment = data.payment_intent;
    const total = data.amount;
    const order = await Order.createOrder(user, address, items, email, shipping, payment, total);
    console.log(order)
    await User.findOneAndUpdate({ user }, { $set: { order: order._id } }, { new: true });
    // create update inventory function
    await Cart.deleteCart(id);
  } catch (error) {
    throw new Error(error);
  }
}

router.post("/", createPaymentIntent)
router.post("/webhook", webhook)

module.exports = router