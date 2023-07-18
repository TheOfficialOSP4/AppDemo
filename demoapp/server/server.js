const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 5173;

// parse contents
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
app.post('/signup', (req, res) => {
  return res.status(200).json('signup successful');
});

// POST to /login: for logging in
app.post('/login', (req, res) => {
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
