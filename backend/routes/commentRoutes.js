const express = require('express');

const {
    getComments,
    createComment,
    deleteComment,
} = require('../controllers/commentController');

const {
    protect,
} = require('../middleware/authMiddleware');

const router = express.Router();


// ============================================================
// GET ALL COMMENTS FOR STARTALK
// ============================================================

router.get(
    '/startalk/:startalkId',
    protect,
    getComments
);


// ============================================================
// CREATE COMMENT
// ============================================================

router.post(
    '/startalk/:startalkId',
    protect,
    createComment
);


// ============================================================
// DELETE OWN COMMENT
// ============================================================

router.delete(
    '/:commentId',
    protect,
    deleteComment
);


module.exports = router;