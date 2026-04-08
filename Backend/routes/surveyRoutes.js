// const express = require("express");
// const router = express.Router();
// const Survey = require("../models/Survey");

// // POST: Save a new survey request (From Product Detail Page)
// router.post("/", async (req, res) => {
//   try {
//     const newSurvey = new Survey(req.body);
//     const savedSurvey = await newSurvey.save();
//     res.status(201).json(savedSurvey);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // GET: Fetch all survey requests (For Admin Panel)
// router.get("/", async (req, res) => {
//   try {
//     const surveys = await Survey.find().sort({ createdAt: -1 });
//     res.json(surveys);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // DELETE: Remove a survey (For Admin Panel)
// router.delete("/:id", async (req, res) => {
//   try {
//     await Survey.findByIdAndDelete(req.params.id);
//     res.json({ message: "Survey deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createSurvey,
  getAllSurveys,
  updateSurveyStatus,
  deleteSurvey
} = require("../controllers/surveyController");

// Basic routes
router.route("/")
  .post(createSurvey)
  .get(getAllSurveys);

// ID specific routes
router.route("/:id")
  .put(updateSurveyStatus)
  .delete(deleteSurvey);

module.exports = router;