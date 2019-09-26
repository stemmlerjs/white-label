require('dotenv').config()
const Sequelize = require('sequelize');

const { 
  WHITE_LABEL_DB_USER, 
  WHITE_LABEL_DB_PASS, 
  WHITE_LABEL_DB_HOST,
  WHITE_LABEL_DB_DEV_DB_NAME,
  WHITE_LABEL_DB_TEST_DB_NAME,
  WHITE_LABEL_DB_PROD_DB_NAME,
  NODE_ENV
} = process.env;

const databaseCredentials = {
  "development": {
    "username": WHITE_LABEL_DB_USER,
    "password": WHITE_LABEL_DB_PASS,
    "database": WHITE_LABEL_DB_DEV_DB_NAME,
    "host": WHITE_LABEL_DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": WHITE_LABEL_DB_USER,
    "password": WHITE_LABEL_DB_PASS,
    "database": WHITE_LABEL_DB_TEST_DB_NAME,
    "host": WHITE_LABEL_DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": WHITE_LABEL_DB_USER,
    "password": WHITE_LABEL_DB_PASS,
    "database": WHITE_LABEL_DB_PROD_DB_NAME,
    "host": WHITE_LABEL_DB_HOST,
    "dialect": "mysql"
  }
};

const { username, password, database, host, dialect } = databaseCredentials[NODE_ENV];

module.exports = databaseCredentials;

module.exports.connection = new Sequelize(database, username, password, {
  host,
  dialect,
  port: 3306,
  dialectOptions: {
    multipleStatements: true,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false
});
