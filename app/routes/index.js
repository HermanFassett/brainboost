'use strict';

var path = process.cwd();
var PostHandler = require(path + '/app/controllers/postHandler.server.js');
var UserHandler = require(path + '/app/controllers/userHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) return next();
		else res.redirect('/login');
	}

	var postHandler = new PostHandler();
	var userHandler = new UserHandler();

	// Home page
	app.route('/').get(function (req, res) {
		res.render(path + '/public/index.ejs');
	});
	// Login page
	app.route('/login').get(function (req, res) {
		res.render(path + '/public/login.ejs');
	});
	// View signup page
	app.route('/signup').get(function (req, res) {
		res.render(path + '/public/signup.ejs');
	});
	// Logout
	app.route('/logout').get(function (req, res) {
		req.logout();
		res.redirect('/login');
	});
	// View profile
	app.route('/profile').get(isLoggedIn, userHandler.getActiveUser);
	// View all users
	app.route('/users').get(isLoggedIn, function (req, res) {
		res.render(path + '/public/users.ejs');
	});
	// Get a user
	app.route('/user/:name').get(userHandler.getUser);
	// New post
	app.route('/new').get(isLoggedIn, function(req, res) {
		res.render(path + '/public/new.ejs');
	});

	// Submit a new post
	app.route('/send').get(isLoggedIn, postHandler.addPost);

	// Get boosts and brains
	app.route('/boosts').get(postHandler.getBoosts);
	app.route('/boosts/sort/:sort').get(postHandler.getBoosts);
	app.route('/brains').get(postHandler.getBrains);
	app.route('/brains/sort/:sort').get(postHandler.getBrains);

	// Get posts
	app.route('/posts/:id').get(postHandler.getPost);
	app.route('/posts').get(postHandler.getPosts);
	app.route('/posts/sort/:sort').get(postHandler.getPosts);

	// Logged in user
	app.route('/api/:id').get(isLoggedIn, function (req, res) {
		res.json(req.user);
	});

  //Github auth
	app.route('/auth/github').get(passport.authenticate('github'));
	app.route('/auth/github/callback').get(passport.authenticate('github',
	{
		successRedirect: '/profile',
		failureRedirect: '/login'
	}));

	//Google auth
	app.route('/auth/google').get(passport.authenticate('google'));
	app.route('/auth/google/callback').get(passport.authenticate('google',
	{
		successRedirect: '/profile',
		failureRedirect: '/login'
	}));

	app.route('/posts/:id/delete/post').get(isLoggedIn, postHandler.deletePost);
	app.route('/posts/:id/comment/:comment').post(isLoggedIn, postHandler.addComment).get(isLoggedIn, postHandler.getComments);
	app.route('/posts/:id/:vote').get(isLoggedIn, postHandler.getVotes).post(isLoggedIn,postHandler.addVote);
};
