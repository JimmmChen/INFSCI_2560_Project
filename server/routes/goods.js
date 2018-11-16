let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Goods = require('../models/good');

//Connect to MongoDB
mongoose.connect('mongodb://jim:100103@localhost:27017/bookmall');

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected success')
});

mongoose.connection.on('error', () => {
    console.log('MongoDB connected fail')
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connected disconnected')
});

//get goods list
router.get('/list', (req, res, next) => {
    let page = parseInt(req.param('page'))
    let pageSize = parseInt(req.param('pageSize'))
    let category = req.param("category")
    let sort = req.param('sort')
    let sortAttr = req.param('sortAttribute')
    let skip = (page-1) * pageSize
    let params = {}
    let sortObj = {}
    sortObj[sortAttr] = sort
    console.log(sortObj)
    if (category != 'All') {
        params = {'category' : category}
    }
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
    goodsModel.sort(sortObj)
    goodsModel.exec((err,doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
})

//add to cart
router.post('/addCart', (req, res, next) => {
    let userId = req.cookies.userId, productId = req.body.productId
    let User = require('../models/user')

    User.findOne({userId: userId}, (err, userDoc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            if (userDoc) {
                let goodsitem = ''
                userDoc.cartList.forEach((item) => {
                    if (item.productId === productId) {
                        goodsitem = item
                        item.productNum++
                    }
                })
                if (goodsitem) {
                    userDoc.save((errSave, docSave) => {
                        if (errSave) {
                            res.json({
                                status: '1',
                                msg: errSave.message
                            })
                        } else {
                            res.json({
                                status: '0',
                                msg: '',
                                result: 'suc'
                            })
                        }
                    })
                } else {
                    Goods.findOne({productId:productId}, (err1, doc1) => {
                        if (err1) {
                            res.json({
                                status: '1',
                                msg: err1.message
                            })
                        } else {
                            if (doc1) {
                                doc1.productNum = 1
                                doc1.checked = 1
                                userDoc.cartList.push(doc1)
                                userDoc.save((err2, doc2) => {
                                    if (err2) {
                                        res.json({
                                            status: '1',
                                            msg: err2.message
                                        })
                                    } else {
                                        res.json({
                                            status: '0',
                                            msg: '',
                                            result: 'suc'
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        }
    })
})
module.exports = router;