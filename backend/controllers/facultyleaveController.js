const LeaveApplication = require('../models/LeaveApplication');

// Get all leaves for faculty
const getAllLeavesForFaculty = async (req, res) => {
  try {
    const leaves = await LeaveApplication.find({ mode: 'faculty+rector' })
      .populate('studentId', 'name email'); // Include student info
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get pending leaves for faculty
const getPendingLeavesForFaculty = async (req, res) => {
  try {
    const leaves = await LeaveApplication.find({ status: 'pending', mode: 'faculty+rector' })
      .populate('studentId', 'name email');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update status
const updateLeaveStatusByFaculty = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { status } = req.body;

    const leave = await LeaveApplication.findByIdAndUpdate(
      leaveId,
      { status },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    res.status(200).json({ message: 'Leave status updated', leave });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
  getAllLeavesForFaculty, 
  getPendingLeavesForFaculty, 
  updateLeaveStatusByFaculty
};