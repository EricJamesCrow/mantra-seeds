const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipientListSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    recipients: [
        {
            email: {
                type: String,
                required: true
            },
            unsubscribed: {
                type: Boolean,
                default: false
            }
        }
    ]
}, { timestamps: true})

module.exports = mongoose.model('RecipientList', recipientListSchema)