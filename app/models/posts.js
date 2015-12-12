'use strict';
var mongoose = require('mongoose');
var Post = new mongoose.Schema({
  type: String,
  content: {
    title: { type: String, required: true},
    idea: { type: String, trim: true }
  },
  author: {
    name: String
  },
  poll: {type: Array, default: []},
  votes: {
    up: Number,
    down: Number
  },
  date: {type: Date, default: Date.now },
  comments: {type: Array, default: []}
});
module.exports = mongoose.model('Post', Post);
