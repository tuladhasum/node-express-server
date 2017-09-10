var express = require('express');
var router = express.Router();
var passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render('home', { title: 'Home' });
});

module.exports = router;
