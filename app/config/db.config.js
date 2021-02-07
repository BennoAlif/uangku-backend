module.exports = {
  HOST: "us-cdbr-east-03.cleardb.com",
  USER: "b3a3064a589465",
  PASSWORD: "7ef18a0e",
  DB: "heroku_d9c7a7c7de5e85c",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
