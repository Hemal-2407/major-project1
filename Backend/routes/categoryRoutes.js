const express = require("express");
const router = express.Router();
const Category = require("../models/Category");


// ➕ CREATE CATEGORY
router.post("/add", async (req, res) => {
  try {
    const { name, parentCategory } = req.body;

    const category = new Category({
      name,
      parentCategory: parentCategory || null
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: "Category created",
      category
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 📥 GET ALL CATEGORIES
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().populate("parentCategory");

    res.json(categories);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/nested", async (req, res) => {
  try {
    const categories = await Category.find();

    // Separate main & sub
    const mainCategories = categories.filter(cat => !cat.parentCategory);

    const nested = mainCategories.map(main => {
      return {
        _id: main._id,
        name: main.name,
        subcategories: categories.filter(
          sub => sub.parentCategory && sub.parentCategory.toString() === main._id.toString()
        )
      };
    });

    res.json(nested);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id, 
      { name: req.body.name, parentCategory: req.body.parentCategory }, 
      { new: true }
    );
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Category removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;