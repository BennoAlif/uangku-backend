module.exports = (sequelize, Sequelize) => {
  const HutangPiutang = sequelize.define("hutang_piutang", {
    nominal: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    type: {
      type: Sequelize.ENUM(["hutang", "piutang"]),
      allowNull: false
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    fromTo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    notes: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  return HutangPiutang;
};
