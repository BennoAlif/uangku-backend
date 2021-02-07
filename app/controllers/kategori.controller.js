const db = require("../models");
const Kategori = db.kategori;
const response = require("../config/response");

exports.findAll = (req, res) => {
  const id = req.userId;
  Kategori.findAll({ where: { userId: id } })
    .then((data) => response.ok("Categories Found", data, res))
    .catch((err) => response.message(404, err.message, res));
};

exports.findByPk = (req, res) => {
  const id = req.params.id;
  Kategori.findByPk(id)
    .then((data) => response.ok("Category Found", data, res))
    .catch((err) => response.message(404, err.message, res));
};

exports.create = (req, res) => {
  const id = req.userId;
  Kategori.create({
    name: req.body.name,
    type: req.body.type,
    icon: req.body.icon,
    userId: id
  })
    .then((data) => {
      response.ok("Category created!", data, res);
    })
    .catch((err) => {
      response.message(
        500,
        err.message || "Could not create the category!",
        res
      );
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Kategori.update(req.body, {
    where: { id }
  })
    .then((num) => {
      if (num == 1) {
        response.message(200, "Category was updated successfully.", res);
      } else {
        response.message(
          400,
          "Cannot update Category. Maybe category was not found!.",
          res
        );
      }
    })
    .catch((err) => {
      response.message(500, err.message || "Error updating Category.", res);
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Kategori.destroy({
    where: { id }
  })
    .then((num) => {
      if (num == 1) {
        response.message(200, "Category was deleted successfully!", res);
      } else {
        response.message(
          400,
          "Cannot delete Category. Maybe Category was not found!",
          res
        );
      }
    })
    .catch((err) => {
      response.message(500, err.message || "Could not delete Category.", res);
    });
};
