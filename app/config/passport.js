'use strict';
var LocalStrategy = require('passport-local').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var OAuthStrategy = require('passport-oauth').OAuthStrategy;
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
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

	/**
	 * Sign in using Email and Password.
	 */
	passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
		console.log(email);
	  email = email.toLowerCase();
	  User.findOne({ email: email }, function(err, user) {
			console.log(err + " " + user);
	    if (!user) {
	      return done(null, false, { message: 'Email ' + email + ' not found'});
	    }
	    user.comparePassword(password, function(err, isMatch) {
	      if (isMatch) {
	        return done(null, user);
	      } else {
	        return done(null, false, { message: 'Invalid email or password.' });
	      }
	    });
	  });
	}));

	passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	},
	function (req, accessToken, refreshToken, profile, done) {
		if (req.user) {
			User.findOne({ github: profile.id }, function(err, existingUser) {
				if (existingUser) {
					console.log('There is already a GitHub account that belongs to you. Sign in with that account or delete it, then link it with your current account.');
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
							console.log('GitHub account has been linked.');
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
						console.log('There is already an account using this email address. Sign in to that account and link it with GitHub manually from Account Settings.');
						done(err);
					} else {
						var user = new User();
						user.email = profile._json.email;
						user.joinDate = new Date();
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
	}));
	passport.use(new GoogleStrategy({
		clientID: configAuth.googleAuth.clientID,
		clientSecret: configAuth.googleAuth.clientSecret,
		callbackURL: configAuth.googleAuth.callbackURL
	},
	function(req, accessToken, refreshToken, profile, done) {
	  if (req.user) {
	    User.findOne({ google: profile.id }, function(err, existingUser) {
	      if (existingUser) {
	        console.log('There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.');
	        done(err);
	      } else {
	        User.findById(req.user.id, function(err, user) {
	          user.google = profile.id;
						user.joinDate = new Date();
	          user.tokens.push({ kind: 'google', accessToken: accessToken });
	          user.profile.name = user.profile.name || profile.displayName;
	          user.profile.gender = user.profile.gender || profile._json.gender;
	          user.profile.picture = user.profile.picture || profile._json.image.url;
	          user.save(function(err) {
	            console.log('Google account has been linked.');
	            done(err, user);
	          });
	        });
	      }
	    });
	  } else {
	    User.findOne({ google: profile.id }, function(err, existingUser) {
	      if (existingUser) {
	        return done(null, existingUser);
	      }
	      User.findOne({ email: profile.emails[0].value }, function(err, existingEmailUser) {
	        if (existingEmailUser) {
	          console.log('There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.');
	          done(err);
	        } else {
	          var user = new User();
	          user.email = profile.emails[0].value;
	          user.google = profile.id;
	          user.tokens.push({ kind: 'google', accessToken: accessToken });
	          user.profile.name = profile.displayName;
	          user.profile.gender = profile._json.gender;
	          user.profile.picture = profile._json.image.url;
	          user.save(function(err) {
	            done(err, user);
	          });
	        }
	      });
	    });
	  }
	}));
	/**
	 * Authorization Required middleware.
	 */
	exports.isAuthorized = function(req, res, next) {
	  var provider = req.path.split('/').slice(-1)[0];

	  if (_.find(req.user.tokens, { kind: provider })) {
	    next();
	  } else {
	    res.redirect('/auth/' + provider);
	  }
	};
};
