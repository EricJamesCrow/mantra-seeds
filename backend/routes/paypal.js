const express = require('express')
const router = express.Router()

const config = (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
}

router.get('/config', config)

module.exports = router