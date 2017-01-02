var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Player = new Schema(
    {
    username: { type: String, required: true, minlength: 3, maxlength: 16,
                index: { unique: true, dropDups: true } },
    played: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    rank: { type: Number, min: 1, max: 5, default: 1 },
    pos: { type: Number, min: 0, default: 0 },
    points: { type: Number, min: 0, default: 0 }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Player', Player);
