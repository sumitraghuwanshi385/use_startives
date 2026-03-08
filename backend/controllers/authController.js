// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// --- Generate Token ---
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/signup
const registerUser = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        return res.status(201).json({
  success: true,
  verificationCode: verificationCode
});

        const user = await User.create({
            email,
            password,
            name: name || '',
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid user data' });
        }

        // Email sending (non-blocking)
        try {
            await sendEmail(email, 'Verify your Startives Account', verificationCode);
        } catch (err) {
            console.error('Email failed:', err.message);
        }

        // ✅ FIX: Return token + user
        return res.status(201).json({
    success: true,
    verificationCode: verificationCode
});

    } catch (error) {
        console.error('Signup Error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            return res.json({
                success: true,
                user: {
                    id: user._id,
                    name: user.name || '',
                    email: user.email,
                    headline: user.headline,
                    country: user.country,
                    profilePictureUrl: user.profilePictureUrl,
                    savedProjectIds: user.savedProjectIds || [],
                    connections: user.connections || [],
                    connectionRequests: user.connectionRequests || [],
                    sentRequests: user.sentRequests || [],
                    createdAt: user.createdAt,
                },
                token: generateToken(user._id),
            });
        }

        return res.status(401).json({ success: false, message: 'Invalid email or password' });

    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Update user profile
// @route PUT /api/auth/profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user && req.user._id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // BASIC FIELDS
    if (req.body.name !== undefined) user.name = req.body.name;
    if (req.body.email !== undefined) user.email = req.body.email;
    if (req.body.headline !== undefined) user.headline = req.body.headline;
    if (req.body.bio !== undefined) user.bio = req.body.bio;
    if (req.body.country !== undefined) user.country = req.body.country;

    // ARRAYS
    if (Array.isArray(req.body.skills)) user.skills = req.body.skills;
    if (Array.isArray(req.body.interests)) user.interests = req.body.interests;

    // OBJECT
    if (req.body.socialLinks && typeof req.body.socialLinks === "object") {
      user.socialLinks = req.body.socialLinks;
    }

    if (req.body.profilePictureUrl) {
      user.profilePictureUrl = req.body.profilePictureUrl;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    return res.json({
      success: true,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        headline: updatedUser.headline,
        bio: updatedUser.bio,
        country: updatedUser.country,
        profilePictureUrl: updatedUser.profilePictureUrl,
        skills: updatedUser.skills || [],
        interests: updatedUser.interests || [],
        socialLinks: updatedUser.socialLinks || {},
        savedProjectIds: updatedUser.savedProjectIds || [],
        connections: updatedUser.connections || [],
        connectionRequests: updatedUser.connectionRequests || [],
        sentRequests: updatedUser.sentRequests || [],
        createdAt: updatedUser.createdAt,
      },
      token: generateToken(updatedUser._id),
    });

  } catch (error) {
    console.error("Profile Update Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get specific user by ID (Public)
// @route   GET /api/users/:id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password -__v');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.json({
            success: true,
            user: {
                id: user._id,
                ...user.toObject(),
            },
        });

    } catch (error) {
        console.error('Get User Error:', error);
        return res.status(500).json({ success: false, message: 'Invalid User ID' });
    }
};

// @desc    Get logged in user
// @route   GET /api/auth/me
const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .lean(); // 🔥 important

        if (!user) {
            return res.status(404).json({ success: false });
        }

        return res.json({
  success: true,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    headline: user.headline,
    bio: user.bio,
    country: user.country,
    profilePictureUrl: user.profilePictureUrl,
    skills: user.skills || [],
    interests: user.interests || [],
    socialLinks: user.socialLinks || {},
    savedProjectIds: user.savedProjectIds || [],
    connections: user.connections || [],
    connectionRequests: user.connectionRequests || [],
    sentRequests: user.sentRequests || [],
    createdAt: user.createdAt,
  }
});

    } catch (error) {
        console.error("GetCurrentUser Error:", error);
        return res.status(500).json({ success: false });
    }
};

// @desc    Save or unsave a project
// @route   PUT /api/auth/save-project
const toggleSavedProject = async (req, res) => {
    try {
        const { projectId } = req.body;

        if (!projectId) {
            return res.status(400).json({ success: false, message: "Project ID required" });
        }

        const user = await User.findById(req.user._id).lean();

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const alreadySaved = user.savedProjectIds?.includes(projectId);

        const update = alreadySaved
            ? { $pull: { savedProjectIds: projectId } }
            : { $addToSet: { savedProjectIds: projectId } };

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            update,
            { new: true }
        );

        return res.json({
            success: true,
            savedProjectIds: updatedUser.savedProjectIds
        });

    } catch (error) {
        console.error("Toggle Save Error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateUserProfile,
    toggleSavedProject,
    getUserById,
    getCurrentUser,
};