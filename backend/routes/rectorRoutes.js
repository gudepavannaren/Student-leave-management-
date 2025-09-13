const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const rectorOnly = require('../middleware/rectorOnly');
const { 
  getAllLeavesForRector,
  getPendingLeavesForRector, 
  updateLeaveStatusByRector 
} = require('../controllers/rectorleaveController');

// Get ALL leaves
router.get('/all', authMiddleware, rectorOnly, getAllLeavesForRector);

// Get only pending leaves
router.get('/pending', authMiddleware, rectorOnly, getPendingLeavesForRector);

// Update status
router.put('/status/:leaveId', authMiddleware, rectorOnly, updateLeaveStatusByRector);

module.exports = router;