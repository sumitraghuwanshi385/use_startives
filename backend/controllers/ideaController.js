const Idea = require('../models/Idea');


// =======================================
// Helper: format Mongo _id → id
// =======================================
const formatIdea = (idea) => {
  const ideaObj = idea.toObject();

  ideaObj.id = ideaObj._id.toString();

  // 🔥 FIX: convert founderId properly
  if (ideaObj.founderId) {
    ideaObj.founderId = ideaObj.founderId.toString();
  }

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
    });

    // 🔥 Populate founder after create
    const populatedIdea = await Idea.findById(newIdea._id)
      .populate("founderId", "name profilePictureUrl headline");

    return res.status(201).json({
      success: true,
      idea: formatIdea(populatedIdea)
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

    const ideas = await Idea.find(query)
      .populate("founderId", "name profilePictureUrl headline")
      .sort({ postedDate: -1 });

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
    const idea = await Idea.findById(req.params.id)
      .populate("founderId", "name profilePictureUrl headline");

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

    if (idea.founderId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    Object.assign(idea, req.body);

    await idea.save();

    const populatedIdea = await Idea.findById(idea._id)
      .populate("founderId", "name profilePictureUrl headline");

    return res.json({
      success: true,
      idea: formatIdea(populatedIdea)
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