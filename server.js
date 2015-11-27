var express = require("express");
var mongoose = require("mongoose");
var app = module.exports = express();
// Load html
app.use(express.static(__dirname + "/public"));

var uristring = process.env.MONGOLAB_URI ||
                process.env.MONGOHQ_URL ||
                "mongodb://hermanfassett:gamergerm@ds059694.mongolab.com:59694/heroku_g928tnf0";

// Connect to db
mongoose.connect(uristring, function (err, res) {
  if (err) console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  else {
    console.log ('Succeeded connected to: ' + uristring);
    change();
  }
});

function change() {
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
    date: {type: Date, default: Date.now }
  });

  // Compiles the schema into a model, opening (or creating, if
  // nonexistent) the 'PowerUsers' collection in the MongoDB database
  var boosts = mongoose.model('boosts', boostSchema);

  // Clear out old data
  boosts.remove({}, function(err) {
    if (err) console.log ('error deleting old data.');
  });

  // Creating one user.
  var first = new boosts({
    content: { title: 'Voting App', idea: 'This idea I had is a voting app called Brain Boost' },
    author: { name: "Herman Fassett", email: "hermanfassett@gmail.com" },
    votes: 45,
    date: new Date()
  });
  // Saving it to the database.
  first.save(function (err) {if (err) console.log ('Error on save!')});

  // Creating more users manually
  var second = new boosts({
    content: { title: 'Stock Market app', idea: 'This idea I had is a financial app called finactal using...' },
    author: { name: "Jon Fassett", email: "fassett@fairpoint.net" },
    votes: 5,
    date: new Date()
  });
  second.save(function (err) {if (err) console.log ('Error on save!')});
  app.get("/:boosts", function(req, res) {
    var data;
    boosts.find({}, function(err, obj) {
      res.json(obj);
    });
  });
}
// In case the browser connects before the database is connected, the
// user will see this message.
var found = ['DB Connection not yet established.  Try again later.  Check the console output for error messages if this persists.'];

// Listen on default port or 3000
app.listen(process.env.PORT || 3000);
