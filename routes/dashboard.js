var express = require('express');
var router = express.Router();

var expressJwt = require('express-jwt');  
var authenticate = expressJwt({secret : 'Be the change that you wish to see in the world.'});

router.get('/', function(req, res, next) {
    res.render('dashboard/index', { title: 'Wetalki - Practice Languages'});

});




module.exports = router;