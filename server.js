var express = require("express");
var mongoose = require("mongoose");
var app = express();
var mongojs = require("mongojs");
var db = mongojs("boosts", ["boosts"]);

// Load html
app.use(express.static(__dirname + "/public"));

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/HelloMongoose';

mongoose.connect(uristring, function (err, res) {
 if (err) {
 console.log ('ERROR connecting to: ' + uristring + '. ' + err);
 } else {
 console.log ('Succeeded connected to: ' + uristring);
 }
});

var boostSchema = new mongoose.Schema({
  content: {
    title: String,
    idea: { type: String, trim: true }
  },
  author: {
    name: String,
    email: String
  },
  votes: Number,
  date: Date
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'PowerUsers' collection in the MongoDB database
var DBoost = mongoose.model('boosts', boostSchema);

// Clear out old data
DBoost.remove({}, function(err) {
  if (err) {
    console.log ('error deleting old data.');
  }
});

// Creating one user.
var first = new DBoost ({
  content: { title: 'Voting App', idea: 'This idea I had is a voting app called Brain Boost' },
  author: { name: "Herman Fassett", email: "hermanfassett@gmail.com" },
  votes: 45,
  date: Date.now
});

// Saving it to the database.
first.save(function (err) {if (err) console.log ('Error on save!')});

// Creating more users manually
var second = new DBoost ({
  content: { title: 'Stock Market app', idea: 'This idea I had is a financial app called finactal using...' },
  author: { name: "Jon Fassett", email: "fassett@fairpoint.net" },
  votes: 5,
  date: Date.now
});
second.save(function (err) {if (err) console.log ('Error on save!')});

// In case the browser connects before the database is connected, the
// user will see this message.
var found = ['DB Connection not yet established.  Try again later.  Check the console output for error messages if this persists.'];
// app.get("/boosts", function(req, res) {
//   db.boosts.find(function(err, docs) {
//     res.json(docs);
//   });
// });

// Listen on default port or 3000
app.listen(process.env.PORT || 3000);
