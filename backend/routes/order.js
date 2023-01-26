const express = require('express')
const { getOrder, getAllOrders } = require("../controllers/orderController")
const requireAuth = require('../middleware/requireAuth')
const requireAdmin = require('../middleware/requireAdmin')
const router = express.Router()

router.get('/', requireAdmin, getAllOrders)

router.get('/:id', requireAuth, getOrder)

module.exports = router