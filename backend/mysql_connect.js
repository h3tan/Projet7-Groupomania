const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql");

const MY_HOST = process.env.MYSQL_HOST;
const MY_ID = process.env.MYSQL_ID;
const MY_PASSWORD = process.env.MYSQL_PASSWORD;
const MY_DATABASE = process.env.MYSQL_DATABASE_NAME;

const connexion = mysql.createConnection({
  host: MY_HOST,
  user: MY_ID,
  password: MY_PASSWORD,
  database: MY_DATABASE,
  multipleStatements: true,
});

module.exports = connexion;
