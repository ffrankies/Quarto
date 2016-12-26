var express = require("express");
var bodyParser = require("body-parser");

var hostname = "quarto-arena.herokuapp.com";

var app = express();

app.use(express.static(__dirname + "/public"));

var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("Server running on port: " + port);
});
