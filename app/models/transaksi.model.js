module.exports = (sequelize, Sequelize) => {
  const Transaksi = sequelize.define("transaction", {
    nominal: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    type: {
      type: Sequelize.ENUM(["pengeluaran", "pemasukan"]),
      allowNull: false
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    notes: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  return Transaksi;
};
