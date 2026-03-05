const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');
const mongoose = require('mongoose');

// --- Helper: Format Chat for Frontend ---
const formatChat = (chat, currentUserId) => {
    // Determine contact (Other person in Direct, or Team details in Team)
    let contact = {};
    const chatObj = chat.toObject();
    
    if (chat.isTeam) {
        contact = {
            id: chatObj._id.toString(),
            name: chat.chatName,
            avatarUrl: chat.chatImage,
            isOnline: false 
        };
    } else {
        // Find the other user
        const otherUser = chat.users.find(u => u._id.toString() !== currentUserId.toString());
        if (otherUser) {
            contact = {
                id: otherUser._id.toString(),
                name: otherUser.name,
                avatarUrl: otherUser.profilePictureUrl,
                isOnline: false 
            };
        } else {
            // Self chat case
            contact = { id: "self", name: "Me", avatarUrl: "" };
        }
    }

    return {
        id: chatObj._id.toString(),
        contact: contact,
        messages: [], // Messages will be fetched separately or populated if needed
        lastMessagePreview: chat.lastMessage?.text || (chat.isTeam ? "Team created" : "Start chatting"),
        lastMessageTimestamp: chat.lastMessage?.timestamp || chat.createdAt,
        unreadCount: chat.unreadCounts?.get(currentUserId.toString()) || 0,
        isTeam: chat.isTeam,
        description: chat.description,
        adminId: chat.admin ? chat.admin._id.toString() : null,
memberIds: chat.users.map(u => u._id ? u._id.toString() : u.toString()),
members: chat.users
    };
};

