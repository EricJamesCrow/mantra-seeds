require('dotenv').config()

// const https = require('https');
// const fs = require('fs');

const express = require('express')
const mongoose = require('mongoose')
const productsRoutes = require('./routes/products')
const userRoutes = require('./routes/user')
const cartRoutes = require('./routes/cart')
const orderRoutes = require('./routes/order')
const shippingRoutes = require('./routes/shipping')
const stripeRoutes = require('./routes/stripe')
const paypalRoutes = require('./routes/paypal')

// express app
const app = express()

// middleware
app.use('/api/stripe/webhook', express.raw({type: 'application/json'}))
app.use('/api/paypal/webhook', express.raw({type: 'application/json'}))
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
app.use('/api/shipping', shippingRoutes)
app.use('/api/stripe', stripeRoutes)
app.use('/api/paypal', paypalRoutes)

// stripe public key
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

// const options = {
//     key: fs.readFileSync('/etc/pki/tls/certs/localhost.crt'),
//     cert: fs.readFileSync('/etc/pki/tls/certs/localhost.crt')
//     };
    
//     // connect to db
//     mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         // Create the HTTPS server
//         https.createServer(options, app).listen(process.env.PORT, '0.0.0.0', () => {
//         console.log('Connected to db & listening on port', process.env.PORT);
//         });
//     })
//     .catch((error) => {
//         console.log(error);
//     })