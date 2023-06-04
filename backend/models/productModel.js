const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    chakra: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    reserved: { type: Number, default: 0 }
}, { timestamps: true})

module.exports = mongoose.model('Product', productSchema)