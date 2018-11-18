let express = require('express')
let router = express.Router()
let Admin = require('../models/admin')

router.post('/login', (req, res, next) => {
    console.log('log in')
    res.json({
        status: '10001',
        msg: 'Not login yet',
        result: ''
      })
})

module.exports = router;