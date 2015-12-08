'use strict';

var path = process.cwd();
var PostHandler = require(path + '/app/controllers/postHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) return next();
		else res.redirect('/login');
	}

	var postHandler = new PostHandler();

	app.route('/').get(function (req, res) {
		res.render(path + '/public/index.ejs');
	});

	app.get('/test', function(req, res) {
		res.render(path + '/public/posts.ejs');
	});

	app.route('/login').get(function (req, res) {
		res.render(path + '/public/login.ejs');
	});

	app.route('/signup').get(function (req, res) {
		res.render(path + '/public/signup.ejs');
	});

	app.route('/logout').get(function (req, res) {
		req.logout();
		res.redirect('/login');
	});

	app.route('/profile').get(isLoggedIn, function (req, res) {
		res.render(path + '/public/profile.ejs');
	});

	app.route('/users').get(isLoggedIn, function (req, res) {
		res.render(path + '/public/users.ejs');
	});

	app.route('/boosts').get(postHandler.getBoosts);
	app.route('/brains').get(postHandler.getBrains);

	app.route('/posts/:id').get(postHandler.getPost);
	app.route('/posts').get(postHandler.getPosts);

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

	app.route('/api/:id/posts').get(isLoggedIn, postHandler.getPosts);
		// .post(isLoggedIn, postHandler.addPost)
		// .delete(isLoggedIn, postHandler.deletePost);
};
