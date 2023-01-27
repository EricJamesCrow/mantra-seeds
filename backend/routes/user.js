const express = require('express')

// controller functions
const { signupUser, loginUser, fetchUser } = require('../controllers/userController')

// middleware function
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// fetch user route
router.get('/:id', requireAuth, fetchUser)

module.exports = router