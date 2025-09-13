const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['student', 'faculty', 'rector'] },
  rollNo: String,
  hostel: String,
  department: String
});

module.exports = mongoose.model('User', userSchema);  // ✅ CommonJS compatible