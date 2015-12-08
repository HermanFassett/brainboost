'use strict';
var Users = require('../models/users.js');
var Posts = require('../models/posts.js');
var path = process.cwd();

function UserHandler () {
	var apiUrl = path + '/api/:id';
	this.getUser = function (req, res) {
		Users.findOne({ 'profile.name' : req.params.name }, function(err, result) {
			Posts.find({ 'author.name' : req.params.name}, function(err, postr) {
				res.render(path + '/public/user.ejs', {
					name: result.profile.name,
					img: result.profile.picture,
					date: result.joinDate,
					posts: postr
				});
			});
		});
	};
	this.getActiveUser = function(req, res) {
		console.log(req.user);
		res.json(req.user);
	}
}
module.exports = UserHandler;
