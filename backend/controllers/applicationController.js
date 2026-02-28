const Application = require('../models/Application');
const Idea = require('../models/Idea');
const Notification = require('../models/Notification');


// ✅ CREATE APPLICATION
// POST /api/applications
const createApplication = async (req, res) => {
  try {
    const { ideaId, positionId, coverLetter, answers } = req.body;

    if (!ideaId || !positionId || !coverLetter) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Prevent duplicate apply
    const existing = await Application.findOne({
      ideaId,
      positionId,
      applicantId: req.user._id,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You already applied for this position',
      });
    }

    const application = await Application.create({
      ideaId,
      positionId,
      applicantId: req.user._id,
      coverLetter,
      answers,
      status: "PENDING",
    });

    // 🔔 NOTIFY FOUNDER (NOT APPLICANT)
    const idea = await Idea.findById(ideaId);

    if (idea && idea.founderId) {
      const position = idea.positions.find(
        (p) => p._id.toString() === positionId
      );

      await Notification.create({
        receiver: idea.founderId,   // ✅ Founder gets notification
        sender: req.user._id,
        type: 'APPLICATION',
        title: 'New Application',
        message: `${req.user.name} applied`,
        ideaId: idea._id,
        ideaTitle: idea.title,
        positionId: positionId,
        positionTitle: position ? position.title : '',
        status: "PENDING",
        groupKey: `application_${ideaId}`,
      });
    }

    res.status(201).json({
      success: true,
      application,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ✅ GET RECEIVED APPLICATIONS (Founder)
const getReceivedApplications = async (req, res) => {
  try {
    const ideas = await Idea.find({ founderId: req.user._id });
    const ideaIds = ideas.map(i => i._id);

    const applications = await Application.find({
      ideaId: { $in: ideaIds },
    })
      .populate('applicantId', 'name email profilePictureUrl headline')
      .populate('ideaId', 'title');

    res.json({
      success: true,
      applications,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ✅ GET SENT APPLICATIONS (Applicant)
const getSentApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicantId: req.user._id,
    })
      .populate('ideaId', 'title founderId')
      .populate('applicantId', 'name email profilePictureUrl');

    res.json({
      success: true,
      applications,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ✅ UPDATE STATUS (Founder)
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id)
      .populate('ideaId');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    // Only founder can update
    if (
      application.ideaId.founderId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    application.status = status;
    await application.save();

    const idea = application.ideaId;

    const position = idea.positions.find(
      (p) => p._id.toString() === application.positionId.toString()
    );

    // 🔔 NOTIFY APPLICANT ABOUT STATUS CHANGE
    await Notification.create({
      receiver: application.applicantId,   // ✅ Applicant gets update
      sender: req.user._id,
      type: 'APPLICATION',
      title: 'Application Update',
      message: `Your application was ${status}`,
      ideaId: idea._id,
      ideaTitle: idea.title,
      positionId: application.positionId,
      positionTitle: position ? position.title : '',
      status: status,   // ✅ CRITICAL
      groupKey: `application_${idea._id}`,
    });

    res.json({
      success: true,
      application,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  createApplication,
  getReceivedApplications,
  getSentApplications,
  updateApplicationStatus,
};