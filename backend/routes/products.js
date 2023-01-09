const express = require('express')
const {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
} = require("../controllers/productController")
const requireAuth = require('../middleware/requireAuth')
const requireAuthAdmin = require('../middleware/requireAuthAdmin')

const router = express.Router()

// GET all products
router.get('/', getProducts)

//GET a single product
router.get('/:id', getProduct)

// POST a new product
router.post('/', requireAuthAdmin, createProduct)

// DELETE a product
router.delete('/:id', requireAuthAdmin, deleteProduct)

// UPDATE a product
router.patch('/:id', requireAuthAdmin, updateProduct)

router.use(requireAuth)

module.exports = router