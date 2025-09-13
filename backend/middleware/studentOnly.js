module.exports = function (req, res, next) {
  if (!req.user || req.user.role !== "student") {
    return res.status(403).json({ message: "Only students can apply for leave" });
  }
  next();
};