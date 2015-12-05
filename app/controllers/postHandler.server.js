'use strict';
var Users = require('../models/users.js');
var Posts = require('../models/posts.js');
function PostHandler () {
	this.getPosts = function (req, res) {
		Posts.findOne({ 'type': req.posts.type })//, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json(result.posts);
			});
	};
	this.addPost = function (req, res) {
		Users
			.findOneAndUpdate({ 'id': req.user.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result.nbrClicks);
				}
			);
	};
	this.deletePost = function (req, res) {
		Users
			.findOneAndUpdate({ 'id': req.user.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result.nbrClicks);
				}
			);
	};
}
module.exports = PostHandler;
