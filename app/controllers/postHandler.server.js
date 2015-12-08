'use strict';
var Users = require('../models/users.js');
var Posts = require('../models/posts.js');
var path = process.cwd();

function PostHandler () {
	this.getPosts = function (req, res) {
		Posts.find({}, function(err, result) {
			res.render(path + '/public/posts.ejs', {posts:result, type: "All Posts"});
		});
	};
	this.getBoosts = function(req, res) {
		Posts.find({'type': 'boost'}, function(err, result) {
			res.render(path + '/public/posts.ejs', {posts: result, type: "Boosts"});
		});
	}
	this.getBrains = function(req, res) {
		Posts.find({'type': 'brain'}, function(err, result) {
			res.render(path + '/public/posts.ejs', {posts: result, type: "Brains"});
		});
	}
	this.getPost = function(req, res) {
		Posts.findOne({'_id': req.params.id}).exec(function(err, result) {
			if (err) throw err;
			res.render(path + '/public/post.ejs',
			{
				post: result,
				type: result.type.charAt(0).toUpperCase() + result.type.slice(1)
			});
		});
	}
	this.addPost = function (req, res) {
		console.log(req.query);
		var post = new Posts({
			content: {
				title: req.query.title,
				idea: req.query.idea
			},
			votes: {
				up: 0,
				down: 0
			},
			date: new Date(),
			type: req.query.type.toLowerCase()
		});
		post.save(function(err) {
			if (err) console.log("Error on save!");
			else res.redirect('/posts/' + post._id);
		});
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
