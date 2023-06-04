const express = require('express')
const { addToNewsletter } = require('../controllers/recipientListController')
const router = express.Router()

// add a new recipient
router.post('/newsletter', addToNewsletter)

module.exports = router