var express = require("express");
var bodyParser = require("body-parser");

var hostname = "quarto-arena.herokuapp.com";
var port = 5000;

var app = express();

app.use(express.static(__dirname + "/public"));

app.listen(port, hostname, function() {
    console.log("Server running at http://" + hostname + ":" + port);
});
