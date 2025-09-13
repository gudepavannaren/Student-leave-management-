module.exports = function (req, res, next) {
  if (req.user.role !== "faculty") {
    return res.status(403).json({ message: "Only faculty can perform this action" });
  }
  next();
};