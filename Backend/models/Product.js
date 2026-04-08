const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false
  },
  // --- NEW FIELDS ADDED HERE ---
  unitType: { 
    type: String, 
    enum: ['sqft', 'rft'], 
    default: 'sqft' 
  },
  basePrice: { 
    type: Number, 
    default: 0 
  },
  variants: [
    {
      shadeName: String,
      shadeImage: String,
      hexCode: String
    }
  ],
  // -----------------------------
  features: [
    {
      type: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);