const express = require('express');
const { contact} = require('../controllers/contactController');

const router = express.Router();

// check inventory
router.post('/', contact);

module.exports = router;