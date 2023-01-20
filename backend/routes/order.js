const express = require('express')
const { createOrder, getOrder, getAllOrders } = require("../controllers/orderController")
const router = express.Router()

router.get('/', getAllOrders)

router.get('/:id', getOrder)

router.post('/', createOrder)

module.exports = router