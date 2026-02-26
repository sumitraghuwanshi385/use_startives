// backend/controllers/ideaController.js
const Idea = require('../models/Idea');

// Helper function to rename _id to id
const formatIdea = (idea) => {
  const ideaObj = idea.toObject();

  // main idea id
  ideaObj.id = ideaObj._id.toString();

  // 🔥 FIX: convert positions _id -> id
  if (ideaObj.positions && ideaObj.positions.length > 0) {
    ideaObj.positions = ideaObj.positions.map((pos) => ({
      ...pos,
      id: pos._id.toString(),
    }));
  }

  delete ideaObj._id;

  return ideaObj;
};

// @desc    Create a new Idea
// @route   POST /api/ideas
const createIdea = async (req, res) => {
  try {
    const {
      title, tagline, description, problem, buildingNow, founderQuote,
      tags, stage, category, businessModel, workMode, location, websiteUrl,
      positionsData,

      // old + new
      imageDataUrl,
      imageUrl
    } = req.body;

    // ✅ accept either imageUrl or imageDataUrl
    const finalImageUrl = imageUrl || imageDataUrl;

    if (!title || !description || !finalImageUrl) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields' });
    }

    const newIdea = await Idea.create({
      title,
      tagline,
      description,
      problem,
      buildingNow,
      founderQuote,
      stage,
      tags,
      category,
      businessModel,
      workMode,
      location,
      websiteUrl,
      imageUrl: finalImageUrl,       // ✅ store URL only
      positions: positionsData,
      founderId: req.user._id,
      founderName: req.user.name,
      founderEmail: req.user.email,
    });

    return res.status(201).json({ success: true, idea: formatIdea(newIdea) });
  } catch (error) {
    console.error("Create Idea Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Ideas (search + filters)
// @route   GET /api/ideas
const getIdeas = async (req, res) => {
  try {
    const { keyword, q, category, stage, location } = req.query;

    const search = (q || keyword || '').toString().trim();
    const query = {};

    // Search
    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [
        { title: regex },
        { tagline: regex },
        { description: regex },
        { problem: regex },
        { buildingNow: regex },
        { category: regex },
        { tags: { $in: [regex] } }, // tags is array
      ];
    }

    // Filters
    if (category && category !== 'All') query.category = category;
    if (stage && stage !== 'All') query.stage = stage;
    if (location && location !== 'All') query.location = location;

    const ideas = await Idea.find(query).sort({ postedDate: -1 });
    const formattedIdeas = ideas.map(formatIdea);

    return res.json({ success: true, ideas: formattedIdeas });
  } catch (error) {
    console.error('getIdeas error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single Idea
// @route   GET /api/ideas/:id
const getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found'
      });
    }

    return res.json({
      success: true,
      idea: formatIdea(idea)  // IMPORTANT
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { createIdea, getIdeas, getIdeaById };