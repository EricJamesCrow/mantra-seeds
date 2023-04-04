const express = require('express')
const { getOrder, getAllUserOrders, getAllOrders, updateDeliveryStatus } = require("../controllers/orderController")
const requireAuth = require('../middleware/requireAuth')
const requireAdmin = require('../middleware/requireAdmin')
const router = express.Router()

router.get('/', requireAdmin, getAllOrders)

router.put('/:id', requireAdmin, updateDeliveryStatus)

router.get('/user/:id', requireAuth, getAllUserOrders)

router.get('/:id', requireAuth, getOrder)

module.exports = router