let express = require('express')
let router = express.Router()
let Admin = require('../models/admin')
let Good = require('../models/good')
let User = require('../models/user')
let multer = require('multer')

//log in
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
            maxAge: 1000 * 60 * 60 * 24
          }),
          res.cookie('adminName', doc.adminName, {
            path: '/',
            maxAge: 1000 * 60 * 60 * 24
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

//log out
router.post('/logout', (req, res, next) => {
  res.cookie('adminId', '', {
    path: '/',
    maxAge: -1
  })
  res.cookie('adminName', '', {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Users/chenjing/Desktop/INFSCI_2560_Project/static')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
})
let upload = multer({ storage: storage })

//create a new book
router.post('/book',upload.single('cover'), (req,res,next) => {
  let book = {
    productId: req.body.id,
    productName: req.body.title,
    salePrice: req.body.price,
    productImage: req.file.filename,
    productUrl: req.body.url,
    publishDate: req.body.date,
    category: req.body.category
  }
  console.log(book)
  Good.insertMany(book, (error, docs) => {
    if (docs) {
      res.redirect('http://localhost:8080/manageBook')
    } else {
      res.json({
        status: '1',
        msg: error.message,
        result: ''
      })
    }
  })
})

//get all orders
router.get('/order', (req,res,next) => {
  User.find({}, (err,doc) => {
    orders = []
    for (var i = 0; i < doc.length; i++) {
      orders = orders.concat(doc[i].orderList);
    }
    res.json({
      status: '0',
      msg: '',
      result: orders
    })
  })
})

//update order status
router.put('/order', (req, res, next) => {
  let orderId = req.body.orderId
  let newStatus = req.body.newStatus
  User.update({'orderList.orderId':orderId}, {
    'orderList.$.orderStatus':newStatus
  }, ((err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  }))
})
module.exports = router;