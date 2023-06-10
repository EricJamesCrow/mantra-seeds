require('dotenv').config()

// const https = require('https');
// const fs = require('fs');

const express = require('express')
const mongoose = require('mongoose')
var compression = require('compression')
const productsRoutes = require('./routes/products')
const userRoutes = require('./routes/user')
const cartRoutes = require('./routes/cart')
const orderRoutes = require('./routes/order')
const reviewRoutes = require('./routes/review')
const checkoutRoutes = require('./routes/checkout')
const shippingRoutes = require('./routes/shipping')
const paymentRoutes = require('./routes/payment/payment')
// const stripeRoutes = require('./routes/payment/stripe')
const paypalRoutes = require('./routes/payment/paypal')
const contactRoutes = require('./routes/contact')
const recipientRoutes = require('./routes/recipient')

// products for sitemap.xml generation
const Product = require('./models/productModel')

// inventory
const { releaseReservedItems } = require('./utilities/inventoryUtils')

// express app
const app = express()

// compress all responses
app.use(compression())

// middleware
app.use('/api/payment/stripe/webhook', express.raw({type: 'application/json'}))
app.use('/api/payment/paypal/webhook', express.raw({type: 'application/json'}))
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/contact', contactRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/user', userRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/checkout', checkoutRoutes)
app.use('/api/shipping', shippingRoutes)
app.use('/api/payment', paymentRoutes)
// app.use('/api/payment/stripe', stripeRoutes)
app.use('/api/payment/paypal', paypalRoutes)
app.use('/api/recipient', recipientRoutes)

app.get('/sitemap.xml', async (req, res) => {
    try {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        const products = await Product.find({deleted: {$ne: true}}).sort({ createdAt: -1 });

        const staticPages = [
            { url: 'https://www.mantra-seeds.com/', changefreq: 'daily', priority: 1.0 },
            { url: 'https://www.mantra-seeds.com/shop', changefreq: 'daily', priority: 0.8 },
            { url: 'https://www.mantra-seeds.com/contact', changefreq: 'monthly', priority: 0.8 },
            { url: 'https://www.mantra-seeds.com/login', changefreq: 'monthly', priority: 0.8 },
            { url: 'https://www.mantra-seeds.com/signup', changefreq: 'monthly', priority: 0.8 },
            { url: 'https://www.mantra-seeds.com/terms-and-conditions', changefreq: 'yearly', priority: 0.5 },
            { url: 'https://www.mantra-seeds.com/privacy-policy', changefreq: 'yearly', priority: 0.5 },
          ];
        
          staticPages.forEach(page => {
            xml += '<url>';
            xml += `<loc>${page.url}</loc>`;
            xml += '<lastmod>' + new Date().toISOString() + '</lastmod>';
            xml += `<changefreq>${page.changefreq}</changefreq>`;
            xml += `<priority>${page.priority}</priority>`;
            xml += '</url>';
          });
      
        for(let product of products){
          xml += '<url>';
          xml += `<loc>https://www.mantra-seeds.com/shop/products/${product.id}</loc>`;
          xml += '<lastmod>' + new Date().toISOString() + '</lastmod>';
          xml += '<changefreq>weekly</changefreq>';
          xml += '<priority>0.8</priority>';
          xml += '</url>';
        }
      
        xml += '</urlset>';
        
        res.header('Content-Type', 'text/xml');
        res.send(xml);
    } catch (error) {
        console.log(error)
    }
})

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
        setInterval(releaseReservedItems, 5 * 60 * 1000);
    })
    .catch((error) => {
        console.log(error)
    })