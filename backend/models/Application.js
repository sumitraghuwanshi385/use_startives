const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema(
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
    answers: [String], // custom answers
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);