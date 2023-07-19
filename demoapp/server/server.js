// import mongoose from 'mongoose';
// import express from 'express';
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/user.js');
const app = express();
const PORT = 3000;
const cors = require('cors');
const path = require('path');

/*
import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
import userController from './controllers/user.js';
const app = express();
const PORT = 3000;
import cors from 'cors'
*/

const dbUrl =
  'mongodb+srv://sifulsiddiki:G907McsZsIvVUoKv@soloprojectdatabase.edcdbx4.mongodb.net/';

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'OSP',
  })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err));


// parse contents
// app.use(cors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// require in routers
// require in controllers

// user.createUser
// session.createSession
// cookie.createCookie

// user.verifyUser --> put the role in res.locals.role
// session.verifySession

// LOGOUT
// session.deleteSession

// POST to /signup: for submitting user info

app.get('/', (req,res)=>{
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
})

app.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

// POST to /login: for logging in
app.post('/login', userController.verifyUser, (req, res) => {
  return res.status(200).json('login successful');
});

// catch-all:
app.use((req, res) => res.status(404).send('incorrect URL'));

// error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  // overwrite the default error with the error generated from middleware
  const errorObj = Object.assign({}, defaultErr, err);

  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