// @desc    Get all conversations for user
// @route   GET /api/chat
const fetchConversations = async (req, res) => {
    try {
        const chats = await Conversation.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate('users', '-password') // Get user details
            .populate('admin', '-password')
            .sort({ updatedAt: -1 });

        const formattedChats = chats.map(c => formatChat(c, req.user._id));
        res.json({ success: true, chats: formattedChats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Start/Get Direct Chat
// @route   POST /api/chat
const createDirectChat = async (req, res) => {
    const { userId } = req.body; // Target User ID

    if (!userId) return res.status(400).json({ message: "UserId param not sent with request" });

    // 1. Check if chat exists
    let isChat = await Conversation.find({
        isTeam: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    }).populate("users", "-password");

    if (isChat.length > 0) {
        res.json({ success: true, chat: formatChat(isChat[0], req.user._id) });
    } else {
        // 2. Create new chat
        var chatData = {
            chatName: "sender",
            isTeam: false,
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Conversation.create(chatData);
            const fullChat = await Conversation.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.json({ success: true, chat: formatChat(fullChat, req.user._id) });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
};

// @desc    Create Team Chat
// @route   POST /api/chat/team
const createTeamChat = async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    // users array should be JSON stringified IDs from frontend or simple array
    let users = req.body.users; // Expecting array of IDs

    if (users.length < 1) {
        return res.status(400).json({ message: "More than 2 users are required to form a group chat" });
    }

    users.push(req.user._id); // Add current user (admin)

    try {
        const groupChat = await Conversation.create({
            chatName: req.body.name,
            description: req.body.description,
            chatImage: req.body.image, // Optional image URL
            users: users,
            isTeam: true,
            admin: req.user._id,
        });

        const fullGroupChat = await Conversation.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("admin", "-password");

        res.status(200).json({ success: true, chat: formatChat(fullGroupChat, req.user._id) });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get All Messages
// @route   GET /api/chat/:chatId/messages
const fetchMessages = async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.chatId })
            .populate("sender", "name profilePictureUrl email")
            .populate("readBy");

        const formattedMessages = messages.map(msg => ({
    id: msg._id.toString(),
    senderId: msg.sender ? msg.sender._id.toString() : "system",
    senderName: msg.sender ? msg.sender.name : "system",
    senderAvatar: msg.sender ? msg.sender.profilePictureUrl : "",
    text: msg.text,
    type: msg.type,
    file: msg.file,
    timestamp: msg.createdAt,
    isRead: msg.readBy?.some(u => u._id.toString() === req.user._id.toString())
}));

        res.json({ success: true, messages: formattedMessages });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Send Message
// @route   POST /api/chat/:chatId/messages
const sendMessage = async (req, res) => {
    const { text, file, type } = req.body;
    const chatId = req.params.chatId;

    if (!text && !file) {
        return res.status(400).json({ message: "Invalid data passed into request" });
    }

    var newMessage = {
        sender: req.user._id,
        text: text,
        conversationId: chatId,
        type: type || 'text',
        file: file // { name, url, mimeType, size }
    };

    try {
        var message = await Message.create(newMessage);

        // Update Last Message in Conversation
        const conversation = await Conversation.findById(chatId);

if (!conversation) {
  return res.status(404).json({ message: "Chat not found" });
}

// Update last message
conversation.lastMessage = {
  text: text || (type === 'image' ? 'Sent an image' : 'Sent a file'),
  sender: req.user._id,
  timestamp: new Date()
};

// 🔥 INCREMENT UNREAD FOR OTHER USERS
conversation.users.forEach(userId => {
  if (userId.toString() !== req.user._id.toString()) {
    const current = conversation.unreadCounts.get(userId.toString()) || 0;
    conversation.unreadCounts.set(userId.toString(), current + 1);
  }
});

await conversation.save();

        // Populate sender details for frontend
        message = await message.populate("sender", "name profilePictureUrl");
        
        const formattedMsg = {
            id: message._id.toString(),
            senderId: message.sender._id.toString(),
            text: message.text,
            timestamp: message.createdAt,
            type: message.type,
            file: message.file,
            isRead: false
        };

        res.json({ success: true, message: formattedMsg });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ================= CLEAR MESSAGES =================

const clearMessages = async (req, res) => {
  try {
    const chatId = new mongoose.Types.ObjectId(req.params.chatId);

    await Message.deleteMany({
      conversationId: chatId,
    });

    await Conversation.findByIdAndUpdate(chatId, {
      lastMessage: null,
    });

    console.log("Messages cleared from DB");

    res.json({ success: true });
  } catch (error) {
    console.log("CLEAR ERROR:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ================= DELETE CONVERSATION =================
const deleteConversation = async (req, res) => {
  try {
    const chatId = new mongoose.Types.ObjectId(req.params.chatId);

    await Message.deleteMany({
      conversationId: chatId,
    });

    await Conversation.findByIdAndDelete(chatId);

    console.log("Conversation deleted from DB");

    res.json({ success: true });
  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const markChatAsRead = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user._id;

    const chat = await Conversation.findById(chatId);
    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat not found' });
    }

    if (chat.unreadCounts) {
      chat.unreadCounts.set(userId.toString(), 0);
      await chat.save();
    }

    res.json({ success: true });
  } catch (error) {
    console.error('markChatAsRead error:', error);
    res.status(500).json({ success: false });
  }
};

// ================= UPDATE TEAM =================
const updateTeam = async (req,res)=>{
try{

const { chatId } = req.params;
const { name, description, image } = req.body;

const chat = await Conversation.findById(chatId);

if(!chat){
return res.status(404).json({success:false});
}

chat.chatName = name || chat.chatName;
chat.description = description || chat.description;
chat.chatImage = image || chat.chatImage;

await chat.save();
await Message.create({
conversationId: chatId,
sender: req.user._id,
text:`${req.user.name} updated team details`,
type:"system"
});

res.json({success:true,chat});

}catch(error){
res.status(500).json({success:false,message:error.message});
}
};


// ================= ADD MEMBERS =================
const addMembers = async (req,res)=>{

try{

const { chatId } = req.params;
const { users } = req.body;

const chat = await Conversation.findById(chatId);

users.forEach(userId=>{
if(!chat.users.includes(userId)){
chat.users.push(userId);
}
});

await chat.save();
await Message.create({
conversationId: chatId,
sender: req.user._id,
text: `${req.user.name} added new members`,
type:"system"
});

res.json({success:true});

}catch(error){
res.status(500).json({success:false});
}

};


// ================= REMOVE MEMBER =================
const removeMember = async (req,res)=>{

try{

const { chatId,userId } = req.params;

const chat = await Conversation.findById(chatId);

chat.users = chat.users.filter(
u => u.toString() !== userId
);

await chat.save();
await Message.create({
conversationId: chatId,
sender: req.user._id,
text:`${req.user.name} removed a member`,
type:"system"
});

res.json({success:true});

}catch(error){
res.status(500).json({success:false});
}

};

const leaveTeam = async(req,res)=>{
try{

const { chatId } = req.params;

const chat = await Conversation.findById(chatId);

chat.users = chat.users.filter(
u => u.toString() !== req.user._id.toString()
);

await chat.save();
await Message.create({
conversationId: chatId,
sender: req.user._id,
text:`${req.user.name} left the team`,
type:"system"
});

res.json({success:true});

}catch(err){
res.status(500).json({success:false});
}
};

const deleteTeam = async(req,res)=>{
try{

const { chatId } = req.params;

await Conversation.findByIdAndDelete(chatId);

res.json({success:true});

}catch(err){
res.status(500).json({success:false});
}
};

module.exports = {
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
markChatAsRead,
leaveTeam,
deleteTeam
};