var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../db.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', {
    title: 'Start Registration',
    errors: null
  });
});

router.post('/', function(req, res, next){

  req.checkBody('email', 'Email cannot be empty').notEmpty();
  req.checkBody('email','Enter a valid email address').isEmail();
  req.checkBody('firstname', 'First Name cannot be empty').notEmpty();
  req.checkBody('lastname', 'Last Name cannot be empty').notEmpty();
  req.checkBody('password', 'Password must be between 3 and 15 character long').len(3,15);
  // req.checkBody('repeatPassword','Verify password must match the previous password').equals('password');
  /*
  checkBody()
    .len(min,max)
    .isEmail()
    .matches(/regex/,"i")
    .equals(fieldname)
  */
  const errors = req.validationErrors();
  if (errors) {
    console.log(`errors: ${JSON.stringify(errors)}`);
    res.render('register',{
      title: 'Registration Error',
      // errors: JSON.stringify(errors)
      errors: errors
    });
  }else{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, function(err, hash){
      db.query('insert into users (firstname, lastname, email, password) values (?,?,?,?)',[firstname, lastname, email, hash], function(error, results, fields){
            if(error) throw error;
            // res.redirect('register/json');
            res.render('register', {
              title: 'registration POST',
              errors:null
            });
      });
    });
    // db.end();
  }


});

router.get('/json', function (req, res, next) {
  var jsonResult = [];
  jsonResult.push(3);
  db.query('select * from users', function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results[0].solution);
    // console.log('connected as '+ connection.threadId);
    jsonResult.push(results);
    res.json(jsonResult);
  });

  // res.json(jsonResult);
  // res.render('register', {title: '/register/all'});
});

module.exports = router;
