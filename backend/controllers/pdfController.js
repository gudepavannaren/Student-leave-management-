const path = require("path");

exports.downloadPDF = (req, res) => {
  const file = path.join(__dirname, '../uploads/', req.params.filename);
  res.download(file);
};