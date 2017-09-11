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
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

require('dotenv').config();

var index = require('./routes/index');
var users = require('./routes/users');
var sqlite = require('./routes/sqlite');
var register = require('./routes/register');
var autodoc = require('./routes/autodoc');
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
app.use('/autodoc', autodoc);

passport.use(new LocalStrategy(

  function (username, password, done) {
    console.log('username:', username);
    console.log('password:', password);
    const db = require('./db');
    db.query('select user_id, password from users where email = ?',[username],function (err, results, fields) {
      if (err) {
        done(err);
      }

      if (results.length === 0) {
        done(null, false);
      }
      console.log(results);
      const hash = results[0].password.toString();
      const user_id = results[0].user_id.toString();
      console.log(hash);
      bcrypt.compare(password, hash, function (err, response) {
        if (response === true) {
          return done(null, {user_id: user_id});
        }else{
          return done(null, false);
        }
      });

    });
  }

));

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
