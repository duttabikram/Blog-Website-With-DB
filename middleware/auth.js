const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, "my_super_secret_key_123");
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
}

module.exports = authMiddleware;
