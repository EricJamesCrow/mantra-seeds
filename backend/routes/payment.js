const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const Cart = require('../models/cartModel')
const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT

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

    const customer = await stripe.customers.create({
      metadata: {
        userId: items.user,
        address: JSON.stringify(shipping)
      }
    });

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: await calculateOrderAmount(items._id, shipping.shippingPrice),
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
  

router.post('/webhook', (request, response) => {
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
      stripe.customers.retrieve(paymentIntent.customer)
                  .then((customer) => {
                    console.log(customer)
                    console.log('Metadata: ', customer.metadata)
                  }).catch(err => console.log(err))
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log(`PaymentAttached for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

router.post("/", createPaymentIntent)

module.exports = router