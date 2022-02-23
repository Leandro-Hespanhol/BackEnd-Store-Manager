// models/connection.js
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: 3306,
  database: process.env.MYSQL_DB_NAME,
  // log: console.log(
  //   'host',
  //   process.env.MYSQL_HOST,
  //   'user',
  //   process.env.MYSQL_USER,
  //   'data',
  //   process.env.MYSQL_DB_NAME,
  //   'pass',
  //   process.env.MYSQL_PASSWORD,
  // ),
});

module.exports = connection;
