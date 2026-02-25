// backend/routes/ideaRoutes.js
const express = require('express');
const { createIdea, getIdeas, getIdeaById } = require('../controllers/ideaController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// GET all ideas
// POST create idea
router.route('/').get(getIdeas).post(protect, createIdea);

// GET single idea
router.get('/:id', getIdeaById);

module.exports = router;