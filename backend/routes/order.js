const express = require('express')
const { createOrder, getOrder, getAllOrders } = require("../controllers/orderController")
const requireAuth = require('../middleware/requireAuth')
const requireAuthAdmin = require('../middleware/requireAuthAdmin')
const router = express.Router()

router.get('/', requireAuthAdmin, getAllOrders)

router.get('/:id', getOrder)

router.post('/', requireAuth, createOrder)

module.exports = router