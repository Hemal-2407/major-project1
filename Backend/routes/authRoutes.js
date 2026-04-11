const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const axios = require("axios");
const jwt = require("jsonwebtoken");


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, contact, password } = req.body;

    if (!name || !contact || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    let email = null;
    let phone = null;

    if (validator.isEmail(contact)) {
      email = contact.toLowerCase().trim();
    } else if (validator.isMobilePhone(contact, "any")) {
      phone = contact.trim();
    } else {
      return res.status(400).json({ message: "Invalid Email or Phone" });
    }

    // check existing correctly
    let exist;
    if (email) {
      exist = await User.findOne({ email });
    } else {
      exist = await User.findOne({ phone });
    }

    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phone,
      password: hashed
    });

    await user.save();

    res.json({ message: "Registered Successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    let { contact, password } = req.body;

    // 🔥 normalize input
    contact = contact.toLowerCase().trim();

    console.log("LOGIN CONTACT:", contact);

    let user;

    if (contact.includes("@")) {
      user = await User.findOne({ email: contact });
    } else {
      user = await User.findOne({ phone: contact });
    }

    console.log("FOUND USER:", user);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    res.json({ message: "Login Successful" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// router.post("/forgot-password", async (req, res) => {
//   try {
//     let { contact } = req.body;

//     if (!contact) {
//       return res.status(400).json({ message: "Email required" });
//     }

//     contact = contact.toLowerCase().trim();

//     let user;

//     // find user by email or phone
//     if (contact.includes("@")) {
//       user = await User.findOne({ email: contact });
//     } else {
//       user = await User.findOne({ phone: contact });
//     }

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // generate token
//     const token = crypto.randomBytes(32).toString("hex");

//     user.resetToken = token;
//     user.resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 min
//     await user.save();

//     // email only if email exists
//     if (!user.email) {
//       return res.status(400).json({
//         message: "No email linked to this account",
//       });
//     }

//     const resetLink = `http://localhost:3000/reset-password/${token}`;

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "krishavaghasiya2409@gmail.com",
//         pass: "fozwwghfyyrgtjti",
//       },
//     });

//     await transporter.sendMail({
//       to: user.email,
//       subject: "Reset Password",
//       html: `
//         <h3>Password Reset</h3>
//         <p>Click below link to reset password</p>
//         <a href="${resetLink}">${resetLink}</a>
//       `,
//     });

//     res.json({
//       message: "Reset link generated",
//       link: resetLink
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

router.post("/forgot-password", async (req, res) => {
  try {
    let { contact } = req.body;

    const user = await User.findOne({ email: contact });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const crypto = require("crypto");
    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    console.log("RESET LINK:", resetLink); // DEBUG

    res.json({
      message: "Reset link generated",
      link: resetLink
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ================= RESET PASSWORD =================
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;