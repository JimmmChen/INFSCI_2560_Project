var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({
  "productId":{type:String},
  "productName":String,
  "salePrice":Number,
  "productNum":Number,
  "checked":String,
  "productImage":String,
  "publishDate": Number,
  "category":String,
  "productUrl": String
});

module.exports = mongoose.model('Good',produtSchema);
