// utils/statusUtils.js
function recomputeOverallStatus(leave) {
  // If either rejected -> rejected
  if (leave.facultyStatus === 'rejected' || leave.rectorStatus === 'rejected') {
    return 'rejected';
  }

  // Rector-only mode: rector decides
  if (leave.mode === 'rector') {
    if (leave.rectorStatus === 'approved') return 'approved';
    if (leave.rectorStatus === 'rejected') return 'rejected';
    return 'pending';
  }

  // mode: 'faculty+rector'
  if (leave.facultyStatus === 'approved' && leave.rectorStatus === 'approved') {
    return 'approved';
  }

  if (leave.facultyStatus === 'approved' && (!leave.rectorStatus || leave.rectorStatus === 'pending')) {
    return 'semi-approved';
  }

  if (leave.rectorStatus === 'approved' && (!leave.facultyStatus || leave.facultyStatus === 'pending')) {
    // rector approved but faculty pending: keep pending (policy choice)
    return 'pending';
  }

  return 'pending';
}

module.exports = { recomputeOverallStatus };
