
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

        if (err) {return  res.status(500).send(message);}

        User.register(user, req.body.password, function (err, account) {
            if (err) {
                return res.status(500).send(err.message);
            }

            passport.authenticate('local')(req, res, function () {
                return res.sendStatus(200);
                
            });
        });
    });





};

exports.login = function (req, res) {
    passport.authenticate('local', function(err, user, info) {
          if(error) {
            return res.status(500).json(error);
        }
        if(!user) {
            return res.status(401).json(info.message);
        }
        res.json(user);
    })(req, res, next);;
}
