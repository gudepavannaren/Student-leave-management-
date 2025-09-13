const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const facultyOnly = require('../middleware/facultyOnly');
const { 
  getAllLeavesForFaculty,
  getPendingLeavesForFaculty, 
  updateLeaveStatusByFaculty
} = require('../controllers/facultyleaveController');

// Get ALL leaves
router.get('/all', authMiddleware, facultyOnly, getAllLeavesForFaculty);

// Get only pending leaves
router.get('/pending', authMiddleware, facultyOnly, getPendingLeavesForFaculty);

// Update status
router.put('/status/:leaveId', authMiddleware, facultyOnly, updateLeaveStatusByFaculty);

module.exports = router;