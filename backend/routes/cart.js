const express = require('express')
const { addItemToCart,
    removeItemFromCart,
    getUserCart,
    getAllCarts,
    updateItemQuantity } = require('../controllers/cartController')
const router = express.Router()

// auth middleware
const requireAdmin = require('../middleware/requireAdmin')

// update quantity
router.put('/:id', updateItemQuantity); 

// add a new cart
router.post('/', addItemToCart)

// delete item from a cart
router.post('/:id', removeItemFromCart)

// get a single cart
router.get('/:id', getUserCart)

// get all cart items
router.get('/', requireAdmin, getAllCarts)

module.exports = router