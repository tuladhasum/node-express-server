var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');//https://stackoverflow.com/questions/22348705/best-way-to-store-db-config-in-node-js-express-app
Genre = require('./models/genre');
Book = require('./models/book');

// connect to mongoose
mongoose.connect(config.mongoConnectionString,{
  useMongoClient: true
},function(error){
  // console.log('Error message', error);
});

var db = mongoose.connection;
console.log(mongoose.connection.readyState);

// console.log(db);
app.get('/', function(req, res){
  res.send('Please use /api/books or /api/genres');
});

app.get('/api/books', function(req, res){
  Book.getBooks(function(err, books){
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

app.get('/api/genres', function(req, res){
  Genre.getGenres(function(err, genres){
    if (err) {
      throw err;
    }
    res.json(genres);
  });
});


app.listen(3000);

console.log('Starting server at 3000');
