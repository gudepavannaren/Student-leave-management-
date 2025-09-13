const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // Accept "Bearer token" or just "token"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!token) {
    return res.status(401).json({ message: "Access denied. Invalid token format." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: user._id, role: user.role }
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};