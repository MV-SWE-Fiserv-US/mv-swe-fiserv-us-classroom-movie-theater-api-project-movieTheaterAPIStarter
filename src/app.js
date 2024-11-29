const  express  = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const  Show  = require('../models/Shows');
const  User  = require('../models/Users');
const { db } = require('../db/connection');
const users = require('../db/routes/users');
const shows = require('../db/routes/shows');


app.use('/users', users);
app.use('/shows', shows);


module.exports = app;