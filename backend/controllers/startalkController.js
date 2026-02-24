const Startalk = require('../models/Startalk');
const User = require('../models/User');


// ================= FORMATTER =================
const formatTalk = (t, currentUserId = null) => {
    const obj = t.toObject ? t.toObject() : t;

    obj.id = obj._id ? obj._id.toString() : obj.id;
    obj.timestamp = obj.createdAt;

    delete obj._id;
    delete obj.__v;

    obj.reactions = obj.reactions || {};
    obj.userReactions = obj.userReactions || {};

    // ✅ Important for React button state
    if (currentUserId) {
        obj.currentUserReaction = obj.userReactions[currentUserId] || null;
    } else {
        obj.currentUserReaction = null;
    }

    return obj;
};


// ================= GET STARTALKS =================
const getStartalks = async (req, res) => {
    try {
        const userId = req.user?._id?.toString() || null;

        const talks = await Startalk.find()
            .sort({ createdAt: -1 })
            .lean();

        return res.json({
            success: true,
            startalks: talks.map(t => formatTalk(t, userId))
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
};


// ================= CREATE STARTALK =================
const createStartalk = async (req, res) => {
    try {
        const { content, imageUrl } = req.body;

        if (!content)
            return res.status(400).json({ success: false, message: 'Content required' });

        const user = await User.findById(req.user._id).lean();
        if (!user)
            return res.status(404).json({ success: false, message: 'User not found' });

        const talk = await Startalk.create({
            authorId: user._id,
            authorName: user.name,
            authorAvatar: user.profilePictureUrl,
            authorHeadline: user.headline,
            content,
            imageUrl,
            reactions: {},
            userReactions: {}
        });

        return res.status(201).json({
            success: true,
            startalk: formatTalk(talk, req.user._id.toString())
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
};


// ================= DELETE STARTALK =================
const deleteStartalk = async (req, res) => {
    try {
        const talk = await Startalk.findById(req.params.id);
        if (!talk)
            return res.status(404).json({ success: false, message: 'Not found' });

        if (talk.authorId.toString() !== req.user._id.toString())
            return res.status(403).json({ success: false, message: 'Unauthorized' });

        await talk.deleteOne();

        return res.json({ success: true });

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};


// ================= REACT TO STARTALK =================
const reactToStartalk = async (req, res) => {
    try {
        const { emoji } = req.body;
        const userId = req.user._id.toString();
        const talkId = req.params.id;

        if (!emoji)
            return res.status(400).json({ success: false, message: 'Emoji required' });

        const talk = await Startalk.findById(talkId).lean();
        if (!talk)
            return res.status(404).json({ success: false, message: 'Startalk not found' });

        let reactions = { ...(talk.reactions || {}) };
        let userReactions = { ...(talk.userReactions || {}) };

        const previousEmoji = userReactions[userId];

        if (previousEmoji === emoji) {
            // Remove reaction
            if (reactions[emoji] > 0) reactions[emoji]--;
            if (reactions[emoji] <= 0) delete reactions[emoji];
            delete userReactions[userId];

        } else {
            // Switch or Add reaction
            if (previousEmoji) {
                if (reactions[previousEmoji] > 0) reactions[previousEmoji]--;
                if (reactions[previousEmoji] <= 0) delete reactions[previousEmoji];
            }

            reactions[emoji] = (reactions[emoji] || 0) + 1;
            userReactions[userId] = emoji;
        }

        const updatedTalk = await Startalk.findByIdAndUpdate(
            talkId,
            {
                $set: {
                    reactions,
                    userReactions
                }
            },
            { new: true, lean: true }
        );

        return res.json({
            success: true,
            startalk: formatTalk(updatedTalk, userId)
        });

    } catch (err) {
        console.error('React Error:', err);
        return res.status(500).json({ success: false, message: err.message });
    }
};


module.exports = {
    getStartalks,
    createStartalk,
    deleteStartalk,
    reactToStartalk
};