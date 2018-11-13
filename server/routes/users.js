let express = require('express')
let router = express.Router()
let User = require('../models/user')
require('../util/util')

//login
router.post('/login', (req, res, next) => {
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(param, (err,doc) => {
    if (err) {
      res.json({
          status: '1',
          msg: err.message
      })
    } else {
        if (doc) {
          res.cookie('userId', doc.userId, {
            path: '/',
            maxAge: 1000 * 60 * 60
          })
          res.cookie('userName', doc.userName, {
            path: '/',
            maxAge: 1000 * 60 * 60
          })
          res.json({
            status: '0',
            msg: '',
            result: {
              userName: doc.userName
            }
          })
        } else { 
            res.json({
            status: '1',
            msg: 'User name or password mismatch',
            result: ''
            });
        }
    }
  })
})

//logout
router.post('/logout', (req, res, next) => {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})

//check login
router.get('/checkLogin', (req, res, next) => {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName
    })
  } else {
    res.json({
      status: '1',
      msg: 'Not login yet',
      result: ''
    })
  }
})

//get user's cart list
router.get('/cart/list', (req, res, next) => {
  let userId = req.cookies.userId
  User.findOne({userId:userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        })
      }
    }
  })
})

//get item count in cart
router.get('/getCartCount', (req, res, next) => {
  let userId = req.cookies.userId
  User.findOne({userId:userId}, (err, user) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      let cartList = user.cartList
      let cartCount = 0
      cartList.forEach((item) => {
        cartCount += parseInt(item.productNum)
      })
      res.json({
        status: '0',
        msg: '',
        result: cartCount
      })
    }
  })
})

//delete goods in cart
router.post('/cart/del', (req, res, next) => {
  let userId = req.cookies.userId, productId = req.body.productId
  User.update({userId:userId}, {$pull:{cartList:{productId:productId}}}, (err, doc) => {
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
  })
})

//edit goods number
router.post('/cart/editNum', (req, res, next) => {
  let userId = req.cookies.userId, 
    productId = req.body.productId,
    productNum = req.body.productNum
  User.update({userId:userId, 'cartList.productId':productId}, {
    'cartList.$.productNum':productNum
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

//check or uncheck item in cart
router.post('/cart/checkToggle', (req, res, next) => {
  let userId = req.cookies.userId, 
    productId = req.body.productId,
    check = req.body.check,
    checkAll = req.body.checkAll
  if(checkAll){
    User.findOne({userId:userId}, ((err, user) => {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      } else {
        if (user) {
          user.cartList.forEach((item) => {
            item.checked = checkAll
          })
          user.save((err1, doc) => {
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            })
          })
        } 
      }
    }))
  } else {
    User.update({userId:userId, 'cartList.productId':productId}, {
      'cartList.$.checked':check
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
  }
})

//get user's address list
router.get("/address", (req, res, next) => {
  let userId = req.cookies.userId
  User.findOne({userId:userId}, (err, user) => {
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
        result: user.addressList
      })
    }
  })
})

//set default address
router.post("/defaultAddress", (req, res, next) => {
  let userId = req.cookies.userId, 
    addressId = req.body.addressId
  User.findOne({userId:userId}, (err, user) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      let addressList =  user.addressList
      addressList.forEach((item) => {
        item.isDefault = item.addressId === addressId ? true : false
      })
      user.save((err1,doc) => {
        if (err1) {
          res.json({
            status: '1',
            msg: err.message,
            result: ''
          })
        } else {
          res.json({
            status: '0',
            msg: '',
            result: ''
          })
        }
      })
    }
  })
})

//delete address
router.delete('/address', (req, res, next) => {
  let userId = req.cookies.userId, 
    addressId = req.body.addressId
    User.update({userId:userId}, {
      $pull:{
        addressList:{
          addressId: addressId
        }
      }
    }, (err, doc) => {
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
    })
})

router.put('/payment', (req, res, next) => {
  let userId = req.cookies.userId
  let orderTotal = req.body.orderTotal
  let addressId = req.body.addressId
  User.findOne({userId:userId}, (err, user) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      let address = ''
      //get selected address info
      user.addressList.forEach((item) => {
        if (addressId === item.addressId) {
          address = item
        }
      })
      //get cart info
      let goodsList = []
      let restGoodsList = []
      user.cartList.filter((item) => {
        if (item.checked === '1') {
          goodsList.push(item)
        } else {
          restGoodsList.push(item)
        }
      })
      //update cart list
      user.cartList = restGoodsList
      //create order
      var platform = '622'
      let random1 = Math.floor(Math.random() * 10)
      let random2 = Math.floor(Math.random() * 10)
      let sysDate = new Date().Format('yyyyMMddhhmmss')
      let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
      let orderId = platform + random1 + sysDate + random2
      let order ={
        orderId: orderId,
        orderTotal: orderTotal,
        addressInfo: address,
        goodsList: goodsList,
        orderStatus: '1',
        createDate: createDate
      }
      user.orderList.push(order)
      user.save((err1,doc) => {
        if (err1) {
          res.json({
            status: '1',
            msg: err.message,
            result: ''
          })
        } else {
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: order.orderId,
              orderTotal: order.orderTotal
            }
          })
        }
      })
    }
  })
})

//retrieve order details by order id
router.get('/orderDetail', (req, res, next) => {
  let userId = req.cookies.userId
  let orderId = req.param('orderId')
  User.findOne({userId:userId}, (err, user) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      let orderList = user.orderList
      if (orderList.length > 0) {
        let orderTotal = 0
        orderList.forEach((item) => {
          if (item.orderId === orderId) {
            orderTotal = item.orderTotal
          }
        })
        res.json({
          status: '0',
          msg: '',
          result: {
            orderId: orderId,
            orderTotal: orderTotal
          }
        })
      } else {
        res.json({
          status: '12001',
          msg: 'No order with orderId:' + orderId,
          result: ''
        })
      }
    }
  })
})
module.exports = router
