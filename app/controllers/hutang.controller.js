const db = require("../models");
const Hutang = db.hutang;
const response = require("../config/response");
const { sequelize } = require("../models");

exports.findAll = (req, res) => {
  const id = req.userId;
  Hutang.findAll({
    where: { userId: id },
    order: [["date", "DESC"]]
  })
    .then((data) => response.ok("Transactions Found", data, res))
    .catch((err) => response.message(404, err.message, res));
};

exports.findByPk = (req, res) => {
  const id = req.params.id;
  Hutang.findByPk(id)
    .then((data) => response.ok("Transaction Found", data, res))
    .catch((err) => response.message(404, err.message, res));
};

exports.getTotal = (req, res) => {
  const id = req.userId;
  Hutang.findAll({
    where: { userId: id },
    attributes: [
      "type",
      [sequelize.fn("sum", sequelize.col("nominal")), "total"]
    ],
    group: ["type"],
    raw: true
  })
    .then((data) => response.ok("Transactions Found", data, res))
    .catch((err) => response.message(404, err.message, res));
};

exports.create = (req, res) => {
  const id = req.userId;
  Hutang.create({
    nominal: req.body.nominal,
    type: req.body.type,
    date: req.body.date,
    notes: req.body.notes,
    fromTo: req.body.fromTo,
    userId: id
  })
    .then((data) => {
      response.ok("Transactions created!", data, res);
    })
    .catch((err) => {
      response.message(500, err.message || "Could not create the Hutang!", res);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Hutang.update(req.body, {
    where: { id }
  })
    .then((num) => {
      if (num == 1) {
        response.message(200, "Transactions was updated successfully.", res);
      } else {
        response.message(
          400,
          "Cannot update Transactions. Maybe Transactions was not found!.",
          res
        );
      }
    })
    .catch((err) => {
      response.message(500, err.message || "Error updating Hutang.", res);
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Hutang.destroy({
    where: { id }
  })
    .then((num) => {
      if (num == 1) {
        response.message(200, "Transaction was deleted successfully!", res);
      } else {
        response.message(
          400,
          "Cannot delete Transaction. Maybe Transaction was not found!",
          res
        );
      }
    })
    .catch((err) => {
      response.message(
        500,
        err.message || "Could not delete Transaction.",
        res
      );
    });
};
