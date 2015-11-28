var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = module.exports = express();
// Load html
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
var uristring = process.env.MONGOLAB_URI ||
                process.env.MONGOHQ_URL ||
                "mongodb://hermanfassett:password@ds059694.mongolab.com:59694/heroku_g928tnf0";

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
    type: String,
    content: {
      title: String,
      idea: { type: String, trim: true }
    },
    author: {
      name: String,
      email: String
    },
    votes: Number,
    date: {type: Date, default: Date.now },
    comments: {type: Array, default: []}
  });
  var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    joinDate: Date
  });

  // Compile the schemas into models
  var boosts = mongoose.model("boosts", boostSchema);
  var users = mongoose.model("users", userSchema);
  var fir = new users({
    username: "Ryer",
    email: "ryer@gmail.com",
    password: "passxd",
    joinDate: new Date()
  });
  //fir.save(function(err) {if(err) console.log('Error on save!')});
  // Creating one user.
  var first = new boosts({
    type: "boost",
    content: { title: "Voting App", idea: "An awesome way to get into MEAN stack dev is to make a voting app!" },
    author: { name: "Herman Fassett", email: "hermanfassett@gmail.com" },
    votes: 45,
    date: new Date(),
    comments: [{author: "Ryer", comment: "Wow, thanks! Great idea"},
               {author: "Anonymous", comment: "Hmm, sounds okay, but sounds like it could be a big waste of time"}]
  });
  // Saving it to the database.
  //first.save(function (err) {if (err) console.log ('Error on save!')});
  var second = new boosts({
    type: "boost",
    content: { title: "Quote Machine", idea: "A great way to practice your css and api calls, make a random quote machine!" },
    author: { name: "Herman Fassett", email: "hermanfassett@gmail.com" },
    votes: 15,
    date: new Date(),
    comments: [{author: "Jon", comment: "Yeah, that's fun, I made one myself."},
               {author: "Peter", comment: "Great! I made one on freecodecamp"}]
  });
  // Saving it to the database.
  //second.save(function (err) {if (err) console.log ('Error on save!')});

  // Creating more users manually
  var third = new boosts({
    type: "brain",
    content: { title: "Stock Market app", idea: "This idea I had is a financial app called finactal using fractals to help predict stocks" },
    author: { name: "Jon", email: "jon@me.com" },
    votes: 5,
    date: new Date(),
    comments: [{author: "Herman Fassett", comment: "Sounds like a waste of time to me!"}]
  });
  //third.save(function (err) {if (err) console.log ('Error on save!')});
  app.get("/users/:users", function(req, res) {
    users.find({}, function(err, obj) {
      res.json(obj);
    });
  });
  app.post("/users/:users", function(req, res) {
    if (req.body.type === "login") {
      users.find({$and: [{email: req.body.email}, {password: req.body.password}]}, function(err, obj) {
        if (obj.length > 0) {
          res.json(obj);
        }
        else { res.send("fail");}
      })
    }
    else {
      users.find({$or: [{username: req.body.username}, {email: req.body.email}]}, function(err, obj) {
        if (obj.length > 0) {
          res.send("fail");
        }
        else {
          users.create(req.body, function(err, data) {
            if (err) console.log(err);
          });
          res.send("success");
        }
      });
    }
  });
  app.get("/boosts/:boosts", function(req, res) {
    boosts.find({type: "boost"}, function(err, obj) {
      res.json(obj);
    });
  });
  app.get("/brains/:brains", function(req, res) {
    boosts.find({type: "brain"}, function(err, obj) {
      res.json(obj);
    });
  });
}
// In case the browser connects before the database is connected, the
// user will see this message.
var found = ['DB Connection not yet established.  Try again later.  Check the console output for error messages if this persists.'];

// Listen on default port or 3000
app.listen(process.env.PORT || 3000);
