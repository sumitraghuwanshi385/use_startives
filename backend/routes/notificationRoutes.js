const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
} = require('../controllers/notificationController');

const { protect } = require('../middleware/authMiddleware');

// Get all notifications
router.get('/', protect, getNotifications);

// Mark one as read
router.patch('/:id/read', protect, markAsRead);

// Mark all as read
router.patch('/read-all', protect, markAllAsRead);

module.exports = router;