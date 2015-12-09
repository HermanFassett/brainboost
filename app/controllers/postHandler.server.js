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
		var post = new Posts({
			author: {name:req.user.profile.name},
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
	this.addVote = function(req, res) {
    Users.findOneAndUpdate({'profile.name': req.user.name}, {$push: {votes: req.params.id}}, function(err, result) {
      var vote = req.params.vote;
			if (vote == "up") {
      	Posts.findOneAndUpdate({'_id': req.params.id}, {$inc: {'votes.up': 1}}, function(e, r) {
					res.json(parseInt(r.votes.up) - parseInt(r.votes.down));
				});
			}
			else if (vote == "down") {
				Posts.findOneAndUpdate({'_id': req.params.id}, {$inc: {'votes.down': 1}}, function(e, r) {
					res.json(parseInt(r.votes.up) - parseInt(r.votes.down));
				});
			}
    });
  }
	this.getVotes = function (req, res) {
		Posts.findOne({'_id': req.params.id }, function (err, result) {
			if (err) throw err;
			res.json(parseInt(result.votes.up) - parseInt(result.votes.down));
		});
	};
}
module.exports = PostHandler;
