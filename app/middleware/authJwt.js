const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const response = require("../config/response");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    return response.message(403, "No token provided!", res);
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return response.message(401, "Unauthorized!", res);
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken
};
module.exports = authJwt;
