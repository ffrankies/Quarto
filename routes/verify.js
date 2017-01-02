var User = require("../models/users");
var jwt = require("jsonwebtoken");

exports.getToken = function(user) {
    return jwt.sign(user, process.env.SECRETKEY, {
        expiresIn: 86400
    });
};

exports.verifyUser = function(req, res, next) {
    // Check for token
    var token = req.body.token || req.query.token ||
                req.headers['x-access-token'];

    // Decode token
    if (token) {
        jwt.verify(token, process.env.SECRETKEY, function(err, decoded) {
            if (err) {
                var err = new Error("You are not authenticated!");
                err.status = 401;
                return next(err);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        var err = new Error("No token provided!");
        err.status = 403;
        return next(err);
    }
};
