const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    type: {
      type: String,
      enum: ['APPLICATION', 'MESSAGE', 'CONNECTION'],
      required: true,
    },

    title: {
      type: String,
    },

    message: {
      type: String,
    },

    // ✅ ADD THESE 4 FIELDS
    ideaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Idea',
    },

    ideaTitle: {
      type: String,
    },

    positionId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    positionTitle: {
      type: String,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    groupKey: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);