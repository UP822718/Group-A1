"use strict";
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const app = express();
let connection ={}

async function init() {
   connection= await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "fitnessprofile"
  });
}

let connection = {}
init();
async function init() {
  console.log("test");
connection = await mysql.createConnection( { host: "localhost",user: "root",password: "root" ,database: "fitnessprofile"} );
}

app.use(express.static('views'));
app.use(bodyParser.urlencoded({extend:true}));
app.use(session({
  secret: 'temp-secret',
  resave: false,
  saveUninitialized: false
}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
/**
 * app - description
 *
 * @param  {type} '/'          description
 * @param  {type} function(req description
 * @param  {type} res          description
 * @return {type}              description
 */
app.get('/', function(req, res) {
  res.render('index');
});
app.use('/css', express.static('views/css'))
app.use('/js', express.static('views/js'))

/**
 * app - description
 *
 * @param  {type} '/profile'   description
 * @param  {type} function(req description
 * @param  {type} res          description
 * @return {type}              description
 */
app.get('/profile', async function(req, res) {
  /* Authentication */
  if (!req.session || !req.session.authenticate) {
    res.sendStatus(401); // not authorized status
  } else {
    /* if authenticated */
    //let statsArray = [];

    console.log("Showing profile for users", req.session.username);
    /* get all values from DB*/
    console.log(req.session.userID);
    /* GET HYDRATION */
    let sqlHydration = 'SELECT hydrationValue FROM hydration WHERE userID = ?';
    const [rows_hydration, fields_hydration] = await connection.execute(sqlHydration, req.session.userID);
    console.log(rows_hydration);
    let sqlWeight = 'SELECT weightValue FROM weight WHERE userID = ?';
    console.log(rows_Weight);
    let sqlCalories = 'SELECT caloriesValue FROM calories WHERE userID = ?';
    const [rows_Calories, fields_Calories] = await connection.execute(sqlCalories, req.session.userID);
    console.log(rows_Calories);
    let sqlSteps = 'SELECT stepsValue FROM steps WHERE userID = ?';
    const [rows_Steps, fields_Steps] = await connection.execute(sqlSteps, req.session.userID);
    console.log(rows_Steps);
    res.render('Statistics_Page', {});
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
async function authLogin(req, res) {
  const username = req.body.username;
  let sql = 'SELECT * FROM users WHERE username = ?';

  connection.query(sql, username, function(e, results) {
    if (e) {
      throw e;
    } else {
      if (results.length > 0) {
        bcrypt.compare(req.body.password, results[0].password, function(e, result) {
          if (result) {
            console.log("Password Matches");
            req.session.authenticate = true;
            req.session.userID = results[0].userID;
            req.session.username = username;
            res.redirect("/profile");

          } else {
            console.log("Password Doesn't Match");
            res.redirect("/");
          }
        });
      } else {
        console.log("Username Doesnt match any Accounts");
        res.redirect("/");
      }
    }
  });
}

async function addStat(req, res) {}
/**
 * authUser - description
 *
 * @param  {type} req description
 * @param  {type} res description
 * @return {type}     description
 */
async function authUser(req, res) {
  const username = req.body.username;
  let sql = 'SELECT * FROM users WHERE username = ?';

  connection.query(sql, username, function(e, results) {
    if (e) {
      throw e;
    } else {
      if (results.length > 0) {
        console.log("Username Already Exists");
        res.redirect("signup");
      } else {
        bcrypt.hash(req.body.password, 10, function(e, hash) {
          let sql = 'INSERT INTO users (username,password) VALUES (?,?)';
          let fields = [username, hash];
          let query = connection.query(sql, fields, function(e, results) {
            if (e) {
              throw e;
            } else {
              console.log("User Added to Database");
              res.redirect("/");
            }
          });
        });
      }
    }
  });
}

<<<<<<< HEAD
app.listen(8080,  console.log("Listening.."));
=======
app.listen(8081, console.log("Listening.."));
>>>>>>> 2913d2dae5e0b459bc9062a02bb8b6c7ce32a781
