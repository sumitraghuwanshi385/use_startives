const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    // The Startalk this comment belongs to
    startalkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Startalk',
      required: true,
      index: true,
    },

    // User who wrote the comment
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // Actual comment text
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
  },
  {
    timestamps: true,
  }
);

// Faster loading of comments for a Startalk
commentSchema.index({
  startalkId: 1,
  createdAt: 1,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;