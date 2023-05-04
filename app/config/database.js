const mysql = require('mysql');
require("dotenv").config();

module.exports = (app) => {
    
    const connection = mysql.createConnection({
        host     : process.env.DATABASE_HOST,
        user     : process.env.DATABASE_USER,
        password : process.env.DATABASE_PWD,
        database : process.env.DATABASE_NAME,
    });

    connection.connect();
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
      if (error) throw error;
      console.log(`[${new Date().toLocaleTimeString()} INFO]: [SERVER] Database is online`);
    });   
    connection.end();
}