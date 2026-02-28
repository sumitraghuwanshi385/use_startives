const Notification = require('../models/Notification');

/* =========================================
   GET USER NOTIFICATIONS
   GET /api/notifications
========================================= */
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiver: req.user._id,
    })
      .populate('sender', 'name profilePictureUrl')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications,
    });

  } catch (error) {
    console.error("Get Notifications Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =========================================
   MARK SINGLE NOTIFICATION AS READ
   PUT /api/notifications/:id/read
========================================= */
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        receiver: req.user._id, // 🔐 security check
      },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      notification,
    });

  } catch (error) {
    console.error("Mark As Read Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =========================================
   MARK ALL AS READ
   PUT /api/notifications/read-all
========================================= */
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        receiver: req.user._id,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });

  } catch (error) {
    console.error("Mark All As Read Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =========================================
   GET UNREAD COUNT (Optional but Recommended)
   GET /api/notifications/unread-count
========================================= */
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      receiver: req.user._id,
      isRead: false,
    });

    res.status(200).json({
      success: true,
      count,
    });

  } catch (error) {
    console.error("Unread Count Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};