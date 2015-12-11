'use strict';
var Users = require('../models/users.js');
var Posts = require('../models/posts.js');
var path = process.cwd();

function PostHandler () {
	this.getPosts = function (req, res) {
		Posts.find({}, function(err, result) {
			res.render(path + '/public/posts.ejs', {
				posts: result,
				type: "All Posts",
				sortby: req.params.sort || "dates",
				active: req.path.split("/")[1]
			});
		});
	};
	this.getBoosts = function(req, res) {
		Posts.find({'type': 'boost'}, function(err, result) {
			res.render(path + '/public/posts.ejs', {
				posts: result,
				type: "Boosts",
				sortby: req.params.sort || "dates",
				active: req.path.split("/")[1]
			});
		});
	}
	this.getBrains = function(req, res) {
		Posts.find({'type': 'brain'}, function(err, result) {
			res.render(path + '/public/posts.ejs', {
				posts: result,
				type: "Brains",
				sortby: req.params.sort || "dates",
				active: req.path.split("/")[1]
			});
		});
	}
	this.getPost = function(req, res) {
		Posts.findOne({'_id': req.params.id}).exec(function(err, result) {
			if (err) throw err;
			res.render(path + '/public/post.ejs',
			{
				post: result,
				type: result.type.charAt(0).toUpperCase() + result.type.slice(1),
				owner: (req.user && req.user.profile.name == result.author.name)
			});
		});
	}
	this.addPost = function (req, res) {
		var type = req.query.type.toLowerCase();
		var post = new Posts({
			author: {name:req.user.profile.name},
			content: {
				title: req.query.title,
				idea: req.query.idea
			},
			poll: req.query.poll,
			votes: {
				up: 0,
				down: 0
			},
			date: new Date(),
			type: type
		});
		console.log(post);
		post.save(function(err) {
			if (err) console.log("Error on save!");
			else res.redirect('/posts/' + post._id);
		});
	};
	this.deletePost = function (req, res) {
		Posts.findOne( { '_id': req.params.id }).remove().exec();
		res.redirect('/posts');
	};
	this.addVote = function(req, res) {
    Users.findOne({'profile.name': req.user.profile.name}, function(err, result) {
			if (result.votes.indexOf(req.params.id) === -1) {
				Users.findOneAndUpdate({'profile.name': req.user.profile.name}, {$push: {votes: req.params.id}}, function(err) {
					if (err) console.log(err);
				});
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
			}
    });
  }
	this.getVotes = function (req, res) {
		Posts.findOne({'_id': req.params.id }, function (err, result) {
			if (err) throw err;
			res.json(result.votes);
		});
	};
	this.addComment = function(req, res) {
		if (req.user) {
			var comment = {
				author: req.user.profile.name,
				comment: req.params.comment,
				date: new Date()
			};
			Posts.findOneAndUpdate( {'_id': req.params.id},
			{ $push:
				{
					comments: comment
				}}, function(err, result) {
					if (err) console.log(err);
					res.json(comment);
			});
		}
	}
	this.getComments = function (req, res) {
		Posts.findOne({'_id': req.params.id }, function (err, result) {
			if (err) throw err;
			res.json(result.comments);
		});
	};
}
module.exports = PostHandler;
