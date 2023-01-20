require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const productsRoutes = require('./routes/products')
const userRoutes = require('./routes/user')
const cartRoutes = require('./routes/cart')
const orderRoutes = require('./routes/order')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/products', productsRoutes)
app.use('/api/user', userRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/orders', orderRoutes)

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { items } = req.body;
    console.log(items)
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
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
  });

app.get("/config", (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUB_KEY,
    });
});

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })