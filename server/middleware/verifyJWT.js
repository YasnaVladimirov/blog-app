const jwt = require("jsonwebtoken");
require("dotenv").config();
const models = require("../models");

const verifyJWT = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(403).json({ error: "Non authenticate!" });

  const token = cookies.jwt;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, userInfo) => {
    if (err) return res.status(403).json({ error: "Non authorized!" + err });
    req.userId = userInfo.id;
    next();
  })
}

module.exports = {
  verifyJWT
}