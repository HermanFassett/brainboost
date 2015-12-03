var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");
var session = require('express-session');
var passport = require('passport');
var routes = require('./app/routes/index.js');
var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

var uristring = process.env.MONGOLAB_URI ||
                process.env.MONGOHQ_URL ||
                process.env.MONGO_URI;
// Connect to db
mongoose.connect(uristring, function (err, res) {
  if (err) console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretBrainBoost',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
// app.use(passport.initialize());
// app.use(passport.session());
// Load html
// app.use(express.static(__dirname + "/public"));
// app.use(bodyParser.json());
// Get current user
// app.get("/login/:user", function(req, res) {
//   res.send(username);
// });
// app.post("/login/:user", function(req, res) {
//   username = req.body;
// });
// app.get("/logout", function(req, res) {
//   username = "!";
//   res.sendFile(path.join(__dirname + "/public/login/index.html"));
// });
//
//
//
// function change() {
//   app.get("/users/:users", function(req, res) {
//     users.find({}, function(err, obj) {
//       res.json(obj);
//     });
//   });
//   app.post("/users/:users", function(req, res) {
//     if (req.body.type === "login") {
//       users.find({$and: [{email: req.body.email}, {password: req.body.password}]}, function(err, obj) {
//         if (obj.length > 0) {
//           res.json(obj);
//         }
//         else { res.send("fail");}
//       })
//     }
//     else {
//       users.find({$or: [{username: req.body.username}, {email: req.body.email}]}, function(err, obj) {
//         if (obj.length > 0) {
//           res.send("fail");
//         }
//         else {
//           users.create(req.body, function(err, data) {
//             if (err) console.log(err);
//           });
//           res.send("success");
//         }
//       });
//     }
//   });
//   app.post("/users/:user", function(req, res, next, user) {
//
//   });
//   app.get("/:all", function(req, res) {
//     boosts.find({}, function(err, obj) {
//       res.json(obj);
//     });
//   });
//   app.get("/boosts/:boosts", function(req, res) {
//     boosts.find({type: "boost"}, function(err, obj) {
//       res.json(obj);
//     });
//   });
//   app.get("/brains/:brains", function(req, res) {
//     boosts.find({type: "brain"}, function(err, obj) {
//       res.json(obj);
//     });
//   });
// }
// In case the browser connects before the database is connected, the
// user will see this message.
var found = ['DB Connection not yet established.  Try again later.  Check the console output for error messages if this persists.'];

// Listen on default port or 5000
app.listen(process.env.PORT || 5000);
