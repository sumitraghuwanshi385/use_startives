const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// ✅ ADD THESE TWO
const { 
    registerUser, 
    loginUser, 
    googleLogin,
    updateUserProfile, 
    toggleSavedProject,
    getUserById,
    getCurrentUser,
    sendResetOtp,     
    resetPassword     
} = require('../controllers/authController');

// --- PUBLIC ROUTES ---
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);

// ✅ FORGOT PASSWORD ROUTES (IMPORTANT 🔥)
router.post('/forgot-password', sendResetOtp);
router.post('/reset-password', resetPassword);

router.get('/me', protect, getCurrentUser);
router.get('/users/:id', getUserById);

// --- PROTECTED ROUTES ---
router.put('/profile', protect, updateUserProfile);
router.put('/save-project', protect, toggleSavedProject);

module.exports = router;