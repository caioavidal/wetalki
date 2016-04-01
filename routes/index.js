var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Wetalki - Practice Languages'});

});
router.index = function(req, res) {
    res.render('index', { title: 'Wetalki - Practice Languages'});

};

router.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

router.post('/', function(req, res, next) {
     if(req.body.lang === "" || req.body.lang == null)
     {
        res.render('index', { title: 'wetalki', error: 'You need to choose the language you want to practice!' });
        return;    
     }
     
     res.render('chat', { title: 'wetalki', lang: req.body.lang });
 
});

module.exports = router;
