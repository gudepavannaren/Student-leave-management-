// models/LeaveApplication.js
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const leaveSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    // Leave mode: either rector alone, or faculty + rector approval required
    mode: { type: String, enum: ['rector', 'faculty+rector'], required: true },

    reason: { type: String, trim: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },

    // Overall status for UI convenience:
    // 'pending' (nobody approved yet), 'semi-approved' (faculty approved, rector pending),
    // 'approved' (both approved / rector approved in rector-mode), 'rejected'
    status: {
      type: String,
      enum: ['pending', 'semi-approved', 'approved', 'rejected'],
      default: 'pending'
    },

    // Faculty approvals
    facultyStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    facultyId: { type: Schema.Types.ObjectId, ref: 'User' },
    facultyDecisionAt: { type: Date },

    // Rector approvals
    rectorStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    rectorId: { type: Schema.Types.ObjectId, ref: 'User' },
    rectorDecisionAt: { type: Date },

    // Optional: generated pdf / pass path
    pdfPath: { type: String },

    // Optional: other metadata
    remarks: { type: String }
  },
  { timestamps: true }
);

module.exports = model('LeaveApplication', leaveSchema);
