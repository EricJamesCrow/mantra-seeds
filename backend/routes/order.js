const express = require('express')
const { getOrder, getAllUserOrders, getAllOrders } = require("../controllers/orderController")
const requireAuth = require('../middleware/requireAuth')
const requireAdmin = require('../middleware/requireAdmin')
const router = express.Router()

router.get('/', requireAdmin, getAllOrders)

router.get('/user/:id', requireAuth, getAllUserOrders)

router.get('/:id', requireAuth, getOrder)

module.exports = router