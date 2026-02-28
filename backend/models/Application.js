const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
  },
  { _id: false }
);

const applicationSchema = new mongoose.Schema(
  {
    ideaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Idea',
      required: true,
    },

    positionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    coverLetter: {
      type: String,
      required: true,
    },

    answers: [answerSchema],

    // 🔥 IMPORTANT — UPPERCASE ENUM
    status: {
      type: String,
      enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'REVIEWED'],
      default: 'PENDING',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);