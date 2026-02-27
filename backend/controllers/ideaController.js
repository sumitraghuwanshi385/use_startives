// backend/controllers/ideaController.js
const Idea = require('../models/Idea');


// =======================================
// Helper: format _id → id
// =======================================
const formatIdea = (idea) => {
  const ideaObj = idea.toObject();

  ideaObj.id = ideaObj._id.toString();

  if (ideaObj.positions && ideaObj.positions.length > 0) {
    ideaObj.positions = ideaObj.positions.map((pos) => ({
      ...pos,
      id: pos._id.toString(),
    }));
  }

  delete ideaObj._id;
  return ideaObj;
};


// =======================================
// CREATE IDEA
// POST /api/ideas
// =======================================
const createIdea = async (req, res) => {
  try {
    const {
      title, tagline, description, problem, buildingNow,
      founderQuote, teamSize,
      tags, stage, category, businessModel,
      workMode, location, websiteUrl,
      positionsData,
      imageDataUrl,
      imageUrl
    } = req.body;

    const finalImageUrl = imageUrl || imageDataUrl;

    if (!title || !description || !finalImageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields'
      });
    }

    const newIdea = await Idea.create({
      title,
      tagline,
      description,
      problem,
      buildingNow,
      founderQuote,
      teamSize,
      stage,
      tags,
      category,
      businessModel,
      workMode,
      location,
      websiteUrl,
      imageUrl: finalImageUrl,
      positions: positionsData,
      founderId: req.user._id,
      founderName: req.user.name,
      founderEmail: req.user.email,
    });

    return res.status(201).json({
      success: true,
      idea: formatIdea(newIdea)
    });

  } catch (error) {
    console.error("Create Idea Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// =======================================
// GET ALL IDEAS
// GET /api/ideas
// =======================================
const getIdeas = async (req, res) => {
  try {
    const { keyword, q, category, stage, location } = req.query;

    const search = (q || keyword || '').toString().trim();
    const query = {};

    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [
        { title: regex },
        { tagline: regex },
        { description: regex },
        { problem: regex },
        { buildingNow: regex },
        { category: regex },
        { tags: { $in: [regex] } },
      ];
    }

    if (category && category !== 'All') query.category = category;
    if (stage && stage !== 'All') query.stage = stage;
    if (location && location !== 'All') query.location = location;

    const ideas = await Idea.find(query).sort({ postedDate: -1 });

    return res.json({
      success: true,
      ideas: ideas.map(formatIdea)
    });

  } catch (error) {
    console.error('getIdeas error:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// =======================================
// GET SINGLE IDEA
// GET /api/ideas/:id
// =======================================
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
      idea: formatIdea(idea)
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// =======================================
// UPDATE IDEA
// PUT /api/ideas/:id
// =======================================
const updateIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found'
      });
    }

    // 🔥 Only founder can update
    if (idea.founderId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const {
      title, tagline, description, problem,
      buildingNow, founderQuote, teamSize,
      stage, tags, category,
      businessModel, workMode,
      location, websiteUrl,
      positions,
      imageUrl
    } = req.body;

    idea.title = title ?? idea.title;
    idea.tagline = tagline ?? idea.tagline;
    idea.description = description ?? idea.description;
    idea.problem = problem ?? idea.problem;
    idea.buildingNow = buildingNow ?? idea.buildingNow;
    idea.founderQuote = founderQuote ?? idea.founderQuote;
    idea.teamSize = teamSize ?? idea.teamSize;
    idea.stage = stage ?? idea.stage;
    idea.tags = tags ?? idea.tags;
    idea.category = category ?? idea.category;
    idea.businessModel = businessModel ?? idea.businessModel;
    idea.workMode = workMode ?? idea.workMode;
    idea.location = location ?? idea.location;
    idea.websiteUrl = websiteUrl ?? idea.websiteUrl;
    idea.positions = positions ?? idea.positions;
    idea.imageUrl = imageUrl ?? idea.imageUrl;

    await idea.save();

    return res.json({
      success: true,
      idea: formatIdea(idea)
    });

  } catch (error) {
    console.error("Update Idea Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// =======================================
// DELETE IDEA
// DELETE /api/ideas/:id
// =======================================
const deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found'
      });
    }

    if (idea.founderId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await idea.deleteOne();

    return res.json({
      success: true
    });

  } catch (error) {
    console.error("Delete Idea Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  createIdea,
  getIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea
};