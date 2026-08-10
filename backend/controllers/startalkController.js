const Startalk = require('../models/Startalk');
const User = require('../models/User');
const Comment = require('../models/Comment');


// ============================================================
// FORMAT STARTALK
// ============================================================

const formatTalk = (t, currentUserId = null) => {
    const obj = t.toObject ? t.toObject() : { ...t };

    obj.id = obj._id
        ? obj._id.toString()
        : obj.id;

    obj.timestamp = obj.createdAt;

    delete obj._id;
    delete obj.__v;

    obj.reactions = obj.reactions || {};
    obj.userReactions = obj.userReactions || {};

    // ========================================================
    // LIVE AUTHOR DATA
    // ========================================================

    if (
        obj.authorId &&
        typeof obj.authorId === 'object'
    ) {
        obj.author = {
            id: obj.authorId._id?.toString(),
            name: obj.authorId.name,
            avatar: obj.authorId.profilePictureUrl,
            headline: obj.authorId.headline
        };

        obj.authorId =
            obj.author.id;
    }

    // ========================================================
    // CURRENT USER REACTION
    // ========================================================

    if (currentUserId) {
        obj.currentUserReaction =
            obj.userReactions[currentUserId] ||
            null;
    } else {
        obj.currentUserReaction = null;
    }

    // ========================================================
    // COMMENT COUNT
    //
    // This is populated by getStartalks().
    // Always keep it numeric so frontend never gets undefined.
    // ========================================================

    obj.commentCount = Number(
        obj.commentCount || 0
    );

    return obj;
};


// ============================================================
// GET ALL STARTALKS
// ============================================================

const getStartalks = async (req, res) => {
    try {
        const userId =
            req.user?._id?.toString() ||
            null;

        // ----------------------------------------------------
        // Fetch Startalks
        // ----------------------------------------------------

        const talks = await Startalk.find()
            .populate(
                'authorId',
                'name profilePictureUrl headline'
            )
            .sort({
                createdAt: -1
            })
            .lean();

        // ----------------------------------------------------
        // Get REAL comment counts from MongoDB
        //
        // One count query per Startalk is simple and reliable.
        // Promise.all keeps them running in parallel.
        // ----------------------------------------------------

        const startalksWithCounts =
            await Promise.all(
                talks.map(async (talk) => {

                    const commentCount =
                        await Comment.countDocuments({
                            startalkId: talk._id
                        });

                    return {
                        ...talk,
                        commentCount
                    };
                })
            );

        // ----------------------------------------------------
        // Format response
        // ----------------------------------------------------

        return res.json({
            success: true,
            startalks:
                startalksWithCounts.map(
                    talk =>
                        formatTalk(
                            talk,
                            userId
                        )
                )
        });

    } catch (err) {

        console.error(
            'GET STARTALKS ERROR:',
            err
        );

        return res.status(500).json({
            success: false,
            message:
                err.message ||
                'Failed to fetch Startalks'
        });
    }
};


// ============================================================
// CREATE STARTALK
// ============================================================

const createStartalk = async (
    req,
    res
) => {
    try {

        const {
            content,
            imageUrl
        } = req.body;

        if (
            !content ||
            !content.trim()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    'Content required'
            });
        }

        const user =
            await User.findById(
                req.user._id
            ).lean();

        if (!user) {
            return res.status(404).json({
                success: false,
                message:
                    'User not found'
            });
        }

        const talk =
            await Startalk.create({
                authorId: user._id,

                authorName:
                    user.name,

                authorAvatar:
                    user.profilePictureUrl,

                authorHeadline:
                    user.headline,

                content:
                    content.trim(),

                imageUrl,

                reactions: {},

                userReactions: {}
            });

        // New Startalk obviously has zero comments.
        const formattedTalk =
            formatTalk(
                talk,
                req.user._id.toString()
            );

        formattedTalk.commentCount = 0;

        return res.status(201).json({
            success: true,
            startalk:
                formattedTalk
        });

    } catch (err) {

        console.error(
            'CREATE STARTALK ERROR:',
            err
        );

        return res.status(500).json({
            success: false,
            message:
                err.message ||
                'Failed to create Startalk'
        });
    }
};


