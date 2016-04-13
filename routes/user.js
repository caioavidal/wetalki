
var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.create = function(req, res) {

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, function(err, team) {
        if (err) { res.status(500).send({ error: 'Unable to create the user' }); }
        res.json(team);
    });


};

