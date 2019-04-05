"use strict";
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();

const connection = mysql.createConnection( { host: "localhost",user: "root",password: "root" ,database: "fitnessprofile"} );

/**
 *  This function attempts to establish a connection with the database
 *  If an error occurs, that error is thrown
 *  If a connection is successfully established, a success message is sent to the console
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
 *  This GET route will render the login screen for the client when routed to "/"
 * @param  {String} '/' = the URL path of the index page
 * @param  {Request} req = An object that holds the request over HTTP
 * @param  {Response} res = An object sent as a response to the client
 */
app.get('/', function(req,res) {
    response.render('index');
});

/**
 *  This GET route will render the profile page for the user, with their stats pulled from the database if present 
 * @param  {String} '/profile' = The location of the index page
 * @param  {Request} req object holds our session data, which is used to authenticate the user when routed to /profile
 * @param  {Response} res renders our profile page with hydration, weight, calories and steps if present
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
 *  This function will log the user in if they have entered a user name and password that match an account stored on the database
 * If the user exists and the profile hash matches the hash stored on the account, a cookie is created to verify the user once they are redirected to /profile
 * @param  {Request} req object holds the encrypted user name and password text entered into the form (POST method)
 * @param  {Response} res either redirects the user to /profile, with the new session created or refreshes the login page if accounts don't match
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
/**
 *  This function will allow the user to add stats to their user profile
 * @param  {Request} req object holds the hydration, weight, calories, and steps value entered by the user
 * @param  {Response} res redirects the user to the /profile route, which refreshes the profile page with the most recent stats entered 
 */
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
 *  This function creates a new user account using the input user name and password if an account with that user name doesn't already exist
 * @param  {Request} req object contains the user name and password submitted on the sign up page (POST method)
 * @param  {Response} res redirects the user to the login page if a new account has been created, or redirects the user back to the sign up page if a user name already exists 
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
/**
 *  This function logs out a user by destroying their session
 * @param  {Request} req object holds the session created for the current user on login
 * @param  {Response} res redirects the user back to the login page after their session has been destroyed
 */
async function logoutUser(req,res) {
    req.session.destroy();
    res.redirect('/');
}
/**
 *  This function gets the last 7 statistics entered by the user for each stat (hydration, weight, calories and steps)
 * @param  {Request} req object holds the userID of the user, accessed through their session (req.session)
 * @param  {Response} res sends a json array of json arrays for each stat, with each holding the most recent 7 values entered into the database
 */
async function getTop7(req,res) {
  let topHydration = [];
  let topWeight = [];
  let topCalories = [];
  let topSteps = [];

  let sqlTopHydration = 'SELECT hydrationValue FROM fitnessprofile.hydration where userID = ?';
  connection.query(sqlTopHydration, req.session.userID, function(e, results) {
    if (e) {
      throw e;
    }
    else {
      for (let i = 0; i < results.length && i < 7; i++) {
        topHydration.push(results[(results.length-i)-1]);
      }
      let sqlTopWeight = 'SELECT weightValue FROM fitnessprofile.weight where userID = ?';
      connection.query(sqlTopWeight, req.session.userID, function(e, results) {
        if (e) {
          throw e;
        }
        else {
          for (let i = 0; i < results.length && i < 7; i++) {
            topWeight.push(results[(results.length-i)-1]);
          }
          let sqlTopCalories = 'SELECT caloriesValue FROM fitnessprofile.calories where userID = ?';
          connection.query(sqlTopCalories, req.session.userID, function(e, results) {
            if (e) {
              throw e;
            }
            else {
              for (let i = 0; i < results.length && i < 7; i++) {
                topCalories.push(results[(results.length-i)-1]);
              }
              let sqlTopWeight = 'SELECT stepsValue FROM fitnessprofile.steps where userID = ?';
              connection.query(sqlTopWeight, req.session.userID, function(e, results) {
                if (e) {
                  throw e;
                }
                else {
                  for (let i = 0; i < results.length && i < 7; i++) {
                    topSteps.push(results[(results.length-i)-1]);
                  }
		              console.log({topHydration, topWeight, topCalories, topSteps});
                  res.json({topHydration, topWeight, topCalories, topSteps});
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
