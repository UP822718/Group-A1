"use strict";
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
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
app.get('/', function(req,res) {
    response.render('index');
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
        res.redirect('/'); // not authorized status
    }
    else {
        /* if authenticated */
        let statsArray = [];

        console.log("Showing profile for users", req.session.username);
        /* get all values from DB*/
        console.log(req.session.userID);
        /* GET HYDRATION */
        let sqlHydration = 'SELECT hydrationValue FROM hydration WHERE userID = ?';
        connection.query(sqlHydration, req.session.userID, function(e, results) {
           if (e) {
             res.render('Statistics_Page', {hydration: 'Not Set', weight: 'Not Set', calories: 'Not Set', steps: 'Not Set'});
           }
           else {
             console.log(results.length);
	           console.log(results);
             let mostRecent = results.length - 1;
             statsArray.push(results[mostRecent].hydrationValue);
             let sqlWeight = 'SELECT weightValue FROM weight WHERE userID = ?';
             connection.query(sqlWeight, req.session.userID, function(e, results) {
                if (e) {
                   throw e;
                }
                else {
                  statsArray.push(results[0].weightValue);
                  let sqlCalories = 'SELECT caloriesValue FROM calories WHERE userID = ?';
                  connection.query(sqlCalories, req.session.userID, function(e, results) {
                     if (e) {
                       throw e;
                     }
                     else {
		                   let mostRecent = results.length - 1;
                       statsArray.push(results[mostRecent].caloriesValue);
                       let sqlSteps = 'SELECT stepsValue FROM steps WHERE userID = ?';
                       connection.query(sqlSteps, req.session.userID, function(e, results) {
                          if (e) {
                            throw e;
                          }
                          else {
		                        let mostRecent = results.length - 1;
                            statsArray.push(results[mostRecent].stepsValue);

                            let hydration = statsArray[0];
                            let weight = statsArray[1];
                            let calories = statsArray[2];
                            let steps = statsArray[3];

                            res.render('Statistics_Page', {hydration: hydration, weight: weight, calories: calories, steps: steps});
                          }
                        });
                     }
                   });
                }
              });
           }
         });
    }
});

app.post('/login', authLogin);
app.post('/signup', authUser);
app.post('/addStats', addStat);
app.post('/logout', logoutUser);


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
  /* Declare variables from form request */
  const hydration = req.body.hydration;
  const weight = req.body.weight;
  const calories = req.body.calories;
  const steps = req.body.steps;

  /* SQL statements to database for inserting each stat */

  let sqlAddHydration = 'INSERT INTO hydration (userID,hydrationValue) VALUES(?,?)';
  let hydrationFields = [req.session.userID, hydration];
  connection.query(sqlAddHydration, hydrationFields, function(e, results) {
     if (e) {
       throw e;
     }
     else {
       console.log("Added new hydration");
     }
  });
  let sqlAddWeight = 'INSERT INTO weight (userID,weightValue) VALUES(?,?)';
  let weightFields = [req.session.userID, weight];
  connection.query(sqlAddWeight, weightFields, function(e, results) {
     if (e) {
       throw e;
     }
     else {
	console.log("Added new weight");
     }
  });
  let sqlAddCalories = 'INSERT INTO calories (userID,caloriesValue) VALUES(?,?)';
  let caloriesFields = [req.session.userID, calories];
  connection.query(sqlAddCalories, caloriesFields, function(e, results) {
    if (e) {
      throw e;
    }
    else {
      console.log("Added new calories");
    }
  });
   let sqlAddSteps = 'INSERT INTO steps (userID,stepsValue) VALUES(?,?)';
   let stepsFields = [req.session.userID, steps];
   connection.query(sqlAddSteps, stepsFields, function(e, results) {
     if (e) {
       throw e;
     }
     else {
       console.log("Added new steps");
       res.redirect('/profile');
     }
   });
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
             res.redirect("signup");
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

async function logoutUser(req,res) {
    req.session.destroy();
    res.redirect('/');
}
app.listen(8080, console.log("Listening.."));
