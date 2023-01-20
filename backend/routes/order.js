const express = require('express')
const { createOrder, getOrder } = require("../controllers/orderController")
const router = express.Router()

router.get('/:id', getOrder)

router.post('/', createOrder)

module.exports = router