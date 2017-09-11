var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render('home', { title: 'Home' });
});

router.get('/login', function(req, res, next){
  res.render('login', {title: 'Login Page'});
});

router.post('/login', passport.authenticate('local',{
  successRedirect: '/profile',
  failureRedirect: '/login'
}));

router.get('/profile',authenticationMiddleware(), function(req, res, next){
  res.render('profile', {title: 'Profile page'});
});


function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(`
      req.session.passport.user: ${JSON.stringify(req.session.passport)}
    `);
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };
}

module.exports = router;
