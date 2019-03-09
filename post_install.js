let mysql = require('mysql2')
let fs = require('fs')
const sqlSetup = fs.readFileSync('./initDB.sql').toString();
const connection = mysql.createConnection({host: "localhost",user: "root"});
connection.execute(sqlSetup);
