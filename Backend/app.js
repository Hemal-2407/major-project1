const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/images",express.static(path.join(__dirname,"uploads")));
//auth
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/categories",categoryRoutes);
// app.use("/api/categories/nested",categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/surveys",surveyRoutes);
app.use("/api/admin",adminRoutes);

app.get("/home",(req,res)=>{
    res.send("TASAupvc Furniture Website.");
});

//MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected...");

    app.listen(5000, ()=>{
        console.log("Server is running on port 5000");
    });
}).catch((err)=>{
    console.log(err);
});