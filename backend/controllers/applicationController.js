const Application = require('../models/Application');
const Idea = require('../models/Idea');

// POST /api/applications
const createApplication = async (req, res) => {
  try {
    const { ideaId, positionId, answers } = req.body;

    const application = await Application.create({
      ideaId,
      positionId,
      applicantId: req.user._id,
      answers,
    });

    res.status(201).json({ success: true, application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/applications/received
const getReceivedApplications = async (req, res) => {
  try {
    const ideas = await Idea.find({ founderId: req.user._id });
    const ideaIds = ideas.map(i => i._id);

    const applications = await Application.find({
      ideaId: { $in: ideaIds },
    }).populate('applicantId', 'name email profilePictureUrl');

    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createApplication, getReceivedApplications };