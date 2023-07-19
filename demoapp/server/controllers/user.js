/*
-createUser
-verifyUser
-updateUser
-deleteUser
 */

// import models
// import controllers
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const userController = {};

userController.createUser = (req, res, next) => {
  console.log('-----INSIDE CREATE USER MIDDLEWARE-----');
  const saltRounds = 12;
  const { username, password, role } = req.body;
  // let user;
  bcrypt
    .hash(password, saltRounds)
    .then((data) => {
      User.create({ username, password: data, role })
      .then((newUser) => {
        console.log(newUser);
        res.locals.user = newUser;
        return next();
      });
    })
    .catch((err) => {
      return next('userController.createUser not working');
    });
};

userController.verifyUser = (req, res, next) => {
  console.log('-----INSIDE VERIFY USER MIDDLEWARE--------');
  const { username, password } = req.body;

  //use rebody to see what the user input as username and pw
  //find method on User model
  User.find({ username })
    .then((data) => {
      console.log('USERNAME FOUND');
      if (!data[0]) return res.status(400);
      else {
        // console.log(password, data[0].password);
        bcrypt.compare(password, data[0].password).then((data) => {
          if (!data) {
            return res.status(400);
          }
          return next();
        });
      }
    })
    .catch((error) => {
      next('Verify user does not work!');
    });
};

userController.updateUser = (req, res, next) => {
  return next();
};

userController.deleteUser = (req, res, next) => {
  return next();
};

module.exports = userController;
