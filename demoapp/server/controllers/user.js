/*
-createUser
-verifyUser
-updateUser
-deleteUser
 */

// import models
// import controllers
const bcrypt = require('bcrypt');
const userController = {};

userController.createUser = (req, res, next) => {
  const saltRounds = 12;
  const { username, password } = req.body;
  bcrypt
    .hash(password, saltRounds)
    .then((data) => {
      User.create({ username, password: data });
    })
    .then(() => {
      return next();
    })
    .catch((err) => {
      return next('userController.createUser not working');
    });
};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  //use rebody to see what the user input as username and pw
  //find method on User model
  User.find({ username })
    .then((data) => {
      if (!data[0]) res.send('Please create an account');
      else {
        console.log(password, data[0].password);
        bcrypt.compare(password, data[0].password).then((data) => {
          if (!data) {
            return res.send('Invalid username or password');
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
