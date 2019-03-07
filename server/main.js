"use strict";

const express = require('express');
const mysql = require('mysql2');
const googleAuth = require('simple-google-openid');
const bcrypt = require('bcrypt');


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
    const username = req.body.username;
    let sql = 'SELECT * FROM user WHERE username = ?';

    connection.query(sql, username, function(e, results) {
       if (e) {
         throw e;
       }
       else {
          if (results.length > 0) {
             console.log("Username Already Exists");
             res.redirect("/signup.html");
          }
          else {
             bcrypt.hash(req.body.password, 10, function(e, hash) {
                 let sql = 'INSERT INTO user SET ?';
                 let fields = {username:username, password:hash};
                 let query = connection.query(sql, fields, function(e, results) {
                     if (e) {
                       throw e;
                     }
                       else {
                         console.log("User Added to Database");
                         res.redirect("/");
                       }
                   });
               });
          }
       }
    });
}


app.listen(8080, console.log("Listening.."));
