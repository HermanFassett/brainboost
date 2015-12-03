'use strict';

var mongoose = require('mongoose');

var User = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  joinDate: Date
});

module.exports = mongoose.model('User', User);
