const fs = require("fs");
const PDFDocument = require("pdfkit");

const generatePDF = (leave, user) => {
  const dir = './uploads';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const filePath = `${dir}/pass_${leave._id}.pdf`;
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("Leave Pass", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Student Name: ${user.name}`);
  doc.text(`Email: ${user.email}`);
  doc.text(`From: ${leave.fromDate}`);
  doc.text(`To: ${leave.toDate}`);
  doc.text(`Reason: ${leave.reason}`);
  doc.text(`Approval: Rector Approved`);

  doc.end();
  return filePath;
};

module.exports = generatePDF;