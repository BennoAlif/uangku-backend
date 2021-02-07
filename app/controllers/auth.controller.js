const db = require("../models");
const config = require("../config/auth.config");
const response = require("../config/response");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then((user) => {
      const data = {
        id: user.id,
        username: user.username,
        email: user.email
      };

      var token = jwt.sign(data, config.secret, {
        expiresIn: 86400
      });
      response.ok(
        "User was registered successfully!",
        { ...data, accessToken: token },
        res
      );
    })
    .catch((err) => {
      response.message(500, err.message, res);
    });
};

exports.signIn = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (!user) {
        return response.message(404, "User not found!", res);
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return response.message(401, "Invalid password!", res);
      }

      const data = {
        id: user.id,
        username: user.username,
        email: user.email
      };

      var token = jwt.sign(data, config.secret, {
        expiresIn: 86400
      });
      response.ok("Successfuly loggedin", { ...data, accessToken: token }, res);
    })
    .catch((err) => {
      response.message(500, err.message, res);
    });
};
