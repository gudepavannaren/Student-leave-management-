const LeaveApplication = require('../models/LeaveApplication');

// Get all leaves for rector
const getAllLeavesForRector = async (req, res) => {
  try {
    const leaves = await LeaveApplication.find({   mode: { $in: ['rector', 'faculty+rector'] }
 })
      .populate('studentId', 'name email'); // Include student info
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get pending leaves for rector
const getPendingLeavesForRector = async (req, res) => {
  try {
    const leaves = await LeaveApplication.find({ status: 'pending',   mode: { $in: ['rector', 'faculty+rector'] }
 })
      .populate('studentId', 'name email');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update status
const updateLeaveStatusByRector = async (req, res) => {
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
  getAllLeavesForRector, 
  getPendingLeavesForRector, 
  updateLeaveStatusByRector 
};