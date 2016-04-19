
var passport = require('passport');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');
User = mongoose.model('User');

exports.create = function (req, res, next) {
    var user = new User({
        name: req.body.name,
        email: req.body.email
    });
    user.isDataValid(function (err, message) {

        if (err) { return res.status(500).json(message); }

        User.register(user, req.body.password, function (err, account) {
            if (err) {
                return res.status(500).json(err.message);
            }

            login(req, res, next);
        });
    });
};

function login(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.status(500).json("Sorry, an unexpected error has occurred :(");
        }
        if (!user) {
            return res.status(401).json(info.message);
        }

        var user = {
            email: user._doc.email,
            name: user._doc.name
        }

        var token = jwt.sign(user, process.env.SECRET, { expiresIn: 3600 * 12 }); //12 hours

        res.json({
            token: token,
            user: user
        });
    })(req, res, next);;
}

exports.login = function (req, res, next) {
    login(req, res, next);
}
