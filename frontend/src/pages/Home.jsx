import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
   const navigate = useNavigate();
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div>
          <h1>Modern Furniture Collection</h1>
          <p>Upgrade your home with stylish furniture</p>
          <button>Shop Now</button>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <h2>Categories</h2>
        <div className="grid">
          <div className="card">
            <img src="https://images.unsplash.com/photo-1615874959474-d609969a20ed" />
            <h3>Living Room</h3>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1505691938895-1758d7feb511" />
            <h3>Bedroom</h3>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf" />
            <h3>Office</h3>
          </div>
        
        </div>
      </section>

      {/* Products */}
      <section className="section">
        <h2>Our Product</h2>
        <div className="grid">
          <div className="card">
            <img src="https://www.taasaupvcprofile.com/sub-images/tsp-5007.jpg" />
            <h3>The platinum collection</h3>
            <p>₹25,000</p>
            <button>Add to Cart</button>
          </div>

          <div className="card">
            <img src="https://www.taasaupvcprofile.com/sub-images/ts-107.jpg" />
            <h3>The regular collections</h3>
            <p>₹15,000</p>
            <button>Add to Cart</button>
          </div>

          <div className="card">
            <img src="https://www.taasaupvcprofile.com/sub-images/twl-1202-small.jpg" />
            <h3>Wpc & PVC </h3>
            <p>₹5,000</p>
            <button>Add to Cart</button>
          </div>
           <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={() => navigate("/products")}>
            View All Products →
          </button>
        </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section trust">
        <div>
          <h3>🚚 Free Delivery</h3>
          <p>On all orders</p>
        </div>

        <div>
          <h3>🔄 Easy Returns</h3>
          <p>7 days return policy</p>
        </div>

        <div>
          <h3>⭐ Top Quality</h3>
          <p>Best materials used</p>
        </div>
      </section>

      <Footer />
    </>
  );
}