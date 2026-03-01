const express = require('express');
const { sendRequest, acceptRequest, getConnections, removeConnection,
  declineRequest } = require('../controllers/connectionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/request/:id', protect, sendRequest);
router.post('/accept/:id', protect, acceptRequest);
router.get('/', protect, getConnections);
router.delete('/:id', protect, removeConnection);
router.delete('/decline/:id', protect, declineRequest);

module.exports = router;