var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

// Authentication Packages
var session = require('express-session');
var passport = require('passport');
var MySQLStore = require('express-mysql-session');

require('dotenv').config();

var index = require('./routes/index');
var users = require('./routes/users');
var sqlite = require('./routes/sqlite');
var register = require('./routes/register');
var db = require('./db');

var ejs = require('ejs').renderFile;

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.engine('html',require('ejs').renderFile);

app.engine('html', ejs);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
  // database: 'test'
};

var sessionStore = new MySQLStore(options);

app.use(session({
  secret: 'kljdflkaj8943094jkldjfskfl',
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());

//Local variables to the application
app.set('companyname', 'BCBSND');
app.locals.parentcompany = 'Noridian';
// console.log(app.locals);

app.use('/', index);
app.use('/users', users);
app.use('/sqlite', sqlite);
app.use('/register', register);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;