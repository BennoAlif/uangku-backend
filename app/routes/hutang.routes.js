const { authJwt } = require("../middleware");
const controller = require("../controllers/hutang.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/hutang", [authJwt.verifyToken], controller.findAll);
  app.get("/api/hutang/single/:id", [authJwt.verifyToken], controller.findByPk);
  app.get("/api/hutang/total", [authJwt.verifyToken], controller.getTotal);
  app.post("/api/hutang", [authJwt.verifyToken], controller.create);
  app.put("/api/hutang/:id", [authJwt.verifyToken], controller.update);
  app.delete("/api/hutang/:id", [authJwt.verifyToken], controller.delete);
};
