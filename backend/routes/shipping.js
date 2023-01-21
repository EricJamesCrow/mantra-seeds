const express = require('express')
const { calculateShipping } = require("../controllers/shippingController")
const router = express.Router()

router.post('/', calculateShipping)

module.exports = router