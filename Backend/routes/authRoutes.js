const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const axios = require("axios");
const jwt = require("jsonwebtoken");

//get all user
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(users, null, 2)); // 🔥 formatting

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
///get single user
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//update
router.put("/users/:id", async (req, res) => {
  try {
    const { name, contact } = req.body;

    let updateData = {};

    if (name) updateData.name = name;

    if (contact) {
      if (contact.includes("@")) {
        updateData.email = contact;
        updateData.phone = null;
      } else {
        updateData.phone = contact;
        updateData.email = null;
      }
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated", user });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


//delete
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

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
// ================= SEND EMAIL =================
    if (email) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Taasa uPVC" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Welcome to Taasa uPVC 🎉",
        html: `
          <div style="font-family:sans-serif;">
            <h2 style="color:#f59e0b;">Welcome ${name} 👋</h2>
            <p>Thank you for registering at <b>Taasa uPVC</b>.</p>
            <p>Your account has been created successfully.</p>
            <br/>
            <p>We are excited to have you with us!</p>
          </div>
        `,
      });
    }


    res.json({ message: "Registered Successfully & Email sent" });

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

    contact = contact.toLowerCase().trim();

    const user = await User.findOne({
      $or: [{ email: contact }, { phone: contact }]
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = require("crypto").randomBytes(32).toString("hex");

    // 🔥 IMPORTANT: overwrite token
    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 60 * 60 * 1000; // 1 hour

    await user.save();

    console.log("TOKEN SAVED:", token);

    const link = `http://localhost:3000/reset-password/${token}`;

    res.json({ link });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});
// ================= RESET PASSWORD =================
router.post("/reset-password/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const { password } = req.body;

    console.log("TOKEN FROM URL:", token);

    const user = await User.findOne({
      resetToken: token
    });

    console.log("USER FOUND:", user);

    if (!user) {
      return res.status(400).json({
        message: "Invalid token"
      });
    }

    // ❗ check expiry separately
    if (user.resetTokenExpire < Date.now()) {
      return res.status(400).json({
        message: "Token expired"
      });
    }

    const bcrypt = require("bcryptjs");
    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;
    user.resetToken = null;
    user.resetTokenExpire = null;

    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;