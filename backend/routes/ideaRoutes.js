// backend/routes/ideaRoutes.js
const express = require('express');
const { createIdea, GET ideas, getIdeaById } = require('../controllers/ideaController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/ideas -> Sab dekh sakte hain
// POST /api/ideas -> Sirf Logged-in user (protect)
router.route('/').get(getIdeas).post(protect, createIdea);
router.get('/:id', getIdeaById);

module.exports = router;