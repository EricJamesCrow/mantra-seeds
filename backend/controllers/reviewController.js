const Review = require('../models/reviewModel')
const Product = require('../models/productModel')
const mongoose = require('mongoose')

// get all reviews
const getReviews = async (req, res) => {
    const reviews = await Review.find({}).sort({createdAt: -1})

    res.status(200).json(reviews)
};

// get a single review
const getReview = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No review avaiable with that id'})
    }

    const review = await Review.findById(id)

    if(!review) {
        return res.status(404).json({
            status: 'fail',
            message: 'Review not found'
        })
    }

    res.status(200).json(review)
};

// create new review
const createReview = async (req, res) => {
    const { id, user, rating, title, comment } = req.body;

    try {
        const product = await Product.findById(id)
    } catch (error) {
        return res.status(404).json({
            status: 'fail',
            message: 'Product not found'
        })
    }

    if (!user || !rating || !comment) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide all the required fields'
        })
    }

    const review = await Review.create({
        user,
        rating,
        title,
        comment,
        product: id
        })

    res.status(201).json(review)

};

// update review
const updateReview = async (req, res) => {
    const { id } = req.params
    const { user, rating, comment } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No review avaiable with that id'})
    }

    const review = await Review.findById(id)


    if (!review) {
        return res.status(404).json({
            status: 'fail',
            message: 'Review not found'
        })

    }

    review.user = user
    review.rating = rating
    review.comment = comment

    await review.save()

    res.status(200).json(review)
};


module.exports = {
    getReviews,
    getReview,
    createReview,
    updateReview
}