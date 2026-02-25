const express = require('express');
const { createApplication, getReceivedApplications } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createApplication);
router.get('/received', protect, getReceivedApplications);

module.exports = router;