'use strict';
var Users = require('../models/users.js');
var Posts = require('../models/posts.js');
var passport = require('passport');
var crypto = require('crypto');
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
		if (req.user) {
			Posts.find({ 'author.name' : req.user.profile.name}, function(err, result) {
				res.render(path + '/public/profile.ejs', {
					name: req.user.profile.name,
					img: req.user.profile.picture,
					date: req.user.joinDate,
					email: req.user.email,
					posts: result,
					id: req.user._id
				});
			});
		}
	}
	this.postLogin = function(req, res, next) {
	  passport.authenticate('local', function(err, user, info) {
	    if (err) {
	      return next(err);
	    }
	    if (!user) {
	      console.log(info.message);
	      return res.redirect('/login');
	    }
	    req.logIn(user, function(err) {
	      if (err) {
	        return next(err);
	      }
	      res.redirect(req.session.returnTo || '/');
	    });
	  })(req, res, next);
	};
	this.postSignup = function(req, res, next) {
		var md5 = crypto.createHash('md5').update(req.body.email).digest('hex');
	  var img = 'https://gravatar.com/avatar/' + md5 + '&d=retro';
	  var user = new Users({
			joinDate: new Date(),
			profile: {
				picture: img,
				name: req.body.username
			},
	    email: req.body.email,
	    password: req.body.password
	  });

	  Users.findOne({ email: req.body.email }, function(err, existingUser) {
	    if (existingUser) {
	      console.log('Account with that email address already exists.');
	      return res.redirect('/signup');
	    }
	    user.save(function(err) {
	      if (err) {
	        return next(err);
	      }
	      req.logIn(user, function(err) {
	        if (err) {
	          return next(err);
	        }
	        res.redirect('/');
	      });
	    });
	  });
	};
}
module.exports = UserHandler;
