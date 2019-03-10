let mysql2 = require('mysql2')
let fs = require('fs');
async function  sql_init() {
  const sqlSetup = fs.readFileSync('initDB.sql').toString();
  const connection = await mysql2.createConnection({
    host: "localhost",
    user: "root"});
  connection.execute(sqlSetup);
}
sql_init();
