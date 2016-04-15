
var passport = require('passport');
var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');
User = mongoose.model('User');

exports.create = function (req, res) {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user.isDataValid(function (err, message) {

        if (err) { res.status(500).send(message); return false; }

        User.register(user, req.body.password, function (err, account) {
            if (err) {
                res.status(500).send(err.message);
                return false;
            }

            passport.authenticate('local')(req, res, function () {
                res.sendStatus(200);
                return false;
            });
        });
    });





};

exports.login = function (req, res) {
    passport.authenticate('local', function(err, user, info) {
        res.sendStatus(200);
        return false;
    });
}