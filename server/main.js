"use strict";

const express = require('express');
const mysql = require('mysql2');
/*
const googleAuth = require('simple-google-openid');
const bcrypt = require('bcrypt');
*/

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "login"
});

connection.connect(function(e) {
    if (e) {
        throw e;
    }
    else {
       console.log("Connection to database established..");
    }
});

app.use(express.urlencoded());
app.use(express.static('./static'));

app.post('/login', authLogin);
app.post('/signup', authUser);

async function authLogin(req,res) {
  
}
async function authUser(req,res) {

}
app.listen(8080, console.log("Listening.."));
