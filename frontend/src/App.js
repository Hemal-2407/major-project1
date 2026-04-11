import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import PlatinumCollection from "./pages/PlatinumCollection";
import UPVDoors from "./pages/UPVDoors";
import Login from "./pages/admin/Login"; // New: Import your login page
import AdminDashboard from "./pages/AdminDashboard";
import AdminProductList from "./pages/AdminProductList";
import CategoryManager from "./pages/CategoryManager";
import AdminSurveyManager from "./pages/AdminSurveyManager";
// import HollowDoors from "./pages/HollowDoors";
// import { CategoryProvider, useCategories } from "./context/CategoryContext";
// import CategoryPage     from "./pages/CategoryPage";

// --- PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  // If no token, redirect to login instead of showing a blank admin page
  return token ? children : <Navigate to="/login" replace />;
};

// const DynamicCategoryRoutes = () => {
//   const { categories } = useCategories();

//   return (
//     <>
//       {categories.map(category => (
//         <Route
//           key={category.slug}
//           path={`/products/${category.slug}`}
//           element={<CategoryPage categorySlug={category.slug} />}
//         />
//       ))}
//     </>
//   );
// };


function App() {
  return (
    // <CategoryProvider>
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
                  <Route path="/PlatinumCollection" element={<PlatinumCollection />} />
                  <Route path="/doors" element={<UPVDoors/>}/>
                  {/* <Route path="hollowdoor" element={<HollowDoors/>}/> */}
                  {/* <DynamicCategoryRoutes /> */}

                  {/* ── Old URLs redirect to new structure ── */}
                  {/* <Route path="/platinum-collection" element={<Navigate to="/products/platinum-collection" replace />} />
                  <Route path="/regular-collection"  element={<Navigate to="/products/regular-collection"  replace />} />
                  <Route path="/wpc-pvc-louvers"     element={<Navigate to="/products/wpc-pvc-louvers"     replace />} /> */}

                  
                  
          {/* ── 404 ── */}
          <Route path="*" element={<Navigate to="/" replace />} />
                  {/* Public Login Route */}
                  <Route path="/login" element={<Login />} />
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
  //   </CategoryProvider>
  );
}

export default App;