'use strict';
var Users = require('../models/users.js');
function PostHandler () {
	this.getPosts = function (req, res) {
		Users
			.findOne({ 'id': req.user.id }, { '_id': false })
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
