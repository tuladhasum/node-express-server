var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
//http://www.sqlitetutorial.net/sqlite-nodejs/connect/
var db = new sqlite3.Database('./db/song.db', function(err){
  if (err) {
    console.error(err.message);
  }else{
    console.log('Connected to the song database');
  }
});

/* GET home page. */
router.get('/create-table', function(req, res, next) {
  db.run('CREATE TABLE user (info TEXT)');
  db.run('CREATE TABLE product (info TEXT)');
  db.run('CREATE TABLE claims (info TEXT)');
  res.send('CREATE TABLE RAN');
});

router.get('/insert-values', function (req, res, next) {
  db.serialize(function () {
    var stmt = db.prepare('INSERT INTO user VALUES (?) ');

    for (var i = 0; i < 10; i++) {
      stmt.run('User Number: '+i);
    }
    stmt.finalize();
  });
  db.close();
  res.send('inserted values');
});

router.get('/json', function (req, res, next) {
  var temp = [1,2,3];
  var sql = 'select rowid as id, info from user';
  db.all(sql, [], function (err, rows) {
    rows.forEach(function (row) {
      temp.push(1);
    });
  });
  db.close();
  temp.push(1);
  res.json(temp);
});



module.exports = router;
