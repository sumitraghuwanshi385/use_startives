const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

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
    coverLetter: {
      type: String,
      required: true,
    },
    answers: [answerSchema],
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected', 'Reviewed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);