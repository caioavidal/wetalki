var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var index = require('./routes/index');
var chat = require('./routes/chat');
var api = require('./routes/api');


var app = express();



//var http = require('http').Server(app);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname , 'bower_components')));



app.use('/', index);
//app.use('/chat', chat);
app.get('/api/laguanges', api.languages);
app.get('/partials/:name', routes.partials);

//app.get('*', routes.index);




module.exports = app;
