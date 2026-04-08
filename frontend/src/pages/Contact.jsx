import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact">

      {/* Hero Section */}
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>We would love to hear from you. Get in touch with us!</p>
      </div>

      {/* Main Section */}
      <div className="contact-container">

        {/* Left - Contact Info */}
        <div className="contact-info">
          <h2>Get in Touch</h2>

          <p><strong>Address:</strong>06-Bileshwar industrial Estate,Opp. G.V.M.M., nr.Octroi Naka,Odhav,Ahemdabad-382415.</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Email:</strong> info@taasaupvsprofile.com</p>
          <p><strong>Working Hours:</strong> Mon - Sat (9 AM - 6 PM)</p>

          <div className="socials">
            <span>🌐</span>
            <span>📘</span>
            <span>📷</span>
          </div>
        </div>

        {/* Right - Form */}
        <div className="contact-form">
          <h2>Send Message</h2>

          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
                   <input type="number" placeholder="Phone number" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message" rows="5"></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>

      </div>

    </section>
  );
}