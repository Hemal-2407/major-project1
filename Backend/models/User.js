const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true, 
    trim:true// ✅ auto fix case issue
  },
  phone: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  otp:{
    otp:String,
    otpExpire:Date
  },
    // 🔐 Add this
  resetToken: String,
  tokenExpiry: Date
});

module.exports = mongoose.model("User", userSchema);