// ============================================================
// DELETE STARTALK
// ============================================================

const deleteStartalk = async (
    req,
    res
) => {
    try {

        const talk =
            await Startalk.findById(
                req.params.id
            );

        if (!talk) {
            return res.status(404).json({
                success: false,
                message:
                    'Startalk not found'
            });
        }

        if (
            talk.authorId.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    'Unauthorized'
            });
        }

        // ----------------------------------------------------
        // Delete Startalk
        // ----------------------------------------------------

        await talk.deleteOne();

        // ----------------------------------------------------
        // Also remove its comments
        // ----------------------------------------------------

        await Comment.deleteMany({
            startalkId: talk._id
        });

        return res.json({
            success: true
        });

    } catch (err) {

        console.error(
            'DELETE STARTALK ERROR:',
            err
        );

        return res.status(500).json({
            success: false,
            message:
                err.message ||
                'Failed to delete Startalk'
        });
    }
};


// ============================================================
// REACT TO STARTALK
// ============================================================

const reactToStartalk = async (
    req,
    res
) => {
    try {

        const {
            emoji
        } = req.body;

        const userId =
            req.user._id.toString();

        const talkId =
            req.params.id;

        if (!emoji) {
            return res.status(400).json({
                success: false,
                message:
                    'Emoji required'
            });
        }

        const talk =
            await Startalk.findById(
                talkId
            ).lean();

        if (!talk) {
            return res.status(404).json({
                success: false,
                message:
                    'Startalk not found'
            });
        }

        let reactions = {
            ...(talk.reactions || {})
        };

        let userReactions = {
            ...(talk.userReactions || {})
        };

        const previousEmoji =
            userReactions[userId];

        // ----------------------------------------------------
        // REMOVE SAME REACTION
        // ----------------------------------------------------

        if (
            previousEmoji === emoji
        ) {

            if (
                reactions[emoji] > 0
            ) {
                reactions[emoji]--;
            }

            if (
                reactions[emoji] <= 0
            ) {
                delete reactions[emoji];
            }

            delete userReactions[
                userId
            ];

        }

        // ----------------------------------------------------
        // SWITCH / ADD REACTION
        // ----------------------------------------------------

        else {

            if (previousEmoji) {

                if (
                    reactions[
                        previousEmoji
                    ] > 0
                ) {
                    reactions[
                        previousEmoji
                    ]--;
                }

                if (
                    reactions[
                        previousEmoji
                    ] <= 0
                ) {
                    delete reactions[
                        previousEmoji
                    ];
                }
            }

            reactions[emoji] =
                (
                    reactions[emoji] ||
                    0
                ) + 1;

            userReactions[userId] =
                emoji;
        }

        // ----------------------------------------------------
        // Update Startalk
        // ----------------------------------------------------

        const updatedTalk =
            await Startalk.findByIdAndUpdate(
                talkId,
                {
                    $set: {
                        reactions,
                        userReactions
                    }
                },
                {
                    new: true,
                    lean: true
                }
            );

        // ----------------------------------------------------
        // Get current REAL comment count
        // ----------------------------------------------------

        const commentCount =
            await Comment.countDocuments({
                startalkId: talkId
            });

        const formattedTalk =
            formatTalk(
                updatedTalk,
                userId
            );

        formattedTalk.commentCount =
            commentCount;

        // ----------------------------------------------------
        // Response
        // ----------------------------------------------------

        return res.json({
            success: true,
            startalk:
                formattedTalk
        });

    } catch (err) {

        console.error(
            'REACT STARTALK ERROR:',
            err
        );

        return res.status(500).json({
            success: false,
            message:
                err.message ||
                'Failed to react to Startalk'
        });
    }
};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {
    getStartalks,
    createStartalk,
    deleteStartalk,
    reactToStartalk
};