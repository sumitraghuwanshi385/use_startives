const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const {
  getStartalks,
  createStartalk,
  deleteStartalk,
  reactToStartalk,
} = require('../controllers/startalkController');

const router = express.Router();

router.get('/', protect, getStartalks); // ✅ FIXED
router.post('/', protect, createStartalk);
router.post('/:id/react', protect, reactToStartalk);
router.delete('/:id', protect, deleteStartalk);

module.exports = router;