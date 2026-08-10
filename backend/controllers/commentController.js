const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const Startalk = require('../models/Startalk');
const User = require('../models/User');


// ============================================================
// FORMAT COMMENT
// ============================================================

const formatComment = (comment) => {
    const obj = comment.toObject
        ? comment.toObject()
        : comment;

    return {
        id: obj._id
            ? obj._id.toString()
            : obj.id,

        startalkId: obj.startalkId
            ? obj.startalkId.toString()
            : null,

        authorId: obj.authorId?._id
            ? obj.authorId._id.toString()
            : obj.authorId
                ? obj.authorId.toString()
                : null,

        author: obj.authorId?.name || 'User',

        avatar:
            obj.authorId?.profilePictureUrl ||
            null,

        headline:
            obj.authorId?.headline ||
            'Builder',

        text: obj.text,

        timestamp:
            obj.createdAt ||
            obj.timestamp,

        createdAt:
            obj.createdAt,

        updatedAt:
            obj.updatedAt,
    };
};


// ============================================================
// GET COMMENTS FOR A STARTALK
// ============================================================

const getComments = async (req, res) => {
    try {
        const { startalkId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(startalkId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Startalk ID',
            });
        }

        // Make sure Startalk exists
        const startalk = await Startalk.findById(startalkId)
            .select('_id')
            .lean();

        if (!startalk) {
            return res.status(404).json({
                success: false,
                message: 'Startalk not found',
            });
        }

        const comments = await Comment.find({
            startalkId,
        })
            .populate(
                'authorId',
                'name profilePictureUrl headline'
            )
            .sort({
                createdAt: 1,
            })
            .lean();

        return res.json({
            success: true,
            comments: comments.map(formatComment),
            count: comments.length,
        });

    } catch (error) {
        console.error(
            'GET COMMENTS ERROR:',
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                'Failed to fetch comments',
        });
    }
};


// ============================================================
// CREATE COMMENT
// ============================================================

const createComment = async (req, res) => {
    try {
        const { startalkId } = req.params;
        const { text } = req.body;

        // -----------------------------
        // Validate Startalk ID
        // -----------------------------

        if (!mongoose.Types.ObjectId.isValid(startalkId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Startalk ID',
            });
        }

        // -----------------------------
        // Validate text
        // -----------------------------

        if (
            typeof text !== 'string' ||
            !text.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: 'Comment cannot be empty',
            });
        }

        const cleanText = text.trim();

        if (cleanText.length > 5000) {
            return res.status(400).json({
                success: false,
                message:
                    'Comment cannot exceed 5000 characters',
            });
        }

        // -----------------------------
        // Check Startalk
        // -----------------------------

        const startalk = await Startalk.findById(
            startalkId
        )
            .select('_id')
            .lean();

        if (!startalk) {
            return res.status(404).json({
                success: false,
                message: 'Startalk not found',
            });
        }

        // -----------------------------
        // Check authenticated user
        // -----------------------------

        const user = await User.findById(
            req.user._id
        )
            .select(
                '_id name profilePictureUrl headline'
            )
            .lean();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // -----------------------------
        // Create comment
        // -----------------------------

        const comment = await Comment.create({
            startalkId,
            authorId: user._id,
            text: cleanText,
        });

        // -----------------------------
        // Populate user
        // -----------------------------

        const populatedComment =
            await Comment.findById(
                comment._id
            )
                .populate(
                    'authorId',
                    'name profilePictureUrl headline'
                )
                .lean();

        return res.status(201).json({
            success: true,
            comment: formatComment(
                populatedComment
            ),
        });

    } catch (error) {
        console.error(
            'CREATE COMMENT ERROR:',
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                'Failed to create comment',
        });
    }
};


// ============================================================
// DELETE COMMENT
// ============================================================

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        if (
            !mongoose.Types.ObjectId.isValid(
                commentId
            )
        ) {
            return res.status(400).json({
                success: false,
                message: 'Invalid comment ID',
            });
        }

        const comment =
            await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found',
            });
        }

        // --------------------------------
        // ONLY COMMENT OWNER CAN DELETE
        // --------------------------------

        if (
            String(comment.authorId) !==
            String(req.user._id)
        ) {
            return res.status(403).json({
                success: false,
                message:
                    'You can only delete your own comment',
            });
        }

        await comment.deleteOne();

        return res.json({
            success: true,
            message: 'Comment deleted successfully',
            commentId,
        });

    } catch (error) {
        console.error(
            'DELETE COMMENT ERROR:',
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                'Failed to delete comment',
        });
    }
};


module.exports = {
    getComments,
    createComment,
    deleteComment,
};