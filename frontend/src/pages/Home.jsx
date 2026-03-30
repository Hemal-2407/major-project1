import React from "react";
import "./Home.css";

function Home() {
  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="logo">FurniShop</div>
        <nav>
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">Categories</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>

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
            <img src="https://images.unsplash.com/photo-1615874959474-d609969a20ed" alt="" />
            <h3>Living Room</h3>
          </div>
          <div className="card">
            <img src="https://images.unsplash.com/photo-1505691938895-1758d7feb511" alt="" />
            <h3>Bedroom</h3>
          </div>
          <div className="card">
            <img src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf" alt="" />
            <h3>Office</h3>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section">
        <h2>Featured Products</h2>
        <div className="grid">
          <div className="card">
            <img src="https://images.unsplash.com/photo-1582582621959-48d27397dc69" alt="" />
            <h3>Sofa Set</h3>
            <p>₹25,000</p>
            <button>Add to Cart</button>
          </div>
          <div className="card">
            <img src="https://images.unsplash.com/photo-1567016549631-3e2d2c2f9b74" alt="" />
            <h3>Dining Table</h3>
            <p>₹15,000</p>
            <button>Add to Cart</button>
          </div>
          <div className="card">
            <img src="https://images.unsplash.com/photo-1598300056203-3f9a9d9b8f7b" alt="" />
            <h3>Office Chair</h3>
            <p>₹5,000</p>
            <button>Add to Cart</button>
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

      {/* Footer */}
      <footer>
        <p>© 2026 FurniShop | All Rights Reserved</p>
      </footer>
    </div>
  );
}
export default Home;