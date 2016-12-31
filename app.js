var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var hostname = process.env.APPURL;

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("Server running on port: " + port);
});
