const mongoose = require('mongoose');

const { Schema, model, Types } = mongoose;

const leaveSchema = new Schema(
  {
    studentId: { type: Types.ObjectId, ref: 'User' },
    mode: { type: String, enum: ['rector', 'faculty+rector'] },
    reason: { type: String },
    fromDate: { type: Date },
    toDate: { type: Date },
    status: {
      type: String,
      enum: ['pending', 'semi-approved', 'approved', 'rejected'],
      default: 'pending'
    },
    facultyId: { type: Types.ObjectId, ref: 'User' },
    rectorId: { type: Types.ObjectId, ref: 'User' },
    pdfPath: { type: String }
  },
  { timestamps: true }
);

const LeaveApplication = model('LeaveApplication', leaveSchema);

module.exports = LeaveApplication;