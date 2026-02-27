const express = require('express');
const ideaController = require('../controllers/ideaController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', ideaController.getIdeas);
router.post('/', protect, ideaController.createIdea);
router.get('/:id', ideaController.getIdeaById);

// ✅ ADD THESE TWO
router.put('/:id', protect, ideaController.updateIdea);
router.delete('/:id', protect, ideaController.deleteIdea);

module.exports = router;