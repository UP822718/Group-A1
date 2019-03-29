"use strict";
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
let connection = "";
const app = express();
async function mainSetup() {
  connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "fitnessprofile"
  });
}
mainSetup()


app.use(express.static('static'));
app.use(bodyParser.urlencoded({
  extend: true
}));

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
// app.get('/', function(req, res) {
//   // response.render('index');
// });

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
    console.log("Showing profile for users", req.session.username);
    /* get all values from DB*/
    console.log(req.session.userID);
    /*GET CURRENT STATS*/
    /* GET HYDRATION */
    let sqlHydration = 'SELECT hydrationValue FROM hydration WHERE userID = ?';
    let sqlWeight = 'SELECT weightValue FROM weight WHERE userID = ?';
    let sqlCalories = 'SELECT caloriesValue FROM calories WHERE userID = ?';
    let sqlSteps = 'SELECT stepsValue FROM steps WHERE userID = ?';
    const [rows_hydration, fields_hydration] = await connection.execute(sqlHydration, req.session.userID);
    const [rows_weight, fields_weight] = await connection.execute(sqlWeight, req.session.userID);
    const [rows_calories, fields_calories] = await connection.execute(sqlCalories, req.session.userID);
    const [rows_steps, fields_steps] = await connection.execute(sqlSteps, req.session.userID);
    let hydration = 0;
    let weight = 0;
    let calories = 0;
    let steps = 0;
    try {
      hydration = rows_hydration[0].hydrationValue
    } catch (err) {

    }
    try {
      weight = rows_weight[0].weightValue
    } catch (err) {

    }
    try {
      calories = rows_calories[0].caloriesValue;
    } catch (err) {

    }
    try {
      steps = rows_steps[0].stepsValue;
    } catch (err) {

    }
    res.render('Statistics_Page.html', {
      hydration: hydration,
      weight: weight,
      calories: calories,
      steps: steps
    });
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
    try {

      const [rows_userCheck, fields_userCheck, ] = await connection.query(sql, username);
    } catch (err) {

    }
    if (rows_userCheck.length > 0) {
      bcrypt.compare(req.body.password, rows_userCheck[0].password, function(e, result) {
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
  try {
      const sqloutUsers = await connection.execute(sql, username)
  } catch (err) {

  }
  if (sqloutUsers[0].length > 0) {
     console.log("Username Already Exists");
     res.redirect("signup");
  } else {
    bcrypt.hash(req.body.password, 10, async function(e, hash) {
         let sql = 'INSERT INTO users (username,password) VALUES (?,?)';
         let fields = [username, hash];
         try {
           let query = await connection.execute(sql, fields);
         } catch (err) {

         }
        //   if (e) {
        //     throw e;
        //   } else {
        //     console.log("User Added to Database");
        //     res.redirect("/");
        //   }
    });
  }
}


app.listen(8080);
