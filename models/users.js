var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema(
    {
    username: { type: String, required: true, minlength: 3, maxlength: 16,
                index: { unique: true, dropDups: true } },
    password: { type: String, required: true, minlength: 6, maxlength: 16 },
    admin: { type: Boolean, default: false }
    },
    { timestamps: true }
);

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
