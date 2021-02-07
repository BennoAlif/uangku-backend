"use strict";

exports.ok = function (message, val, res) {
  res.status(200).send({
    status: 200,
    message,
    data: val
  });
};

exports.message = function (code, message, res) {
  res.status(code).send({
    status: code,
    message
  });
};
