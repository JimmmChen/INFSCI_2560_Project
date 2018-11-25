var mongoose = require('mongoose')

var adminSchema = new mongoose.Schema({
    "adminId": String,
    "adminName": String,
    "adminPwd": String
  });
  
  module.exports = mongoose.model('Admin',adminSchema);