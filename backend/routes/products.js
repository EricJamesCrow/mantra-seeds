const express = require('express')
const {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
} = require("../controllers/productController")
const requireAuth = require('../middleware/requireAuth')
const requireAdmin = require('../middleware/requireAdmin')

const router = express.Router()

// GET all products
router.get('/', getProducts)

//GET a single product
router.get('/:id', getProduct)

// POST a new product
router.post('/', requireAdmin, createProduct)

// DELETE a product
router.delete('/:id', requireAdmin, deleteProduct)

// UPDATE a product
router.patch('/:id', requireAdmin, updateProduct)

router.use(requireAuth)

module.exports = router