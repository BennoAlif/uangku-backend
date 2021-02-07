const db = require("../models");
const Transaction = db.transaksi;
const response = require("../config/response");
const { sequelize } = require("../models");
const Op = db.Sequelize.Op;
const moment = require("moment");

exports.findAll = (req, res) => {
  const query = req.query.month;
  let condition = query ? { date: { [Op.startsWith]: query } } : null;
  const id = req.userId;
  Transaction.findAll({
    order: [["date", "DESC"]],
    where: sequelize.and({ userId: id }, condition),
    include: [{ model: db.kategori }]
  })
    .then((data) => response.ok("Transactions Found", data, res))
    .catch((err) => response.message(404, err.message, res));
};

exports.findByPk = (req, res) => {
  const id = req.params.id;
  Transaction.findByPk(id)
    .then((data) => response.ok("Transaction Found", data, res))
    .catch((err) => response.message(404, err.message, res));
};

exports.getTotal = (req, res) => {
  const id = req.userId;
  Transaction.findAll({
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

exports.getSevenDays = (req, res) => {
  const id = req.userId;

  Transaction.findAll({
    attributes: [
      [sequelize.fn("sum", sequelize.col("nominal")), "nominal"],
      "type",
      "date"
    ],
    group: ["date", "type"],
    where: sequelize.and(
      {
        date: {
          [Op.between]: [
            moment().subtract(7, "days").toDate(),
            moment().add(1, "days").toDate()
          ]
        }
      },
      { userId: id }
    )
  })
    .then((data) => response.ok("Transactions Found", data, res))
    .catch((err) => response.message(404, err.message, res));
};

exports.getMonthly = (req, res) => {
  const id = req.userId;
  const query = req.query.month;

  Transaction.findAll({
    attributes: [
      [sequelize.fn("sum", sequelize.col("nominal")), "nominal"],
      "type",
      "date"
    ],
    group: ["date", "type"],
    where: sequelize.and({ userId: id }, { date: { [Op.startsWith]: query } })
  })
    .then((data) => response.ok("Transactions Found", data, res))
    .catch((err) => response.message(404, err.message, res));
};

exports.getByCategories = (req, res) => {
  const id = req.userId;

  Transaction.findAll({
    attributes: [
      [sequelize.fn("sum", sequelize.col("nominal")), "nominal"],
      "type"
    ],
    group: ["categoryId"],
    where: { userId: id },
    include: [{ model: db.kategori }]
  })
    .then((data) => response.ok("Transactions Found", data, res))
    .catch((err) => response.message(404, err.message, res));
};

exports.create = (req, res) => {
  const id = req.userId;
  Transaction.create({
    nominal: req.body.nominal,
    type: req.body.type,
    date: req.body.date,
    notes: req.body.notes,
    categoryId: req.body.categoryId,
    userId: id
  })
    .then((data) => {
      response.ok("Transaction created!", data, res);
    })
    .catch((err) => {
      response.message(
        500,
        err.message || "Could not create the Transaction!",
        res
      );
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Transaction.update(req.body, {
    where: { id }
  })
    .then((num) => {
      if (num == 1) {
        response.message(200, "Transaction was updated successfully.", res);
      } else {
        response.message(
          400,
          "Cannot update Transaction. Maybe Transaction was not found!.",
          res
        );
      }
    })
    .catch((err) => {
      response.message(500, err.message || "Error updating Transaction.", res);
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Transaction.destroy({
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
