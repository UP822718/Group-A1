"use strict";
let express = require('express')
let mysql2 = require('./database.js')
let app = express()

app.use(express.static('static'))



app.listen(8080);
