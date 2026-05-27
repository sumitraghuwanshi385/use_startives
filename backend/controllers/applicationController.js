const Application = require('../models/Application');
const Idea = require('../models/Idea');
const Notification = require('../models/Notification');
const User = require('../models/User');
const sendEmail = require('../utils/sendMail');


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
    });

    // 🔔 NOTIFY FOUNDER (NOT APPLICANT)
    const idea = await Idea.findById(ideaId);

    if (idea && idea.founderId) {
      const position = idea.positions.find(
        (p) => p._id.toString() === positionId
      );

      await Notification.create({
        receiver: idea.founderId,
        sender: req.user._id,
        type: 'APPLICATION',
        status: 'PENDING',
        title: 'New Application',
        message: `${req.user.name} applied`,
        ideaId: idea._id,
        ideaTitle: idea.title,
        positionId: positionId,
        positionTitle: position ? position.title : '',
        groupKey: `application_apply_${application._id}`,
      });

      // ✅ EMAIL NOTIFICATION
      const founder = await User.findById(idea.founderId);

      await sendEmail(
        founder.email,
        "New Project Application",
        `${req.user.name} applied to your project "${idea.title}"`
      );
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
    let { status } = req.body;

    console.log("🔥 STATUS RECEIVED:", status);

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status required",
      });
    }

    // 🔥 Convert to UPPERCASE to match model enum
    status = status.toUpperCase();

    if (!["PENDING", "ACCEPTED", "REJECTED", "REVIEWED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    // Find application
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Find idea separately
    const idea = await Idea.findById(application.ideaId);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    // Founder authorization check
    if (idea.founderId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Update status
    application.status = status;
    await application.save();

    // Find position safely
    const position = idea.positions?.find(
      (p) => p._id.toString() === application.positionId.toString()
    );

    // Create notification for applicant
    await Notification.create({
      receiver: application.applicantId,
      sender: req.user._id,
      type: "APPLICATION",
      status: status,
      title: "Application Update",
      message:
        status === "ACCEPTED"
          ? `Congratulations! You have been selected for ${position?.title || "the role"} in ${idea.title}`
          : `Your application for ${position?.title || "the role"} in ${idea.title} was not selected`,
      ideaId: idea._id,
      ideaTitle: idea.title,
      positionId: application.positionId,
      positionTitle: position ? position.title : "",
      groupKey: `application_status_${application._id}`,
    });

    // ✅ EMAIL NOTIFICATION
    const applicant = await User.findById(application.applicantId);

    await sendEmail(
      applicant.email,
      status === "ACCEPTED"
        ? "Application Accepted 🚀"
        : "Application Update",
      status === "ACCEPTED"
        ? `You were accepted for ${position?.title || "the role"} in ${idea.title}`
        : `Your application was updated for ${idea.title}`
    );

    res.json({
      success: true,
      application,
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
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