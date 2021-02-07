module.exports = (sequelize, Sequelize) => {
  const Kategori = sequelize.define("categories", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.ENUM(["pengeluaran", "pemasukan"]),
      allowNull: false
    },
    icon: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Kategori;
};
