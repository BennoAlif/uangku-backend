const { authJwt } = require("../middleware");
const controller = require("../controllers/transaksi.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/transaksi", [authJwt.verifyToken], controller.findAll);
  app.get(
    "/api/transaksi/kategori",
    [authJwt.verifyToken],
    controller.getByCategories
  );
  app.get(
    "/api/transaksi/single/:id",
    [authJwt.verifyToken],
    controller.findByPk
  );
  app.get("/api/transaksi/total", [authJwt.verifyToken], controller.getTotal);
  app.get(
    "/api/transaksi/weekly",
    [authJwt.verifyToken],
    controller.getSevenDays
  );
  app.get(
    "/api/transaksi/monthly",
    [authJwt.verifyToken],
    controller.getMonthly
  );
  app.post("/api/transaksi", [authJwt.verifyToken], controller.create);
  app.put("/api/transaksi/:id", [authJwt.verifyToken], controller.update);
  app.delete("/api/transaksi/:id", [authJwt.verifyToken], controller.delete);
};
