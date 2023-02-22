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
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage }); // can use fileFilter to filter out files that are not images

const router = express.Router()

// GET all products
router.get('/', getProducts)

//GET a single product
router.get('/:id', getProduct)

// POST a new product
router.post('/', requireAdmin, upload.single('image'), createProduct)

// DELETE a product
router.delete('/:id', requireAdmin, deleteProduct)

// UPDATE a product
router.patch('/:id', requireAdmin, updateProduct)

router.use(requireAuth)

module.exports = router