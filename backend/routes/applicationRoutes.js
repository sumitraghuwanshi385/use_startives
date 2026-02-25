const express = require('express');
const {
  createApplication,
  getReceivedApplications,
  getSentApplications,
  updateApplicationStatus,
} = require('../controllers/applicationController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply
router.post('/', protect, createApplication);

// Founder received
router.get('/received', protect, getReceivedApplications);

// Applicant sent
router.get('/sent', protect, getSentApplications);

// Update status
router.put('/:id/status', protect, updateApplicationStatus);

module.exports = router;