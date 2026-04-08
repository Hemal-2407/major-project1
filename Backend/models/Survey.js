const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  productName: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  preferredDate: { type: Date, required: true },
  status: { type: String, default: "Pending" }, // Pending, Done, Cancelled
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Survey", surveySchema);