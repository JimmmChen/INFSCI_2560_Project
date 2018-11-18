var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    "adminId": String,
    "adminName": String,
    "adminPwd": String
  });
  
  module.exports = mongoose.model('Admin',adminSchema);