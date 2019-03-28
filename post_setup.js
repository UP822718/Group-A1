let mysql2 = require('mysql2')
let fs = require('fs');
async function  sql_init() {
  const sqlSetup = fs.readFileSync('initDB2.sql').toString();
  const connection = await mysql2.createConnection({
    host: "localhost",
    user: "root",
	password:"root"});
console.log(sqlSetup);
  connection.execute(sqlSetup);
}
sql_init();
