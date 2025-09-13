const express = require("express");
const { applyLeave, getLeavesByUser, updateLeaveStatus } = require("../controllers/leaveController");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/apply", authMiddleware, applyLeave);
router.get("/my-leaves", authMiddleware, getLeavesByUser);
router.patch("/status/:leaveId", authMiddleware, updateLeaveStatus);

module.exports = router;