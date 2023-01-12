require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const productsRoutes = require('./routes/products')
const userRoutes = require('./routes/user')
const cartRoutes = require('./routes/cart')

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