'use strict';

var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/users');
var configAuth = require('./auth');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	},
	function (req, token, refreshToken, profile, done) {
		if (req.user) {
			User.findOne({ github: profile.id }, function(err, existingUser) {
				if (existingUser) {
					req.flash('errors', { msg: 'There is already a GitHub account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
					done(err);
				} else {
					User.findById(req.user.id, function(err, user) {
						user.github = profile.id;
						user.tokens.push({ kind: 'github', accessToken: accessToken });
						user.profile.name = user.profile.name || profile.displayName;
						user.profile.picture = user.profile.picture || profile._json.avatar_url;
						user.profile.location = user.profile.location || profile._json.location;
						user.profile.website = user.profile.website || profile._json.blog;
						user.save(function(err) {
							req.flash('info', { msg: 'GitHub account has been linked.' });
							done(err, user);
						});
					});
				}
			});
		} else {
			User.findOne({ github: profile.id }, function(err, existingUser) {
				if (existingUser) {
					return done(null, existingUser);
				}
				User.findOne({ email: profile._json.email }, function(err, existingEmailUser) {
					if (existingEmailUser) {
						req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with GitHub manually from Account Settings.' });
						done(err);
					} else {
						var user = new User();
						user.email = profile._json.email;
						user.github = profile.id;
						user.tokens.push({ kind: 'github', accessToken: accessToken });
						user.profile.name = profile.displayName;
						user.profile.picture = profile._json.avatar_url;
						user.profile.location = profile._json.location;
						user.profile.website = profile._json.blog;
						user.save(function(err) {
							done(err, user);
						});
					}
				});
			});
		}
		// process.nextTick(function () {
		// 	User.findOne({ github: profile.id }, function (err, user) {
		// 		if (err) {
		// 			return done(err);
		// 		}
		//
		// 		if (user) {
		// 			return done(null, user);
		// 		} else {
		// 			var newUser = new User();
		// 			newUser.id = profile.id;
		// 			newUser.username = profile.username;
		// 			newUser.email = profile.email;
		// 			newUser.save(function (err) {
		// 				if (err) {
		// 					throw err;
		// 				}
		// 				return done(null, newUser);
		// 			});
		// 		}
		// 	});
		// });
	}));
};
