const db = require("../models");
const User = db.user;
const response = require("../config/response");
const bcrypt = require("bcryptjs");

exports.findOne = (req, res) => {
  let id = req.userId;
  db.user
    .findByPk(id)
    .then((data) => response.ok("User Found", data, res))
    .catch((err) => response.message(404, err.message, res));
};

exports.update = (req, res) => {
  const id = req.userId;
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
  }

  User.update(req.body, {
    where: { id }
  })
    .then((num) => {
      if (num == 1) {
        response.message(200, "User was updated successfully.", res);
      } else {
        response.message(
          400,
          "Cannot update User. Maybe user was not found!.",
          res
        );
      }
    })
    .catch((err) => {
      response.message(500, err.message || "Error updating User.", res);
    });
};

exports.delete = (req, res) => {
  const id = req.userId;

  User.destroy({
    where: { id }
  })
    .then((num) => {
      if (num == 1) {
        response.message(200, "User was deleted successfully!", res);
      } else {
        response.message(
          400,
          "Cannot delete User. Maybe user was not found!",
          res
        );
      }
    })
    .catch((err) => {
      response.message(500, err.message || "Could not delete User.", res);
    });
};
