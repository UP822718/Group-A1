"use strict"
let mysql2 = require('mysql2')
let fs = require('fs');
let initDBsql = require('./initDBsql.json');

async function sqlSetup() {
  const connection = await mysql2.createConnection({ host: "localhost",user: "root",password: "root"});

    for (varsql of initDBsql.sql) {
     await connection.execute(variable);
    }
}
sqlSetup();
