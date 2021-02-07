const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/users/sessions", [authJwt.verifyToken], controller.findOne);
  app.put("/api/users/", [authJwt.verifyToken], controller.update);
  app.delete("/api/users/", [authJwt.verifyToken], controller.delete);
};
