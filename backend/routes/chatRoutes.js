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
removeMember,
setRole,
markChatAsRead,
leaveTeam,
deleteTeam
} = require('../controllers/chatController');

const router = express.Router();

// Get list of all chats
router.get('/', protect, fetchConversations);

// Start a direct chat
router.post('/', protect, createDirectChat);

// Create team
router.post('/team', protect, createTeamChat);

// Get messages
router.get('/:chatId/messages', protect, fetchMessages);

// Send message
router.post('/:chatId/messages', protect, sendMessage);

// Clear messages
router.delete('/:chatId/messages', protect, clearMessages);

// Mark read
router.patch('/:chatId/read', protect, markChatAsRead);

// Delete chat
router.delete('/:chatId', protect, deleteConversation);

// Update team
router.put('/team/:chatId', protect, updateTeam);

// Add member
router.put('/team/:chatId/add', protect, addMembers);

// Remove member
router.delete('/team/:chatId/member/:userId', protect, removeMember);

// Set member role
router.put('/team/:chatId/role/:userId', protect, setRole);

// Leave team
router.delete('/team/:chatId/leave', protect, leaveTeam);

// Delete team
router.delete('/team/:chatId/delete', protect, deleteTeam);

module.exports = router;