var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var session = require('express-session');
var passport = require('passport');
var routes = require('./app/routes/index.js');
var bodyParser = require('body-parser');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

app.set('view engine', 'ejs');

var uristring = process.env.MONGOLAB_URI ||
                process.env.MONGOHQ_URL ||
                process.env.MONGO_URI;
// Connect to db
mongoose.connect(uristring, function (err, res) {
  if (err) console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  else console.log ('Succeeded connected to: ' + uristring);
});

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
	secret: 'secretBrainBoost',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

// Listen on default port or 5000
app.listen(process.env.PORT || 8080);
