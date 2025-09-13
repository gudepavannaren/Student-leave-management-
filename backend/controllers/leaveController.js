const LeaveApplication = require('../models/LeaveApplication');
const User = require('../models/User');

const applyLeave = async (req, res) => {
  try {
    const leaveData = req.body;
    const newLeave = new LeaveApplication(leaveData);
    const savedLeave = await newLeave.save();

    return res.status(201).json(savedLeave);
  } catch (error) {
    console.error('Error applying for leave:', error);
    return res.status(500).json({ message: 'Failed to apply for leave', error });
  }
};

const getLeavesByUser = async (req, res) => {
  try {
    const leaves = await LeaveApplication.find({ studentId: req.user.id });
    return res.status(200).json(leaves);
  } catch (error) {
    console.error("Error retrieving leaves:", error);
    return res.status(500).json({ message: "Failed to retrieve leaves", error });
  }
};


const updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { status } = req.body;

    const updatedLeave = await LeaveApplication.findByIdAndUpdate(
      leaveId,
      { status },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    return res.status(200).json(updatedLeave);
  } catch (error) {
    console.error('Error updating leave status:', error);
    return res.status(500).json({ message: 'Failed to update leave status', error });
  }
};

module.exports = {
  applyLeave,
  getLeavesByUser,
  updateLeaveStatus
};