"use strict"
let mysql2 = require('mysql2')
let fs = require('fs');
let initDBsql = require('./initDBsql.json');

/**
 * sqlSetup - description
 *
 * @return {type}  description
 */
async function sqlSetup() {
  const connection = await mysql2.createConnection({ host: "localhost",user: "root",password: "root"});

    for (let varsql of initDBsql.sql) {
     await connection.execute(varsql );
    }
//process.exit(0);
}
sqlSetup();
