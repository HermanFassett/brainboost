'use strict';

var path = process.cwd();
var PostHandler = require(path + '/app/controllers/postHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var postHandler = new PostHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/signup')
		.get(function (req, res) {
			res.sendFile(path + '/public/signup.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/user')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/user.html');
		});

	app.route('/users')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/users.html');
		});

	app.route('/boosts')
		.get(function (req, res) {
			res.sendFile(path + '/public/boosts.html');
		});

	app.route('/brains')
		.get(function (req, res) {
			res.sendFile(path + '/public/brains.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/user',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/posts')
		.get(isLoggedIn, postHandler.getPosts)
		.post(isLoggedIn, postHandler.addPost)
		.delete(isLoggedIn, postHandler.deletePost);
};
