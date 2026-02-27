const Application = require('../models/Application');
const Idea = require('../models/Idea');

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
// GET /api/applications/received
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
// GET /api/applications/sent
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
// PUT /api/applications/:id/status
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
if (application.ideaId.founderId.toString() !== req.user._id.toString()) {  
  return res.status(403).json({  
    success: false,  
    message: 'Not authorized',  
  });  
}  

application.status = status;  
await application.save();  

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