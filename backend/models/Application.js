const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
  {
    question: String,
    answer: String,
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

    // 🔥 NO ENUM — SIMPLE STRING
    status: {
      type: String,
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);