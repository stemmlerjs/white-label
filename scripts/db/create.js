const mysql = require('mysql2');  

require('dotenv').config();

const { 
  WHITE_LABEL_DB_NAME, 
  WHITE_LABEL_DB_USER, 
  WHITE_LABEL_DB_PASS, 
  WHITE_LABEL_DB_HOST 
} = process.env;

const connection = mysql.createConnection({  
  host: WHITE_LABEL_DB_HOST,  
  user: WHITE_LABEL_DB_USER,  
  password: WHITE_LABEL_DB_PASS  
});  

connection.connect((err) => {
  if (err) throw err;
  connection.query(`CREATE DATABASE ${WHITE_LABEL_DB_NAME}`, (err, result) => {
    
    if (err && err.code === "ER_DB_CREATE_EXISTS") {
      console.log('Db already created');
      process.exit(0);
    } 
    
    if (err) {
      throw err;
    }
    
    console.log('Created db');
    process.exit(0);
  })
})