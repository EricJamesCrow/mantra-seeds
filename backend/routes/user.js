const express = require('express')

// controller functions
const { signupUser, loginUser, fetchUser, fetchUsers, changePassword } = require('../controllers/userController')

// middleware function
const requireAuth = require('../middleware/requireAuth')
const requireAdmin = require('../middleware/requireAdmin')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// change password route
router.post('/change-password', requireAuth, changePassword)

// fetch user route
router.get('/:id', requireAuth, fetchUser)

// fetch all users route
router.get('/', requireAdmin, fetchUsers)

module.exports = router