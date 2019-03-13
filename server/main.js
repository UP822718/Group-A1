"use strict";
const express = require('express');
const mysql = require('mysql2');
const googleAuth = require('simple-google-openid');
const bcrypt = require('bcrypt');
let mysql2 = require('./database.js')

const app = express();

const connection = mysql.createConnection({
  host: "localhost",user: "root",password: "root",
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

app.get('/', function(req,res) {
    response.redirect('./login.html');
});
app.get('/profile', function(req,res) {
    res.send('You are logged in!');
});

app.post('/login', authLogin);
app.post('/signup', authUser);

async function authLogin(req,res) {
    const username = req.body.username;
    let sql = 'SELECT * FROM user WHERE username = ?';

    connection.query(sql, username, function(e, results) {
       if (e) {
         throw e;
       }
       else {
         if (results.length > 0) {
           bcrypt.compare(req.body.password, results[0].password, function(e,result) {
             if (result) {
                console.log("Password Matches");
                res.redirect("/profile");

             }
             else {
                console.log("Password Doesn't Match");
                res.redirect("/");
             }
           });
         }
         else {
           console.log("Username Doesnt match any Accounts");
           res.redirect("/");
         }
       }
     });
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
