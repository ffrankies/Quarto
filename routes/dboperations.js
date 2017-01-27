var mongoose = require("mongoose");
var User = require("../models/users");
var Player = require("../models/players");

var db = mongoose.connection;

/**
 * Adds an entry for a single player to the Player collection
 */
exports.addPlayer = function(req, res) {
    var name = req.body.username;
    Player.create( { username: name }, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).json(
                {
                    success: false,
                    message: err.message,
                    error: err
                }
            );
        } else {
            return res.status(200).json(
                {
                    success: true,
                    message: "Registered a new user"
                }
            ); // end return
        }
    });
};
