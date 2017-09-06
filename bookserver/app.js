var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to mongoose
mongoose.connect('mongodb://localhost/bookstore',{
  useMongoClient: true
},function(error){
  console.log(error);
});
var db = mongoose.connection;

app.get('/', function(req, res){
  res.send('hello world from top of the world');
});


app.listen(3000);

console.log('Starting server at 3000');
