var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');//https://stackoverflow.com/questions/22348705/best-way-to-store-db-config-in-node-js-express-app

// connect to mongoose
mongoose.connect(config.mongoConnectionString,{
  useMongoClient: true
},function(error){
  console.log(error);
});
var db = mongoose.connection;

console.log(db);
app.get('/', function(req, res){
  res.send('Please use /api/books or /api/genres');
});

app.get('/api/books', function(req, res){
  res.send('reached /api/books');
});

app.get('/api/genres', function(req, res){
  res.send('reached /api/genres');
});


app.listen(3000);

console.log('Starting server at 3000');
