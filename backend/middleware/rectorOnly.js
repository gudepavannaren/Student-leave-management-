module.exports = function (req, res, next) {
  if (req.user.role !== "rector") {
    return res.status(403).json({ message: "Only rector can perform this action" });
  }
  next();
};