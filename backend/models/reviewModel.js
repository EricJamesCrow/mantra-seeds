const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        },
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },      
    rating: {
        type: Number,
        required: true
        },
    comment: {
        type: String,
        required: true
        },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
    }, 
    {   timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review

