var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users');
var dboper = require('./dboperations');
var Verify = require("./verify");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * Allow new users to register. Once a user is registered, create an entry
 * in the Players collection for the user.
 */
router.post('/signup', function(req, res, next) {
    User.register(new User(
        {
            username: req.body.username,
            password: req.body.password
        }
    ), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.status(500).json(
                {
                    success: false,
                    message: err.message,
                    error: err
                }
            );
        }
        passport.authenticate('local', dboper.addPlayer(req, res))(
            req, res, next);
    }); // end of register
});

/**
 * Logs a user in, sending a passport token if successful.
 */
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log(err);
            return res.status(500).json(
                {
                    success: false,
                    message: "Login failure - authentication error",
                    error: err
                }
            );
        }
        if (!user) {
            console.log(info);
            return res.status(401).json(
                {
                    success: false,
                    message: "Login failure - could not find user",
                    error: info
                }
            );
        }
        req.logIn(user, function(err) {
            if (err) {
                console.log(err);
                return res.status(500).json(
                    {
                        success: false,
                        message: "Login failure - could not login",
                        error: err
                    }
                );
            }

            var token = Verify.getToken(user);

            res.cookie("quartotoken", token, { signed: true, httpOnly: true });
            res.status(200).json(
                {
                    success: true,
                    message: "Successfully logged in"// ,
                    // token: token
                }
            );
        });
    })(req, res, next);
});

/**
 * Logs a user out.
 */
router.get('/logout', function(req, res) {
    req.logout();
    res.clearCookie('quartotoken');
    return res.status(200).json(
        {
            success: true,
            message: "Successully logged out"
        }
    );
});

/**
 * Checks if a user is logged in.
 */
router.get('/verify', Verify.verifyUser, function(req, res, next) {
    // Do nothing
});

module.exports = router;
