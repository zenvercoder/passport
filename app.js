require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// added 3 lines
var session = require('express-session');
var passport = require('./server/passport');
// 9-10-16
var bcrypt = require('bcrypt');

var routes = require('./routes/index');
var users = require('./server/users');

// 9-22-16
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Configure express session
 app.use(session({
   secret: process.env.sessionSecret,
   saveUninitialized: true,
   resave: false
 }));

// Mount Passport middleware onto Express
app.use(passport.initialize());
// Mount Passport session middleware onto Express
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));
// exposing node_modules as lib (serving static files in Express)
app.use('/lib', express.static(path.join(__dirname, 'node_modules')));

app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
