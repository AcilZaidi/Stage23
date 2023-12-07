const Coordinateur = require("../models/coordinateur");
const BlacklistedToken = require("../models/blacklistedToken");
const jwt = require("jsonwebtoken");

function authorisation(req, res, next) {
 
      next();
   
}

module.exports = authorisation;
