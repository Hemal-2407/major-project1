const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendAdminLoginAlert } = require("../utils/emailHelper"); // Import the helper

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Verify Admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // 2. Verify Password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // 3. Send Email Notification (Security Alert)
    // We wrap this in a try-catch so a mail failure doesn't stop the login
    try {
      await sendAdminLoginAlert(admin.email);
      console.log(`Login alert sent to ${admin.email}`);
    } catch (mailErr) {
      console.error("Mail Alert Failed:", mailErr.message);
    }

    // 4. Generate JWT Token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5. Send Response to Frontend
    res.json({ 
      token, 
      message: "Authentication successful" 
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};