const express = require('express');
const { sendRequest, acceptRequest, getConnections, removeConnection,
  declineRequest } = require('../controllers/connectionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/request/:id', protect, sendRequest);
router.post('/accept/:id', protect, acceptRequest);
router.get('/', protect, getConnections);

// 🔥 STATIC FIRST
router.delete('/decline/:id', protect, declineRequest);

// 🔥 DYNAMIC LAST
router.delete('/:id', protect, removeConnection); 

module.exports = router;