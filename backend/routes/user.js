const express = require('express')

// controller functions
const { signupUser, loginUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// router.use('/admin', requireAuthAdmin, (req, res) => {
//     if (req.user.role === 1) {
//       // Render the Admin page
//       res.render('admin', { user: req.user })
//     } else {
//       // Return a 403 error if the user doesn't have a role of 1
//       res.status(403).json({ error: 'Forbidden' })
//     }
//   })

module.exports = router