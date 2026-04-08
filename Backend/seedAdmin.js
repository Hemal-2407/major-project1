const mongoose = require("mongoose");
const Admin = require("./models/Admin"); 
require("dotenv").config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Use the email defined in your .env
    const adminEmail = process.env.ADMIN_RECEIVER; 

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log(`Admin (${adminEmail}) already exists!`);
      process.exit();
    }

    const admin = new Admin({
      email: adminEmail,
      password: "admin@123" // This will be hashed by your Admin model's .pre('save') hook
    });

    await admin.save();
    console.log(`✅ Admin created successfully: ${adminEmail}`);
    process.exit();
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
};

seedAdmin();