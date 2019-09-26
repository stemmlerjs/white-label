require('dotenv').config()

const { 
  WHITE_LABEL_DB_USER, 
  WHITE_LABEL_DB_PASS, 
  WHITE_LABEL_DB_HOST,
  WHITE_LABEL_DB_DEV_DB_NAME,
  WHITE_LABEL_DB_TEST_DB_NAME,
  WHITE_LABEL_DB_PROD_DB_NAME
} = process.env;

module.exports = {
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
}
