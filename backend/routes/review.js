const express = require('express')

// controller functions
const {
    getReviews,
    getReview,
    createReview,
    updateReview
} = require('../controllers/reviewController');

// middleware functions
const requireAuth = require('../middleware/requireAuth');
const verifyPurchase = require('../middleware/verifyPurchase');

const router = express.Router()

// fetch all reviews route
router.get('/', getReviews)

// fetch single review route
router.get('/:id', getReview)

// create review route
router.post('/', requireAuth, verifyPurchase, createReview)

// update review route
router.put('/:id', requireAuth, updateReview)

module.exports = router

