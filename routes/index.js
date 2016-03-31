var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Wetalki - Practice Languages' });

});

router.post('/', function(req, res, next) {
     if(req.body.lang === "" || req.body.lang == null)
     {
        res.render('index', { title: 'wetalki', error: 'You need to choose the language you want to practice!' });
        return;    
     }
     
     res.render('chat', { title: 'wetalki', lang: req.body.lang });
 
});

module.exports = router;
