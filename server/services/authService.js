const expressJwt = require('express-jwt');
const config = require("../config");

function jwt() {
  const secret = config.jwtSecret;
  return expressJwt({ secret }).unless({
    path: [
      // public routes that don't require authentication
      /\/home*/,
      /\/user*/,
      /\/ping*/,
      /\/authentication*/,
      /\/locations*/,
      /\/requests*/,
    ],
  });
}

module.exports = jwt;
