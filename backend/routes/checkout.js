const express = require('express');
const { checkInventory } = require('../controllers/checkoutController');

const router = express.Router();

// check inventory
router.post('/check-inventory', checkInventory);

module.exports = router;