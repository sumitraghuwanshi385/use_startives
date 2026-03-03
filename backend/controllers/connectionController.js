const User = require('../models/User');
const Notification = require('../models/Notification');

// @desc    Send Connection Request
// @route   POST /api/connections/request/:id
const sendRequest = async (req, res) => {
    try {
        const targetUser = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if (!targetUser)
            return res.status(404).json({ message: 'User not found' });

        if (currentUser.connections.includes(targetUser._id)) {
            return res.status(400).json({ message: 'Already connected' });
        }

        if (targetUser.connectionRequests.includes(currentUser._id)) {
            return res.status(400).json({ message: 'Request already sent' });
        }

        targetUser.connectionRequests.push(currentUser._id);

        if (!currentUser.sentRequests) currentUser.sentRequests = [];
        currentUser.sentRequests.push(targetUser._id);

        await targetUser.save();
        await currentUser.save();

        // ✅ NOTIFICATION HERE (INSIDE TRY BLOCK)
        await Notification.create({
    receiver: targetUser._id,
    sender: currentUser._id,
    type: "CONNECTION",
    status: "PENDING",
    message: `${currentUser.name} sent you a connection request`
});

        res.json({ success: true, message: 'Request sent' });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Accept Connection Request
// @route   POST /api/connections/accept/:id
const acceptRequest = async (req, res) => {
    try {
        const requesterId = req.params.id; // Jisne request bheji thi
        const currentUser = await User.findById(req.user._id); // Main (Accept karne wala)
        const requesterUser = await User.findById(requesterId); 

        if (!currentUser || !requesterUser) return res.status(404).json({ message: 'User not found' });

        if (!currentUser.connectionRequests.includes(requesterId)) {
            return res.status(400).json({ message: 'No request from this user' });
        }

        // 1. Dono ko connect karo
        currentUser.connections.push(requesterId);
        requesterUser.connections.push(currentUser._id);

        // 2. Mere inbox se request hatao
        currentUser.connectionRequests = currentUser.connectionRequests.filter(id => id.toString() !== requesterId);

        // 3. Uske 'sentRequests' se hatao (Clean up)
        if (requesterUser.sentRequests) {
            requesterUser.sentRequests = requesterUser.sentRequests.filter(id => id.toString() !== currentUser._id.toString());
        }

        await currentUser.save();
        await requesterUser.save()

// 🔥 1️⃣ Remove old pending notification
await Notification.deleteMany({
    receiver: currentUser._id,
    sender: requesterUser._id,
    type: "CONNECTION",
    status: "PENDING"
});

await Notification.create({
    receiver: requesterUser._id, 
    sender: currentUser._id,
    type: "CONNECTION",
    status: "ACCEPTED",
    message: `${currentUser.name} accepted your connection request`
});

        res.json({ success: true, message: 'Request accepted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// getConnections same rahega
const getConnections = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('connections', 'name headline profilePictureUrl');
        res.json({ success: true, connections: user.connections });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Decline Connection Request
// @route   DELETE /api/connections/decline/:id
const declineRequest = async (req, res) => {
  try {
    const requesterId = req.params.id;

    const currentUser = await User.findById(req.user._id);
    const requesterUser = await User.findById(requesterId);

    if (!currentUser || !requesterUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Remove from my inbox
    currentUser.connectionRequests = currentUser.connectionRequests.filter(
      id => id.toString() !== requesterId
    );

    // Remove from sender sentRequests
    if (requesterUser.sentRequests) {
      requesterUser.sentRequests = requesterUser.sentRequests.filter(
        id => id.toString() !== currentUser._id.toString()
      );
    }

    await currentUser.save();
    await requesterUser.save();

    res.json({ success: true, message: "Request declined" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Remove Connection
// @route   DELETE /api/connections/:id
const removeConnection = async (req, res) => {
  try {
    const targetUserId = req.params.id;

    const currentUser = await User.findById(req.user._id);
    const targetUser = await User.findById(targetUserId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Remove from both users
    currentUser.connections = currentUser.connections.filter(
      id => id.toString() !== targetUserId
    );

    targetUser.connections = targetUser.connections.filter(
      id => id.toString() !== currentUser._id.toString()
    );

    await currentUser.save();
    await targetUser.save();

    res.json({ success: true, message: "Connection removed" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { sendRequest, acceptRequest, getConnections, removeConnection,
  declineRequest };