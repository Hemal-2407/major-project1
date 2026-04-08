// const Survey = require("../models/Survey");
// const sendSurveyAlert = require("../utils/emailHelper");

// @desc    Create a new survey request
// @route   POST /api/surveys
// exports.createSurvey = async (req, res) => {
//   try {
//     const newSurvey = new Survey(req.body);
//     const savedSurvey = await newSurvey.save();
//     res.status(201).json(savedSurvey);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

const Survey = require("../models/Survey");
// 1. IMPORT the helper you just created
const sendSurveyAlert = require("../utils/emailHelper"); 

exports.createSurvey = async (req, res) => {
  try {
    const newSurvey = new Survey(req.body);
    const savedSurvey = await newSurvey.save();
    
    // 2. TRIGGER the email function
    console.log("🚀 Survey saved. Attempting to send alert...");
    
    // We wrap this in a try-catch so the user still gets a 201 
    // even if the email service has an issue.
    try {
        await sendSurveyAlert(savedSurvey);
        console.log("✅ Alert sent to Admin successfully!");
    } catch (mailError) {
        console.error("❌ Nodemailer failed:", mailError);
    }

    res.status(201).json(savedSurvey);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Get all surveys for Admin
// @route   GET /api/surveys
exports.getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 });
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update survey status (Pending/Done/Cancelled)
// @route   PUT /api/surveys/:id
exports.updateSurveyStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedSurvey = await Survey.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true, runValidators: true }
    );
    
    if (!updatedSurvey) {
      return res.status(404).json({ message: "Survey not found" });
    }
    
    res.json(updatedSurvey);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete a survey
// @route   DELETE /api/surveys/:id
exports.deleteSurvey = async (req, res) => {
  try {
    const deletedSurvey = await Survey.findByIdAndDelete(req.params.id);
    if (!deletedSurvey) {
      return res.status(404).json({ message: "Survey not found" });
    }
    res.json({ message: "Survey deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};