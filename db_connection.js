'use strict';

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "projetTwoDo"
});

/*connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
*/
/*connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    let post = {email : 'test2@gmail.com', password : 'test2'};
    let sql = connection.query('INSERT INTO user SET ?', post, function (error, results, fields) {
        if (error) throw error;
        console.log("1 record inserted");
    });
});*/


/*
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });
*/

module.exports = connection;