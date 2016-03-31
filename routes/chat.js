var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 
   
   res.render('chat', { title: 'Wetalki', lang: req.params.lang });
});


module.exports = router;
