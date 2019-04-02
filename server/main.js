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
        const noStat = "No Stats";

        console.log("Showing profile for users", req.session.username);
        /* get all values from DB*/
        console.log(req.session.userID);
        /* GET HYDRATION */
        let sqlHydration = 'SELECT hydrationValue FROM hydration WHERE userID = ?';
        connection.query(sqlHydration, req.session.userID, function(e, results) {
           if (e) {
             throw e;
           }
           else {
             console.log(results.length);
	           console.log(results);
             let mostRecent = results.length - 1;
             try {
              statsArray.push(results[mostRecent].hydrationValue);
             }
             catch(e){
                console.log("No Hydration");
                statsArray.push(noStat);
             }
             let sqlWeight = 'SELECT weightValue FROM weight WHERE userID = ?';
             connection.query(sqlWeight, req.session.userID, function(e, results) {
                if (e) {
                   throw e;
                }
                else {
                  let mostRecent = results.length - 1;
                  try {
                   statsArray.push(results[mostRecent].weightValue);
                  }
                  catch(e){
                    console.log("No Weight");
                    statsArray.push(noStat);
                  }
                  let sqlCalories = 'SELECT caloriesValue FROM calories WHERE userID = ?';
                  connection.query(sqlCalories, req.session.userID, function(e, results) {
                     if (e) {
                       throw e;
                     }
                     else {
		                   let mostRecent = results.length - 1;
                       try {
                        statsArray.push(results[mostRecent].caloriesValue);
                       }
                       catch(e){
                         console.log("No Calories");
                         statsArray.push(noStat);
                       }
                       let sqlSteps = 'SELECT stepsValue FROM steps WHERE userID = ?';
                       connection.query(sqlSteps, req.session.userID, function(e, results) {
                          if (e) {
                            throw e;
                          }
                          else {
		                        let mostRecent = results.length - 1;
                            try {
                             statsArray.push(results[mostRecent].stepsValue);
                            }
                            catch(e){
                              console.log("No Steps");
                              statsArray.push(noStat);
                            }

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

app.get('/getTop7', getTop7);
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

async function getTop7(req,res) {
  let topHydration = [];
  let topWeight = [];
  let topCalories = [];
  let topSteps = [];

  let sqlTopHydration = 'SELECT hydrationValue FROM fitnessprofile.hydration where username = ?';
  connection.query(sqlTopHydration, req.session.userID, function(e, results) {
    if (e) {
      throw e;
    }
    else {
      for (let i = 0; i < results.length || i < 7; i++) {
        topHydration.push(results[i]);
      }
      let sqlTopWeight = 'SELECT weightValue FROM fitnessprofile.weight where username = ?';
      connection.query(sqlTopWeight, req.session.userID, function(e, results) {
        if (e) {
          throw e;
        }
        else {
          for (let i = 0; i < results.length || i < 7; i++) {
            topWeight.push(results[i]);
          }
          let sqlTopCalories = 'SELECT caloriesValue FROM fitnessprofile.calories where username = ?';
          connection.query(sqlTopCalories, req.session.userID, function(e, results) {
            if (e) {
              throw e;
            }
            else {
              for (let i = 0; i < results.length || i < 7; i++) {
                topCalories.push(results[i]);
              }
              let sqlTopWeight = 'SELECT stepsValue FROM fitnessprofile.steps where username = ?';
              connection.query(sqlTopWeight, req.session.userID, function(e, results) {
                if (e) {
                  throw e;
                }
                else {
                  for (let i = 0; i < results.length || i < 7; i++) {
                    topSteps.push(results[i]);
                  }
                  res.json(topHydration, topWeight, topCalories, topSteps);
                }
              });
            }
          });
        }
      });
    }
  });
}
app.listen(8080, console.log("Listening.."));
