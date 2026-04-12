// src/pages/CategoryPage.jsx
// This single component renders ANY category dynamically.
// Admin adds "uPVC Fencing" → /products/upvc-fencing works instantly.

import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCategories } from "../context/CategoryContext";
import Navbar  from "../components/Navbar";
import Footer  from "../components/Footer";
import { ArrowUpRight, ChevronRight, ZoomIn } from "lucide-react";

export default function CategoryPage({ categorySlug }) {
  // Works both as a prop (from App.js) OR reads from URL params
  const { slug } = useParams();
  const resolvedSlug = categorySlug || slug;

  const { getCategoryBySlug } = useCategories();
  const category = getCategoryBySlug(resolvedSlug);

  const [activeFilter, setActiveFilter] = useState("all");
  const [lightbox,     setLightbox]     = useState(null);

  // If category doesn't exist → redirect home
  if (!category) return <Navigate to="/" replace />;

  const filtered = activeFilter === "all"
    ? category.products
    : category.products.filter(p => p.type === activeFilter);

  // Get unique product types for filter tabs
  const types = ["all", ...new Set(category.products.map(p => p.type))];

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ position: "relative", height: 420, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <motion.img
          initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.2 }}
          src={category.heroImage}
          alt={category.name}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg,rgba(10,8,4,.9) 0%,rgba(10,8,4,.5) 60%,rgba(10,8,4,.2) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${category.badgeColor},#E8B84B,${category.badgeColor})` }} />

        <div style={{ position: "relative", zIndex: 10, padding: "0 4rem 3.5rem" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: ".4rem", marginBottom: "1rem" }}>
            {[{ l: "Home", h: "/" }, { l: "Products", h: "/products" }, { l: category.name }].map((b, i, arr) => (
              <React.Fragment key={b.l}>
                {b.h
                  ? <a href={b.h} style={{ fontSize: ".7rem", color: "rgba(255,255,255,.5)" }}>{b.l}</a>
                  : <span style={{ fontSize: ".7rem", color: "#E8B84B" }}>{b.l}</span>}
                {i < arr.length - 1 && <ChevronRight size={11} color="rgba(255,255,255,.3)" />}
              </React.Fragment>
            ))}
          </div>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: ".7rem", background: "rgba(196,145,56,.15)", border: "1px solid rgba(196,145,56,.3)", padding: ".35rem 1rem", borderRadius: 30, marginBottom: "1.2rem" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: category.badgeColor, display: "inline-block" }} />
            <span style={{ fontSize: ".64rem", letterSpacing: ".3em", color: "#E8B84B", textTransform: "uppercase", fontWeight: 600 }}>
              {category.badge} · TAASA Industries
            </span>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .9 }}
            style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 500, color: "#fff", lineHeight: 1.08, marginBottom: ".8rem" }}>
            {category.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55 }}
            style={{ fontSize: "clamp(.85rem,1.2vw,1rem)", color: "rgba(255,255,255,.6)", maxWidth: 520, lineHeight: 1.85, fontWeight: 300 }}>
            {category.description}
          </motion.p>
        </div>
      </section>

      {/* ── Feature Tags ── */}
      <div style={{ background: "#1A1A2E", padding: "1rem 4rem", display: "flex", gap: ".8rem", flexWrap: "wrap", alignItems: "center" }}>
        {category.features.map(f => (
          <span key={f} style={{ fontSize: ".68rem", letterSpacing: ".12em", color: "#E8B84B", background: "rgba(196,145,56,.12)", padding: ".3rem .9rem", borderRadius: 20, textTransform: "uppercase", fontWeight: 600 }}>
            ✓ {f}
          </span>
        ))}
        <div style={{ marginLeft: "auto" }}>
          <a href="#inquiry" style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", fontSize: ".72rem", color: "#E8B84B", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" }}>
            Request Quote <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      {/* ── Products Grid ── */}
      <section style={{ background: "#fff", padding: "5rem 4rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 500, color: "#1A1A2E" }}>
              {category.products.length > 0 ? "Available Products" : "Products Coming Soon"}
            </h2>

            {/* Filter tabs */}
            <div style={{ display: "flex", gap: ".5rem" }}>
              {types.map(t => (
                <button key={t} onClick={() => setActiveFilter(t)}
                  style={{
                    padding: ".45rem 1.2rem", borderRadius: 30, cursor: "pointer",
                    fontSize: ".72rem", letterSpacing: ".1em", textTransform: "capitalize", fontWeight: 600,
                    border: activeFilter === t ? "none" : "1.5px solid #e0e0e0",
                    background: activeFilter === t ? `linear-gradient(135deg,#C49138,#E8B84B)` : "#fff",
                    color: activeFilter === t ? "#fff" : "#888",
                    boxShadow: activeFilter === t ? "0 4px 14px rgba(196,145,56,.35)" : "none",
                    transition: "all .3s",
                  }}>
                  {t === "all" ? "All Products" : t}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem 2rem", color: "#aaa" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📦</div>
              <p style={{ fontSize: "1.1rem" }}>No products yet in this category.</p>
              <p style={{ fontSize: ".88rem", marginTop: ".5rem" }}>Admin can add products from the Admin Panel.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.4rem" }}>
              {filtered.map((product, i) => (
                <motion.div key={product.id}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * .06 }}
                  onClick={() => setLightbox(product)}
                  style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,.08)", border: "1px solid rgba(196,145,56,.12)", cursor: "pointer", transition: "transform .35s, box-shadow .35s" }}
                  whileHover={{ y: -7, boxShadow: "0 20px 48px rgba(0,0,0,.13)" }}>
                  {/* Image */}
                  <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
                    <motion.img whileHover={{ scale: 1.08 }} transition={{ duration: .6 }}
                      src={product.img} alt={product.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    {/* Colour dot overlay */}
                    <div style={{ position: "absolute", top: ".8rem", left: ".8rem", width: 22, height: 22, borderRadius: "50%", background: product.color, border: "2px solid rgba(255,255,255,.8)", boxShadow: "0 2px 8px rgba(0,0,0,.2)" }} />
                    {/* In Stock badge */}
                    {product.inStock !== undefined && (
                      <div style={{ position: "absolute", top: ".8rem", right: ".8rem", background: product.inStock ? "rgba(34,197,94,.85)" : "rgba(239,68,68,.85)", padding: ".2rem .65rem", borderRadius: 20 }}>
                        <span style={{ fontSize: ".52rem", color: "#fff", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                    )}
                    {/* Hover zoom icon */}
                    <div style={{ position: "absolute", inset: 0, background: "rgba(10,8,4,0)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .3s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(10,8,4,.3)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(10,8,4,0)"}>
                      <ZoomIn size={22} color="#fff" style={{ opacity: 0, transition: "opacity .3s" }} />
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: ".9rem 1.1rem 1.1rem" }}>
                    <div style={{ fontSize: ".68rem", letterSpacing: ".12em", color: "#C49138", textTransform: "uppercase", fontWeight: 600, marginBottom: ".2rem" }}>
                      {product.code}
                    </div>
                    <div style={{ fontSize: ".9rem", fontWeight: 600, color: "#1A1A2E", marginBottom: ".4rem" }}>{product.name}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: ".72rem", color: "#aaa" }}>{product.thickness && `Thickness: ${product.thickness}`}</span>
                      <span style={{ fontSize: ".65rem", background: "rgba(196,145,56,.1)", color: "#C49138", padding: ".2rem .6rem", borderRadius: 20, fontWeight: 600, textTransform: "capitalize" }}>
                        {product.type}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Inquiry CTA ── */}
      <section id="inquiry" style={{ background: "linear-gradient(135deg,#1A1A2E,#16213E)", padding: "4rem" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff", marginBottom: "1rem" }}>
            Interested in <em style={{ color: "#E8B84B" }}>{category.name}?</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: ".95rem", lineHeight: 1.8, marginBottom: "2rem" }}>
            Contact our team for pricing, customisation options, and bulk order enquiries.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:+918511232318" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9rem 2.2rem", background: "linear-gradient(135deg,#C49138,#E8B84B)", color: "#fff", borderRadius: 4, fontSize: ".78rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", textDecoration: "none" }}>
              📞 Call Now
            </a>
            <a href="mailto:info@taasaupvc.com" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9rem 2.2rem", border: "1.5px solid rgba(255,255,255,.3)", color: "#fff", borderRadius: 4, fontSize: ".78rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", textDecoration: "none" }}>
              ✉️ Email Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}