"use strict";
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();

const connection = mysql.createConnection( { host: "localhost",user: "root",password: "root" ,database: "fitnessprofile"} );

/**
 * connection - description
 *
 * @param  {type} function(e description
 * @return {type}            description
 */
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
app.use(session({
    secret: 'temp-secret',
    resave: false,
    saveUnitialized: false
}));

/**
 * app - description
 *
 * @param  {type} '/'          description
 * @param  {type} function(req description
 * @param  {type} res          description
 * @return {type}              description
 */
app.get('/', function(req,res) {
    response.redirect('./login.html');
});

/**
 * app - description
 *
 * @param  {type} '/profile'   description
 * @param  {type} function(req description
 * @param  {type} res          description
 * @return {type}              description
 */
app.get('/profile', function(req,res) {
    /* Authentication */
    if (!req.session || !req.session.authenticate) {
        res.sendStatus(401); // not authorized status
    }
    else {
        /* if authenticated */
        console.log("Showing profile for users", req.session.username);
        /* get all values from DB*/
        res.send(req.session.userID);
    }
});

app.post('/login', authLogin);
app.post('/signup', authUser);
app.post('/add', addStat);



/**
 * authLogin - description
 *
 * @param  {type} req description
 * @param  {type} res description
 * @return {type}     description
 */
async function authLogin(req,res) {
    const username = req.body.username;
    let sql = 'SELECT * FROM users WHERE username = ?';

    connection.query(sql, username, function(e, results) {
       if (e) {
         throw e;
       }
       else {
         if (results.length > 0) {
           bcrypt.compare(req.body.password, results[0].password, function(e,result) {
             if (result) {
                console.log("Password Matches");
                req.session.authenticate = true;
                req.session.userID = results[0].userID;
                req.session.username = username;
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

async function addStat(req,res) {
}
/**
 * authUser - description
 *
 * @param  {type} req description
 * @param  {type} res description
 * @return {type}     description
 */
async function authUser(req,res) {
    const username = req.body.username;
    let sql = 'SELECT * FROM users WHERE username = ?';

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
                 let sql = 'INSERT INTO users (username,password) VALUES (?,?)';
                 let fields = [username, hash];
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
