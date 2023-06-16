const Review = require('../models/reviewModel')
const Product = require('../models/productModel')
const mongoose = require('mongoose')

// get all reviews
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({}).sort({createdAt: -1});

        return res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
};

// get a single review
const getReview = async (req, res) => {
    try {
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

        return res.status(200).json(review)
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
};

// create new review
const createReview = async (req, res) => {
    try {
        const { id, user, name, title, rating, comment } = req.body;

        try {
            const product = await Product.findById(id)
            if(!product) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Product not found'
                })
            }
        } catch (error) {
            return res.status(404).json({
                status: 'fail',
                message: 'Product not found'
            })
        }

        if (!name || !title || !rating || !comment) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide all the required fields'
            })
        }

        const review = await Review.create({
            user,
            name,
            title,
            rating,
            comment,
            product: id
            })

        return res.status(201).json(review);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
};

// update review
const updateReview = async (req, res) => {
    try {
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

        return res.status(200).json(review)
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
};


module.exports = {
    getReviews,
    getReview,
    createReview,
    updateReview
}