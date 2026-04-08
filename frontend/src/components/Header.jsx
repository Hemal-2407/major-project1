import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";


export default function Header() {
  return (
    <header className="header">
      <div className="logo">FurniShop</div>

      <nav className="nav">
        <Link to="Home.jsx">Home</Link>
         <Link to="/product">product</Link>
        <Link to="/about">About</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div className="icons">
        <span>🔍</span>
        <span>🛒</span>
      </div>
    </header>
  );
}