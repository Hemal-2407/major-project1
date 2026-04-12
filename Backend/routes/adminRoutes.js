const express = require("express");
const router = express.Router();
const { adminLogin } = require("../controllers/adminController");

router.post("/login", adminLogin);
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;