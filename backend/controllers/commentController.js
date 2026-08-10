// backend/controllers/commentController.js

const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const Startalk = require('../models/Startalk');
const User = require('../models/User');


// ============================================================
// FORMAT COMMENT
// ============================================================

const formatComment = (comment) => {
    const obj = comment?.toObject
        ? comment.toObject()
        : comment;

    const populatedAuthor =
        obj?.authorId && typeof obj.authorId === 'object'
            ? obj.authorId
            : null;

    const authorId =
        populatedAuthor?._id
            ? populatedAuthor._id.toString()
            : obj?.authorId
                ? obj.authorId.toString()
                : null;

    return {
        id: obj?._id
            ? obj._id.toString()
            : obj?.id,

        startalkId: obj?.startalkId
            ? obj.startalkId.toString()
            : null,

        authorId,

        // 🔥 REAL USER NAME
        author:
            populatedAuthor?.name ||
            'User',

        // 🔥 REAL USER AVATAR
        avatar:
            populatedAuthor?.profilePictureUrl ||
            null,

        // 🔥 USER HEADLINE
        headline:
            populatedAuthor?.headline ||
            'Builder',

        text:
            obj?.text || '',

        timestamp:
            obj?.createdAt ||
            obj?.timestamp,

        createdAt:
            obj?.createdAt,

        updatedAt:
            obj?.updatedAt,
    };
};


// ============================================================
// GET COMMENTS FOR A STARTALK
// ============================================================

const getComments = async (req, res) => {
    try {
        const { startalkId } = req.params;

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
        // Check Startalk exists
        // -----------------------------

        const startalk = await Startalk.findById(startalkId)
            .select('_id')
            .lean();

        if (!startalk) {
            return res.status(404).json({
                success: false,
                message: 'Startalk not found',
            });
        }

        // -----------------------------
        // Fetch comments
        // -----------------------------

        const comments = await Comment.find({
            startalkId,
        })
            .populate(
                'authorId',
                '_id name email profilePictureUrl headline'
            )
            .sort({
                createdAt: 1,
            })
            .lean();

        // 🔥 DEBUG — CHECK EXACT USER DATA
        console.log(
            '🔥 COMMENTS FETCHED:',
            comments.map((comment) => ({
                commentId: comment._id?.toString(),
                authorId: comment.authorId?._id?.toString(),
                authorName: comment.authorId?.name,
                authorEmail: comment.authorId?.email,
            }))
        );

        const formattedComments =
            comments.map(formatComment);

        // 🔥 DEBUG — CHECK FINAL RESPONSE
        console.log(
            '🔥 FORMATTED COMMENTS:',
            formattedComments.map((comment) => ({
                id: comment.id,
                authorId: comment.authorId,
                author: comment.author,
                text: comment.text,
            }))
        );

        return res.json({
            success: true,
            comments: formattedComments,
            count: formattedComments.length,
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

        if (!req.user?._id) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated',
            });
        }

        const user = await User.findById(
            req.user._id
        )
            .select(
                '_id name email profilePictureUrl headline'
            )
            .lean();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // ====================================================
        // 🔥 IMPORTANT DEBUG
        // ====================================================

        console.log(
            '🔥 COMMENT USER FROM DB:',
            {
                id: user._id?.toString(),
                name: user.name,
                email: user.email,
                profilePictureUrl:
                    user.profilePictureUrl,
                headline:
                    user.headline,
            }
        );

        // -----------------------------
        // Create comment
        // -----------------------------

        const comment = await Comment.create({
            startalkId,
            authorId: user._id,
            text: cleanText,
        });

        // -----------------------------
        // Populate user after creation
        // -----------------------------

        const populatedComment =
            await Comment.findById(
                comment._id
            )
                .populate(
                    'authorId',
                    '_id name email profilePictureUrl headline'
                )
                .lean();

        if (!populatedComment) {
            return res.status(500).json({
                success: false,
                message:
                    'Comment created but could not be loaded',
            });
        }

        // ====================================================
        // 🔥 IMPORTANT DEBUG
        // ====================================================

        console.log(
            '🔥 COMMENT AFTER POPULATE:',
            {
                commentId:
                    populatedComment._id?.toString(),

                authorId:
                    populatedComment.authorId?._id?.toString(),

                authorName:
                    populatedComment.authorId?.name,

                authorEmail:
                    populatedComment.authorId?.email,

                text:
                    populatedComment.text,
            }
        );

        // -----------------------------
        // Format comment
        // -----------------------------

        const formattedComment =
            formatComment(
                populatedComment
            );

        // ====================================================
        // 🔥 FINAL RESPONSE DEBUG
        // ====================================================

        console.log(
            '🔥 COMMENT SENT TO FRONTEND:',
            formattedComment
        );

        // -----------------------------
        // Response
        // -----------------------------

        return res.status(201).json({
            success: true,
            comment: formattedComment,
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

        // -----------------------------
        // Validate comment ID
        // -----------------------------

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

        // -----------------------------
        // Find comment
        // -----------------------------

        const comment =
            await Comment.findById(
                commentId
            );

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found',
            });
        }

        // -----------------------------
        // Authentication check
        // -----------------------------

        if (!req.user?._id) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated',
            });
        }

        // -----------------------------
        // Only owner can delete
        // -----------------------------

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

        // -----------------------------
        // Delete
        // -----------------------------

        await comment.deleteOne();

        return res.json({
            success: true,
            message:
                'Comment deleted successfully',
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


// ============================================================
// EXPORTS
// ============================================================

module.exports = {
    getComments,
    createComment,
    deleteComment,
};