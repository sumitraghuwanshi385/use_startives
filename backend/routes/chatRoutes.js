const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { 
fetchConversations,
fetchMessages,
sendMessage,
createTeamChat,
createDirectChat,
clearMessages,
deleteConversation,
updateTeam,
addMembers,
removeMember
} = require('../controllers/chatController');

const router = express.Router();

// Get list of all chats (Direct & Teams)
router.get('/', protect, fetchConversations);

// Start a direct chat (or get existing)
router.post('/', protect, createDirectChat);

// Create a new Team
router.post('/team', protect, createTeamChat);

// Get messages of a specific chat
router.get('/:chatId/messages', protect, fetchMessages);

// Send a message
router.post('/:chatId/messages', protect, sendMessage);

router.delete('/:chatId/messages', protect, clearMessages);

// 🔥 ADD THIS ROUTE HERE
router.patch('/:chatId/read', protect, require('../controllers/chatController').markChatAsRead);

router.delete('/:chatId', protect, deleteConversation);

// UPDATE TEAM
router.put('/team/:chatId', protect, updateTeam);

// ADD MEMBER
router.put('/team/:chatId/add', protect, addMembers);

// REMOVE MEMBER
router.delete('/team/:chatId/member/:userId', protect, removeMember);

router.delete('/team/:chatId/leave', protect, leaveTeam);

router.delete('/team/:chatId/delete', protect, deleteTeam);

module.exports = router;