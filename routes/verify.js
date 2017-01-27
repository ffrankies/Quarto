var User = require("../models/users");
var jwt = require("jsonwebtoken");

exports.getToken = function(user) {
    return jwt.sign(user, process.env.SECRETKEY, {
        expiresIn: 86400
    });
};

exports.verifyUser = function(req, res, next) {
    // Check for token
    var token = req.signedCookies.quartotoken;

    // Decode token
    if (token) {
        jwt.verify(token, process.env.SECRETKEY, function(err, decoded) {
            if (err) {
                // var err = new Error("You are not authenticated!");
                // err.status = 401;
                // return next(err);
                return res.json(
                    {
                        success: false,
                        message: err.message,
                        error: err
                    }
                );
            } else {
                req.decoded = decoded;
                return res.json(
                    {
                        success: true,
                        message: "You are logged in!"
                    }
                );
            }
        });
    } else {
        var err = new Error("You are not logged in!");
        err.status = 403;
        return res.json(
            {
                success: false,
                message: err.message,
                error: err
            }
        );
    }
};
