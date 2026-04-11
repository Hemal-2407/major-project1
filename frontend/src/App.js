import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
//import Login from "./pages/admin/Login"; // New: Import your login page
import AdminDashboard from "./pages/AdminDashboard";
import AdminProductList from "./pages/AdminProductList";
import CategoryManager from "./pages/CategoryManager";
import AdminSurveyManager from "./pages/AdminSurveyManager";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


// --- PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  // If no token, redirect to login instead of showing a blank admin page
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* --- PUBLIC ROUTES (With Navbar & Footer) --- */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <div className="min-h-screen">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  {/* Public Login Route */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password/:token" element={<ResetPassword />} />
                </Routes>
              </div>
              <Footer />
            </>
          }
        />

        {/* --- ADMIN ROUTES (Protected with Sidebar) --- */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />
                <main className="flex-1 ml-64 p-8">
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProductList />} />
                    <Route path="categories" element={<CategoryManager />} />
                    <Route path="surveys" element={<AdminSurveyManager />} />
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;