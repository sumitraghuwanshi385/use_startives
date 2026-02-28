const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    type: {
      type: String,
      enum: ['APPLICATION', 'MESSAGE', 'CONNECTION'],
      required: true,
      index: true,
    },

    title: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
    },

    // 🔹 IDEA INFO
    ideaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Idea',
    },

    ideaTitle: {
      type: String,
      trim: true,
    },

    // 🔹 POSITION INFO
    positionId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    positionTitle: {
      type: String,
      trim: true,
    },

    // 🔹 APPLICATION STATUS
    status: {
      type: String,
      enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
    },

    // 🔹 READ STATUS
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },

    // 🔹 GROUPING (for preventing duplicates if needed)
    groupKey: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// 🔥 Compound index for fast user notification fetch
notificationSchema.index({ receiver: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);