const db = require("../models");
const User = db.user;
const response = require("../config/response");

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then((user) => {
    if (user) {
      response.message(400, "Username is already in use!", res);
      return;
    }
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      if (user) {
        response.message(400, "Email is already in use!", res);
        return;
      }
      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;
