let express = require('express')
let router = express.Router()
let Admin = require('../models/admin')

router.post('/login', (req, res, next) => {
  let param = {
      adminName: req.body.adminName,
      adminPwd: req.body.adminPwd
  }
	Admin.findOne(param, (err,doc) => {
    if (err) {
      res.json({
          status: '1',
          msg: err.message
      })
    } else {
        if (doc) {
          res.cookie('adminId', doc.adminId, {
            path: '/',
            maxAge: 1000 * 60 * 60
          })
          res.cookie('adminName', doc.adminName, {
            path: '/',
            maxAge: 1000 * 60 * 60
          })
          res.json({
            status: '0',
            msg: '',
            result: {
              adminName: doc.adminName
            }
          })
        } else { 
            res.json({
            status: '1',
            msg: 'Admin name or password mismatch',
            result: ''
            });
        }
    }
  })
})

module.exports = router;