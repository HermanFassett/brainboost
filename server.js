var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs("boosts", ["boosts"]);

app.use(express.static(__dirname + "/public"));

app.get("/boosts", function(req, res) {
  db.boosts.find(function(err, docs) {
    res.json(docs);
  });
});

app.listen(process.env.PORT || 3000);
