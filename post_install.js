"use strict"
let mysql2 = require('mysql2')
let fs = require('fs');
let initDBsql = require('./initDBsql.json');

async function sqlSetup() {
  const connection = await mysql2.createConnection({ host: "localhost",user: "root",password: ""});

    for (let varsql of initDBsql.sql) {
     await connection.execute(varsql );
    }
}
sqlSetup();
process.exit(0)
