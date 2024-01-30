// const mysql = require('mysql');

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'qp_db',
// });

// // Connect to MySQL
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL: ' + err.stack);
//     process.exit(1);
//   }
//   console.log('Connected to MySQL as id ' + db.threadId);
// });

// module.exports = db;

const mysql = require('mysql');
const { promisify } = require('util');

// Create a MySQL connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'qp_db',
});

// Promisify query, beginTransaction, commit, and rollback functions
db.query = promisify(db.query).bind(db);
db.beginTransactionAsync = promisify(db.beginTransaction).bind(db);
db.commitAsync = promisify(db.commit).bind(db);
db.rollbackAsync = promisify(db.rollback).bind(db);

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    process.exit(1);
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

module.exports = db;
