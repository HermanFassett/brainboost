'use strict';
var mongoose = require('mongoose');
var Post = new mongoose.Schema({
  type: String,
  content: {
    title: String,
    idea: { type: String, trim: true }
  },
  author: {
    name: String
  },
  votes: {
    up: Number,
    down: Number
  },
  date: {type: Date, default: Date.now },
  comments: {type: Array, default: []}
});
module.exports = mongoose.model('Post', Post);
