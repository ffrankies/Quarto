var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require("./models/users");
// var Player = require("./models/players");
var userRouter = require("./routes/userRouter");

mongoose.connect(process.env.DBURL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected correctly to MongoLab DB server.");
});

var app = express();

/** Sepecify middleware */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(__dirname + "/public"));

app.use("/users", userRouter);

var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("Server running on port: " + port);
});
