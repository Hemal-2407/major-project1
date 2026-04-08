const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require('multer');
const path = require('path');

// Configure how files are stored
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists!
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique name
  }
});

const upload = multer({ storage: storage });

// ➕ ADD PRODUCT (Updated for Taasa Architectural Specs)
// ➕ ADD PRODUCT (Fixed URL and added Image Support)
// Note: Changed from "/add" to "/" to match your frontend request
router.post("/add", upload.any(), async (req, res) => {
  try {
    const productData = { ...req.body };

    // 1. Parse variants (sent as JSON string from Frontend)
    if (req.body.variants) {
      productData.variants = JSON.parse(req.body.variants);
    }

    // 2. Handle uploaded files (Main image and Variant images)
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        if (file.fieldname === "image") {
          productData.image = file.filename;
        } else if (file.fieldname.startsWith("variantImage_")) {
          const index = parseInt(file.fieldname.split("_")[1]);
          if (productData.variants && productData.variants[index]) {
            productData.variants[index].shadeImage = file.filename;
          }
        }
      });
    }

    const product = new Product(productData);
    await product.save();

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// 📥 GET ALL PRODUCTS (With full category nesting)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate({
      path: "category",
      populate: {
        path: "parentCategory"
      }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔍 GET SINGLE PRODUCT BY ID (For the Details Page)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: "category",
      populate: {
        path: "parentCategory"
      }
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: "Invalid Product ID" });
    }
    res.status(500).json({ error: error.message });
  }
});

// Route to update a specific product by ID
router.patch("/:id", upload.any(), async (req, res) => {
    try {
        const updateData = { ...req.body };

        // 1. Parse variants back into an array (since FormData sends them as a string)
        if (req.body.variants) {
            updateData.variants = JSON.parse(req.body.variants);
        }

        // 2. Handle all uploaded files
        if (req.files && req.files.length > 0) {
            req.files.forEach((file) => {
                if (file.fieldname === "image") {
                    // This is the main product image
                    updateData.image = file.filename;
                } else if (file.fieldname.startsWith("variantImage_")) {
                    // This is a variant image
                    // Extract the index from the name (e.g., "variantImage_0" -> 0)
                    const index = parseInt(file.fieldname.split("_")[1]);
                    
                    if (updateData.variants && updateData.variants[index]) {
                        updateData.variants[index].shadeImage = file.filename;
                    }
                }
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

module.exports = router;