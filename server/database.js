"use strict";
let mysql2 = require('mysql2')
let fs = require('fs');
let config =  require('./config.json');
/**
 * this function is to initialise the SQL database before the program is fully set up. additionally it may be called later on to make sure that the sql is
 * To be call before any SQL database calls are made
 */

const sqlSetup = fs.readFileSync('server/sqlSetup.sql').toString();
init();
let connection = null;

/**
 * init - description
 *
 * @return {type}  description
 */
async function init() {
    connection = await mysql2.createConnection(config.sql);
    connection.execute(sqlSetup);
}
