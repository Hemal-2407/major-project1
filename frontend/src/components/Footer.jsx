import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div>
          <h3>FurniShop</h3>
          <p>Modern furniture & UPVC solutions for your home.</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <p>Home</p>
          <p>About</p>
          <p>Products</p>
          <p>Contact</p>
        </div>

        <div>
          <h4>Contact</h4>
          <p>📍 Ahmedabad, India</p>
          <p>📞 +91 9876543210</p>
          <p>📧 info@furnishop.com</p>
        </div>

      </div>

      <p className="copyright">
        © 2026 FurniShop | All Rights Reserved
      </p>
    </footer>
  );
}