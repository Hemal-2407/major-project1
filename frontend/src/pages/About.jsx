import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Us</h1>
        <p>We deliver premium UPVC furniture and modern interior solutions</p>
      </section>

      {/* About Content */}
  
    <section className="about-section">

      {/* LEFT TEXT */}
      <div className="about-text">
        <h1 className="fade-in">About Our Company</h1>

        <p className="slide-up">
Established back in 2010, TAASA Industries" has emerged as a prominent name in the realm of PVC products. As a dedicated manufacturer and service provider, we specialize in a comprehensive range of PVC offerings. From PVC doors, TV cabinets, and Maliya, to office furniture, modular PVC kitchens, ceiling and wall paneling, and sliding wardrobe cabinets. and an array of PVC furniture, we cover it all. Our products stand out not only for their quality but also for their competitive pricing. At the core of our operations lies a team of seasoned experts who ensure that every product that leaves our facility meets stringent quality standards. This dedication to quality is further reflected in the international acceptance of our products.
        </p><br></br>

        <p className="slide-up delay">
          Our Journey of success wouldn't be complete without acknowledging the pivotal role played by Mr. Ravi Khoyani His unwavering support and guidance have propelled us towards unprecedented growth in the present market landscape. We're dedicated to quality. Our products go through strict checks at every stage of production. We stay updated with market trends through research, ensuring our range meets demands and holds value. Each finished product is tested thoroughly, earning us great client appreciation for our diverse collection.
       </p><br></br>

        <button className="about-btn">Explore More</button>
      </div><br></br>

      {/* RIGHT IMAGE */}
      <div className="about-image">
        <img src="https://www.taasaupvcprofile.com/images/about_3.jpg" />
      </div>

    </section>
 

      {/* Features */}
      <section className="features">
        <h2>Why Choose Us</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>✔ Premium Quality</h3>
            <p>We use top-grade materials for long-lasting durability.</p>
          </div>
          <div className="feature-card">
            <h3>✔ Modern Design</h3>
            <p>Stylish and innovative designs for modern homes.</p>
          </div>
          <div className="feature-card">
            <h3>✔ Affordable Price</h3>
            <p>Best value products at competitive pricing.</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery">
        <h2>Our Work</h2>
        <div className="gallery-grid">
          <img src="https://images.unsplash.com/photo-1582582621959-48d27397dc69" />
          <img src="https://images.unsplash.com/photo-1505691938895-1758d7feb511" />
          <img src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf" />
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <p>© 2026 FurniShop | All Rights Reserved</p>
      </footer>
    </div>
  );
}

