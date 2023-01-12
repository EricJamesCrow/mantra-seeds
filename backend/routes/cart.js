const express = require('express')
const { addItemToCart,
    removeItemFromCart,
    getUserCart,
    getAllCarts } = require('../controllers/cartController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

// add a new cart
router.post('/', addItemToCart)

// get a single cart
router.get('/:id', getUserCart)

// get all cart items
router.get('/', getAllCarts)

module.exports = router