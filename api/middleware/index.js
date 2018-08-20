const jwt = require("jsonwebtoken");
const config = require("../../config");

const isAuthenticated = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.status(403).send();
  }

  try {
    const decoded = jwt.verify(token, config.superSecret);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(403).send();
  }
};

module.exports = { isAuthenticated };
