var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('site/index', { title: 'Wetalki - Practice Languages'});

});
router.index = function(req, res) {
    res.render('site/index', { title: 'Wetalki - Practice Languages'});

};

router.partials = function (req, res) {
  var name = req.params.name;
  res.render('site/partials/' + name);
};

router.post('/', function(req, res, next) {
     if(req.body.lang === "" || req.body.lang == null)
     {
        res.render('site/index', { title: 'wetalki', error: 'You need to choose the language you want to practice!' });
        return;    
     }
     
     res.render('site/chat', { title: 'wetalki', lang: req.body.lang });
 
});

module.exports = router;
