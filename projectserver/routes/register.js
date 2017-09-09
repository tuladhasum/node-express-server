var express = require('express');
var router = express.Router();
const db = require('../db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Start Registration' });
});

router.post('/', function(req, res, next){
  console.log(req.body);
  const email = req.body.email;
  db.query('insert into users values ( ?)',[email], function(error, results, fields){
        if(error) throw error;
        res.redirect('register/all');
        // res.render('register', {title: 'registration POST'});
      });
  // db.end();
});

router.get('/all', function (req, res, next) {

  db.query('select * from users', function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results[0].solution);
    // console.log('connected as '+ connection.threadId);
    console.log(results);
  });
  res.render('register', {title: '/register/all'});
});

module.exports = router;
