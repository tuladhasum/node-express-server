var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME 
  // database: 'test'
});

connection.connect();

// connection.query('select * from test', function (error, results, fields) {
//   if (error) throw error;
//   // console.log('The solution is: ', results[0].solution);
//   // console.log('connected as '+ connection.threadId);
//   console.log(results);
// });

// connection.end();

module.exports = connection;
