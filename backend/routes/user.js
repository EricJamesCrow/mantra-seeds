const express = require('express')

// controller functions
const { 
    signupUser, 
    loginUser, 
    fetchUser, 
    fetchUsers, 
    changePassword, 
    requestResetPassword, 
    resetPassword, 
    checkResetPasswordToken,
    confirmAccount,
} = require('../controllers/userController')

// middleware function
const requireAuth = require('../middleware/requireAuth')
const requireAdmin = require('../middleware/requireAdmin')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// confirm email route
router.get('/confirm-account/:token', confirmAccount)

// change password route
router.post('/change-password', requireAuth, changePassword)

// reset password route
router.post('/request-reset-password', requestResetPassword)

// check reset password token route
router.post('/check-reset-password-token/:token', checkResetPasswordToken)

// reset password route
router.post('/reset-password/:token', resetPassword)

// fetch user route
router.get('/:id', requireAuth, fetchUser)

// fetch all users route
router.get('/', requireAdmin, fetchUsers)

module.exports = router