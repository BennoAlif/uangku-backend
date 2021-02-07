const { authJwt } = require("../middleware");
const controller = require("../controllers/kategori.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/kategori", [authJwt.verifyToken], controller.findAll);
  app.get("/api/kategori/:id", controller.findByPk);
  app.post("/api/kategori", [authJwt.verifyToken], controller.create);
  app.put("/api/kategori/:id", [authJwt.verifyToken], controller.update);
  app.delete("/api/kategori/:id", [authJwt.verifyToken], controller.delete);
};
