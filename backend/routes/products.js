const express = require('express')
const {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
} = require("../controllers/productController")
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// GET all products
router.get('/', getProducts)

//GET a single product
router.get('/:id', getProduct)

// POST a new product
router.post('/', createProduct)

// DELETE a product
router.delete('/:id', deleteProduct)

// UPDATE a product
router.patch('/:id', updateProduct)

router.use(requireAuth)

module.exports = router