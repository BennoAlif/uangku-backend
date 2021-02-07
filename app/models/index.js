const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model")(sequelize, Sequelize);
db.kategori = require("../models/kategori.model")(sequelize, Sequelize);
db.transaksi = require("../models/transaksi.model")(sequelize, Sequelize);
db.hutang = require("../models/hutang.model")(sequelize, Sequelize);

db.user.hasMany(db.kategori, { onDelete: "CASCADE" });
db.kategori.belongsTo(db.user);

db.user.hasMany(db.transaksi, { onDelete: "CASCADE" });
db.transaksi.belongsTo(db.user);

db.user.hasMany(db.hutang, { onDelete: "CASCADE" });
db.hutang.belongsTo(db.user);

db.kategori.hasOne(db.transaksi, { onDelete: "CASCADE" });
db.transaksi.belongsTo(db.kategori);

module.exports = db;
