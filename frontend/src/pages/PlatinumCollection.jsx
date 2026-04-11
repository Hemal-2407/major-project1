// ╔══════════════════════════════════════════════════════════════╗
// ║  TAASA INDUSTRIES — PlatinumCollection.jsx                   ║
// ║  Path: src/pages/PlatinumCollection.jsx                      ║
// ║                                                              ║
// ║  Sections:                                                   ║
// ║   1.  Navbar                                                 ║
// ║   2.  Hero Banner (page header with breadcrumb)              ║
// ║   3.  Collection Intro (text + feature badges)               ║
// ║   4.  Profile Swatches Grid (TSP codes with color preview)   ║
// ║   5.  Showcase Gallery (5 application images + lightbox)     ║
// ║   6.  Product Features (9 advantages grid)                   ║
// ║   7.  Why Platinum (comparison table vs Regular)             ║
// ║   8.  Inquiry / Quote Form                                   ║
// ║   9.  Related Products CTA                                   ║
// ║   10. Footer                                                 ║
// ╚══════════════════════════════════════════════════════════════╝

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, X, ZoomIn, ArrowUpRight, Phone, Mail,
  ShieldCheck, Droplets, Bug, Flame, Leaf, Zap, Star,
  Sparkles, Send, CheckCircle, Home, ChevronDown, Menu
} from "lucide-react";

/* ─── INLINE STYLES (no external CSS needed) ─────────────────────────────── */
const G = {
  gold:      "#C49138",
  goldLight: "#E8B84B",
  goldPale:  "#FDF6E3",
  goldPale2: "#FDF9F0",
  dark:      "#1A1A2E",
  white:     "#FFFFFF",
  cream:     "#F8F5EE",
  gray:      "#777788",
  border:    "rgba(196,145,56,0.15)",
  serif:     "'Playfair Display', Georgia, serif",
  sans:      "'Outfit', system-ui, sans-serif",
};

/* ─── Google Fonts ─────────────────────────────────────────────────────────── */
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Outfit', sans-serif; background: #fff; color: #1A1A2E; overflow-x: hidden; }
    ::selection { background: rgba(196,145,56,0.22); }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #f8f5ee; }
    ::-webkit-scrollbar-thumb { background: #C49138; border-radius: 2px; }
    img { display: block; max-width: 100%; }
    a { text-decoration: none; color: inherit; }

    @keyframes marqueeLeft { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    .mq-track { display:flex; animation: marqueeLeft 30s linear infinite; width:max-content; }
    .mq-track:hover { animation-play-state:paused; }

    @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    .float-badge { animation: floatY 4s ease-in-out infinite; }

    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    .btn-gold {
      background: linear-gradient(135deg, #C49138 0%, #E8B84B 50%, #C49138 100%);
      background-size: 200% auto;
      transition: background-position 0.5s ease, transform 0.2s, box-shadow 0.3s;
      box-shadow: 0 6px 20px rgba(196,145,56,0.35);
    }
    .btn-gold:hover { background-position: right center; transform: translateY(-2px); box-shadow: 0 10px 30px rgba(196,145,56,0.5); }

    .swatch-card { transition: transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s; cursor: pointer; }
    .swatch-card:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 20px 48px rgba(0,0,0,0.13); }
    .swatch-card:hover .swatch-zoom-icon { opacity: 1 !important; }

    .gallery-item { cursor: zoom-in; overflow: hidden; border-radius: 10px; position: relative; }
    .gallery-item img { transition: transform 0.6s cubic-bezier(0.23,1,0.32,1); width: 100%; height: 100%; object-fit: cover; }
    .gallery-item:hover img { transform: scale(1.07); }
    .gallery-overlay {
      position: absolute; inset: 0; background: rgba(20,16,8,0); display: flex;
      align-items: center; justify-content: center; transition: background 0.3s;
    }
    .gallery-item:hover .gallery-overlay { background: rgba(20,16,8,0.35); }
    .gallery-overlay svg { opacity: 0; transform: scale(0.8); transition: opacity 0.3s, transform 0.3s; color: #fff; }
    .gallery-item:hover .gallery-overlay svg { opacity: 1; transform: scale(1); }

    .feat-card { transition: transform 0.35s, box-shadow 0.35s; }
    .feat-card:hover { transform: translateY(-6px); box-shadow: 0 24px 52px rgba(0,0,0,0.1); }
    .feat-card:hover .feat-icon { background: linear-gradient(135deg,#C49138,#E8B84B) !important; box-shadow: 0 8px 24px rgba(196,145,56,0.4); }
    .feat-card:hover .feat-icon svg { color: #fff !important; }

    .form-input {
      width: 100%; padding: 0.88rem 1.1rem;
      border: 1.5px solid #e8e0d0; border-radius: 6px;
      font-family: 'Outfit', sans-serif; font-size: 0.88rem; color: #1A1A2E;
      background: #fff; outline: none; transition: border-color 0.3s, box-shadow 0.3s;
    }
    .form-input:focus { border-color: #C49138; box-shadow: 0 0 0 3px rgba(196,145,56,0.1); }
    .form-input::placeholder { color: #bbb; }

    .compare-row:hover { background: #fdf9f0 !important; }

    @media (max-width: 900px) {
      .two-col { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
      .three-col { grid-template-columns: 1fr 1fr !important; gap: 1.2rem !important; }
      .four-col { grid-template-columns: 1fr 1fr !important; gap: 1rem !important; }
      .hero-h1 { font-size: 2.8rem !important; }
    }
    @media (max-width: 580px) {
      .three-col, .four-col { grid-template-columns: 1fr !important; }
      .swatch-grid { grid-template-columns: repeat(3,1fr) !important; }
    }
  `}</style>
);

/* ─── FadeUp wrapper ───────────────────────────────────────────────────────── */
const FadeUp = ({ children, delay = 0, style = {} }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
    style={style}>
    {children}
  </motion.div>
);

/* ─── Section Label ────────────────────────────────────────────────────────── */
const SLabel = ({ children, center = false }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.9rem", justifyContent: center ? "center" : "flex-start" }}>
    <span style={{ display: "block", width: 26, height: 1.5, background: G.gold, flexShrink: 0 }} />
    <span style={{ fontSize: "0.66rem", letterSpacing: "0.4em", textTransform: "uppercase", color: G.gold, fontWeight: 600, fontFamily: G.sans }}>
      {children}
    </span>
  </div>
);

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
const SWATCHES = [
  {
    code: "TSP-5007", dark: false,
    // Bright white glossy kitchen cabinet panel
    img: "https://www.taasaupvcprofile.com/sub-images/platinum-collection01.jpg",
  },
  {
    code: "TSP-116", dark: false,
    // Clean matte white wardrobe / furniture panel
    img: "https://www.taasaupvcprofile.com/sub-images/platinum-collection02.jpg",
  },
  {
    code: "TSP-504",  dark: false,
    // Warm beige / sand-tone interior wall panel
    img: "https://www.taasaupvcprofile.com/sub-images/platinum-collection02.jpg",
  },
  {
    code: "TSP-506",  dark: false,
    // Cream-toned luxury interior finish
    img: "https://www.taasaupvcprofile.com/sub-images/platinum-collection03.jpg",
  },
  {
    code: "TSP-120",dark: false,
    // Light silver-gray modern panel / cabinet
    img: "https://www.taasaupvcprofile.com/sub-images/platinum-collection03.jpg",
  },
  {
    code: "TSP-503",  dark: true,
    // Mid ash gray furniture / wardrobe finish
    img: "https://www.taasaupvcprofile.com/sub-images/platinum-collection04.jpg",
  },
  {
    code: "TSP-115",  dark: true,
    // Dark charcoal modern kitchen or wardrobe
    img: "https://www.taasaupvcprofile.com/sub-images/platinum-collection04.jpg",
  },
  {
    code: "PINK TEX", name: "Pink Texture", color: "#D4A0A0", dark: false,
    // Soft blush / rose texture wall panel interior
    img: "/images/p1.jpg",
  },
  {
    code: "GRAY TEX", name: "Gray Texture", color: "#808080", dark: true,
    // Concrete-look gray textured surface / panel
    img: "https://www.taasaupvcprofile.com/sub-images/platinum-collection05.jpg",
  },
  {
    code: "BLACK TEX",name: "Black Texture", color: "#2A2A2A", dark: true,
    // Deep black textured furniture / panel finish
    img: "/images/p2.jpg",
  },
  {
    code: "TOMATO TEX", name: "Tomato Texture", color: "#C0443A", dark: true,
    // Bold red / tomato accent panel or wardrobe
    img: "/images/p3.jpg",
  },
];

const GALLERY = [
  { img: "/images/pvc-wall-panel-design.jpg", label: "Residential Interiors",   desc: "Premium uPVC panels for modern living rooms and bedrooms." },
  { img: "/images/Modular-kitchen-designs.png",  label: "Modular Kitchen",          desc: "Waterproof, bacteria-resistant kitchen cabinetry." },
  { img: "/images/PVC-Modern-Latest-Design-Bedroom-Furniture-Cloth-Storage-Sliding-Door-Wardrobe.avif", label: "Sliding Wardrobes",        desc: "Custom sliding wardrobe systems in Platinum finish." },
  { img: "/images/commercialspaces.webp", label: "Commercial Spaces",        desc: "Office partitions and commercial fit-outs." },
  { img: "/images/pvc-office-design-panel.webp", label: "Office Interiors",         desc: "Hygienic, durable cubicles and office furniture." },
];

const FEATURES = [
  { Icon: Bug,         title: "100% Termite & Borer Proof",   desc: "Completely immune to pests — no fumigation needed, ever." },
  { Icon: Flame,       title: "Fire Retardant",               desc: "Self-extinguishing, certified for kitchens and offices." },
  { Icon: Leaf,        title: "Non Toxic",                    desc: "Food-grade safe, free from harmful chemicals." },
  { Icon: Droplets,    title: "Waterproof for Lifetime",      desc: "Zero swelling, zero warping in humid conditions." },
  { Icon: ShieldCheck, title: "Bacteria & Fungus Resistant",  desc: "Hygienic surfaces for kitchens and medical spaces." },
  { Icon: Zap,         title: "Washable",                     desc: "Wipe clean with any household cleaner — zero effort." },
  { Icon: Star,        title: "Zero Maintenance",             desc: "No polishing, painting or sealing — ever." },
  { Icon: Sparkles,    title: "Fast Installation",            desc: "Lightweight panels reduce install time by 60%." },
  { Icon: CheckCircle, title: "Wide Range of Designs",        desc: "11 premium finishes in the Platinum Collection." },
];

const COMPARE = [
  { feature: "Material Grade",       platinum: "Grade-A Premium",      regular: "Standard Grade"    },
  { feature: "Surface Finish",       platinum: "Ultra-Gloss / Texture", regular: "Standard Matte"   },
  { feature: "UV Stability",         platinum: "UV-Stabilised",         regular: "Basic UV coat"     },
  { feature: "Thickness",            platinum: "18mm – 25mm",           regular: "12mm – 18mm"       },
  { feature: "Colour Fastness",      platinum: "25+ Years",             regular: "10–15 Years"       },
  { feature: "Waterproof",           platinum: "✓ Lifetime",            regular: "✓ Lifetime"        },
  { feature: "Termite Proof",        platinum: "✓ Lifetime",            regular: "✓ Lifetime"        },
  { feature: "Fire Retardant",       platinum: "✓ Certified",           regular: "✓ Basic"           },
  { feature: "Finish Options",       platinum: "11 Finishes",           regular: "6 Finishes"        },
  { feature: "Best For",             platinum: "Luxury / Commercial",   regular: "Residential / Budget"},
];

const RELATED = [
  { name: "The Regular Collection", img: "/images/the-regular-pr-1-main.webp", href: "/Products" },
  { name: "WPC & PVC Louvers",      img: "/images/wpc-pvc-louvers.webp", href: "/Products" },
  { name: "Modular Kitchens",       img: "/images/commercialspaces.webp", href: "/Products" },
  { name: "Sliding Wardrobes",      img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80", href: "/Products" },
];

/* ─── Mini Navbar ──────────────────────────────────────────────────────────── */
const MiniNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.65 }}
      style={{
        position: "sticky", top: 0, zIndex: 999,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(16px)",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "0 1px 0 rgba(196,145,56,0.12)",
        transition: "box-shadow 0.4s",
        padding: "0 3rem", height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
      {/* Logo */}
      <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.7rem", textDecoration: "none" }}>
        <div style={{ width: 38, height: 38, background: "linear-gradient(135deg,#C49138,#E8B84B)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(196,145,56,0.35)" }}>
          <span style={{ fontFamily: G.serif, color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>T</span>
        </div>
        <div>
          <div style={{ fontFamily: G.serif, fontSize: "1.28rem", fontWeight: 700, color: G.dark, letterSpacing: "0.06em", lineHeight: 1 }}>TAASA</div>
          <div style={{ fontSize: "0.45rem", letterSpacing: "0.35em", color: G.gold, textTransform: "uppercase", marginTop: 2 }}>Industries</div>
        </div>
      </a>

      {/* Desktop Links */}
      <nav style={{ display: "flex", gap: "0.2rem" }}>
        {["Home","About Us","Products","Clientele","Contact"].map(l => (
          <a key={l} href={l === "Home" ? "/" : `/${l.toLowerCase().replace(/ /g,"-")}`}
            style={{ padding: "0.48rem 0.85rem", fontSize: "0.76rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, color: "#555", borderRadius: 4, transition: "color 0.3s, background 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.color = G.gold; e.currentTarget.style.background = "rgba(196,145,56,0.07)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#555"; e.currentTarget.style.background = "transparent"; }}>
            {l}
          </a>
        ))}
      </nav>

      <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
        <a href="tel:+918511232318" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.76rem", color: "#666", textDecoration: "none" }}
          onMouseEnter={e => e.currentTarget.style.color = G.gold} onMouseLeave={e => e.currentTarget.style.color = "#666"}>
          <Phone size={13} color={G.gold} /> +91 85112 32318
        </a>
        <a href="/contact" className="btn-gold" style={{ padding: "0.52rem 1.25rem", border: "none", cursor: "pointer", fontSize: "0.71rem", letterSpacing: "0.1em", fontWeight: 600, color: "#fff", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
          Quick Enquiry <ArrowUpRight size={12} />
        </a>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ color: G.dark, padding: "0.2rem" }}>
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", boxShadow: "0 20px 40px rgba(0,0,0,0.12)", padding: "1rem 2rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            {["Home","About Us","Products","Clientele","Contact"].map(l => (
              <a key={l} href={l === "Home" ? "/" : `/${l.toLowerCase().replace(/ /g,"-")}`}
                style={{ padding: "0.8rem 0", fontSize: "0.9rem", fontWeight: 500, color: G.dark, borderBottom: "1px solid #f5f0e8" }}>
                {l}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

/* ─── Lightbox ─────────────────────────────────────────────────────────────── */
const Lightbox = ({ item, onClose }) => (
  <AnimatePresence>
    {item && (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(10,8,4,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={e => e.stopPropagation()}
          style={{ maxWidth: "900px", width: "100%", borderRadius: 12, overflow: "hidden", position: "relative", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}>
          <img src={item.img} alt={item.label} style={{ width: "100%", maxHeight: "75vh", objectFit: "cover", display: "block" }} />
          <div style={{ background: "linear-gradient(to top,rgba(10,8,4,0.9),transparent)", position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem 2rem 1.5rem" }}>
            <h3 style={{ fontFamily: G.serif, fontSize: "1.5rem", color: "#fff", marginBottom: "0.4rem" }}>{item.label}</h3>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", fontWeight: 300 }}>{item.desc}</p>
          </div>
          <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
            <X size={18} />
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ─── Inquiry Form ─────────────────────────────────────────────────────────── */
const InquiryForm = () => {
  const [form, setForm]       = useState({ name: "", company: "", phone: "", email: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const update = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1400);
  };

  return sent ? (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      style={{ textAlign: "center", padding: "4rem 2rem" }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#C49138,#E8B84B)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
        <CheckCircle size={32} color="#fff" />
      </div>
      <h3 style={{ fontFamily: G.serif, fontSize: "1.8rem", color: G.dark, marginBottom: "0.8rem" }}>Thank You!</h3>
      <p style={{ color: G.gray, fontSize: "0.95rem", lineHeight: 1.8 }}>Your inquiry has been submitted. Our team will contact you within 24 hours.</p>
      <button onClick={() => setSent(false)} className="btn-gold"
        style={{ marginTop: "2rem", padding: "0.85rem 2rem", border: "none", cursor: "pointer", fontSize: "0.78rem", letterSpacing: "0.12em", fontWeight: 600, color: "#fff", borderRadius: 4 }}>
        Send Another
      </button>
    </motion.div>
  ) : (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: "0.45rem", fontWeight: 600 }}>Your Name *</label>
          <input className="form-input" value={form.name} onChange={update("name")} placeholder="Full name" required />
        </div>
        <div>
          <label style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: "0.45rem", fontWeight: 600 }}>Company</label>
          <input className="form-input" value={form.company} onChange={update("company")} placeholder="Company name" />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: "0.45rem", fontWeight: 600 }}>Phone *</label>
          <input className="form-input" value={form.phone} onChange={update("phone")} placeholder="+91 XXXXX XXXXX" required />
        </div>
        <div>
          <label style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: "0.45rem", fontWeight: 600 }}>Email *</label>
          <input className="form-input" type="email" value={form.email} onChange={update("email")} placeholder="your@email.com" required />
        </div>
      </div>
      <div>
        <label style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: "0.45rem", fontWeight: 600 }}>Message</label>
        <textarea className="form-input" rows={4} value={form.message} onChange={update("message")} placeholder="Tell us about your project requirements, quantity needed, preferred finishes…" style={{ resize: "vertical", minHeight: 110 }} />
      </div>
      <button type="submit" className="btn-gold"
        style={{ padding: "1rem 2.5rem", border: "none", cursor: loading ? "wait" : "pointer", fontSize: "0.8rem", letterSpacing: "0.14em", fontWeight: 600, color: "#fff", borderRadius: 4, display: "flex", alignItems: "center", gap: "0.6rem", justifyContent: "center" }}>
        {loading ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", borderRadius: "50%" }} />
        ) : (
          <><Send size={15} /> Submit Inquiry</>
        )}
      </button>
    </form>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════ */
/* PLATINUM COLLECTION PAGE                                                   */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function PlatinumCollection() {
  const [lightboxItem, setLightboxItem] = useState(null);
  const [activeTab,    setActiveTab]    = useState("all");

  const filteredSwatches = activeTab === "texture"
    ? SWATCHES.filter(s => s.code.includes("TEX"))
    : activeTab === "solid"
    ? SWATCHES.filter(s => !s.code.includes("TEX"))
    : SWATCHES;

  return (
    <>
      <FontImport />

      {/* 1. Navbar */}
      {/* <MiniNav /> */}

      {/* ══════════════════════════════════════════════════
          2. HERO BANNER
      ══════════════════════════════════════════════════ */}
      <section style={{ position: "relative", height: 420, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <motion.img
          initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.2 }}
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=85"
          alt="Platinum Collection"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg,rgba(10,8,4,0.88) 0%,rgba(10,8,4,0.5) 60%,rgba(10,8,4,0.2) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 220, background: "linear-gradient(to top,rgba(196,145,56,0.07),transparent)" }} />

        <div style={{ position: "relative", zIndex: 10, padding: "0 4rem 3.5rem", width: "100%" }}>
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.2rem" }}>
            {[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Platinum Collection" },
            ].map((b, i, arr) => (
              <React.Fragment key={b.label}>
                {b.href
                  ? <a href={b.href} style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em", textDecoration: "none" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#E8B84B"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}>
                      {b.label}
                    </a>
                  : <span style={{ fontSize: "0.72rem", color: "#E8B84B", letterSpacing: "0.08em" }}>{b.label}</span>
                }
                {i < arr.length - 1 && <ChevronRight size={12} color="rgba(255,255,255,0.35)" />}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Title */}
          <div style={{ overflow: "hidden" }}>
            <motion.h1 initial={{ y: 80 }} animate={{ y: 0 }} transition={{ delay: 0.4, duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
              className="hero-h1"
              style={{ fontFamily: G.serif, fontSize: "clamp(2.8rem,6vw,4.8rem)", fontWeight: 500, color: "#fff", lineHeight: 1.08 }}>
              The Platinum
            </motion.h1>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.h1 initial={{ y: 80 }} animate={{ y: 0 }} transition={{ delay: 0.55, duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
              className="hero-h1"
              style={{ fontFamily: G.serif, fontSize: "clamp(2.8rem,6vw,4.8rem)", fontWeight: 500, fontStyle: "italic", color: "#E8B84B", lineHeight: 1.08 }}>
              Collection
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            style={{ marginTop: "1rem", fontSize: "clamp(0.86rem,1.2vw,1rem)", color: "rgba(255,255,255,0.6)", maxWidth: 480, lineHeight: 1.85, fontWeight: 300 }}>
            Our finest grade uPVC profiles — ultra-gloss, UV-stabilised, and engineered for luxury residential and commercial interiors.
          </motion.p>
        </div>

        {/* Gold stripe at bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg,#C49138,#E8B84B,#C49138)" }} />
      </section>

      {/* ══════════════════════════════════════════════════
          MARQUEE STRIP
      ══════════════════════════════════════════════════ */}
      <div style={{ background: "linear-gradient(90deg,#C49138,#E8C055,#C49138)", padding: "0.82rem 0", overflow: "hidden" }}>
        <div className="mq-track">
          {Array(2).fill(["Premium Grade", "UV Stabilised", "Ultra Gloss Finish", "11 Colour Options", "Termite Proof", "Waterproof Lifetime", "Fire Retardant", "Zero Maintenance", "Bacteria Resistant"]).flat().map((t, i) => (
            <span key={i} style={{ whiteSpace: "nowrap", padding: "0 2.5rem", fontSize: "0.68rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.93)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "2.5rem" }}>
              {t}<span style={{ opacity: 0.4, fontSize: "0.4rem" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          3. COLLECTION INTRO
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "6rem 4rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="two-col">
          <FadeUp>
            <SLabel>About The Collection</SLabel>
            <h2 style={{ fontFamily: G.serif, fontSize: "clamp(2rem,3.2vw,2.9rem)", fontWeight: 500, color: G.dark, lineHeight: 1.14, marginBottom: "1.4rem" }}>
              Premium Grade uPVC<br /><em style={{ color: G.gold }}>For Luxury Spaces</em>
            </h2>
            <p style={{ color: G.gray, lineHeight: 1.9, fontSize: "0.93rem", fontWeight: 300, marginBottom: "1.1rem" }}>
              The Platinum Collection represents TAASA Industries' highest-grade uPVC profile range. Crafted with Grade-A raw materials and finished with advanced UV-stabilisation technology, every panel in this collection delivers decades of performance without compromise.
            </p>
            <p style={{ color: G.gray, lineHeight: 1.9, fontSize: "0.93rem", fontWeight: 300, marginBottom: "2.2rem" }}>
              Ideal for luxury residences, premium offices, showrooms, and commercial fit-outs — where aesthetics and durability must coexist at the highest level.
            </p>
            {/* Key specs */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
              {[
                ["Grade-A Material", "Highest purity uPVC compound"],
                ["18–25mm Thickness", "Heavy-duty panel options"],
                ["UV Stabilised", "25+ year colour fastness"],
                ["11 Finishes", "Solid + Texture variants"],
              ].map(([k, v]) => (
                <div key={k} style={{ background: G.goldPale2, borderRadius: 8, padding: "0.9rem 1.1rem", borderLeft: `3px solid ${G.gold}` }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 600, color: G.dark, marginBottom: "0.25rem" }}>{k}</div>
                  <div style={{ fontSize: "0.74rem", color: G.gray, fontWeight: 300 }}>{v}</div>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.14)" }} className="img-zoom-inner">
                <motion.img
                  whileHover={{ scale: 1.06 }} transition={{ duration: 0.6 }}
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=85"
                  alt="Platinum Collection"
                  style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }}
                />
              </div>
              {/* Floating badge */}
              <div className="float-badge" style={{ position: "absolute", top: "-1.5rem", right: "-1.5rem", background: "linear-gradient(135deg,#C49138,#E8B84B)", padding: "1.2rem 1.4rem", borderRadius: 10, boxShadow: "0 14px 36px rgba(196,145,56,0.45)", textAlign: "center", zIndex: 10 }}>
                <div style={{ fontFamily: G.serif, fontSize: "2rem", color: "#fff", fontWeight: 700, lineHeight: 1 }}>A+</div>
                <div style={{ fontSize: "0.52rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.85)", textTransform: "uppercase", marginTop: 3 }}>Grade Material</div>
              </div>
              {/* Bottom label */}
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)", padding: "0.75rem 1.2rem", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
                <div style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: G.gold, textTransform: "uppercase", fontWeight: 600, marginBottom: 3 }}>PLATINUM SERIES</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: G.dark }}>11 Premium Finishes Available</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. PROFILE SWATCHES
      ══════════════════════════════════════════════════ */}
      <section style={{ background: G.goldPale2, padding: "6rem 4rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SLabel center>Colour & Finish Options</SLabel>
            <h2 style={{ fontFamily: G.serif, fontSize: "clamp(2rem,3.2vw,2.9rem)", fontWeight: 500, color: G.dark, marginBottom: "0.5rem" }}>
              Select Your <em style={{ color: G.gold }}>Finish</em>
            </h2>
            <p style={{ color: G.gray, fontSize: "0.9rem", maxWidth: 480, margin: "0 auto" }}>
              Every profile is available in our full range of Platinum finishes — solid gloss and signature textures.
            </p>
          </FadeUp>

          {/* Filter Tabs */}
          <FadeUp style={{ display: "flex", gap: "0.6rem", justifyContent: "center", marginBottom: "2.5rem" }}>
            {[["all","All Finishes"],["solid","Solid"],["texture","Textured"]].map(([k, label]) => (
              <button key={k} onClick={() => setActiveTab(k)}
                style={{
                  padding: "0.55rem 1.5rem", borderRadius: 30, cursor: "pointer", fontSize: "0.76rem", letterSpacing: "0.1em", fontWeight: 600,
                  border: activeTab === k ? "none" : `1.5px solid ${G.border}`,
                  background: activeTab === k ? `linear-gradient(135deg,${G.gold},${G.goldLight})` : "#fff",
                  color: activeTab === k ? "#fff" : G.gray,
                  transition: "all 0.3s",
                  boxShadow: activeTab === k ? "0 6px 18px rgba(196,145,56,0.35)" : "none",
                }}>
                {label}
              </button>
            ))}
          </FadeUp>

          {/* Swatches Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.2rem" }} className="swatch-grid four-col">
            <AnimatePresence mode="popLayout">
              {filteredSwatches.map((s, i) => (
                <motion.div key={s.code}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ delay: i * 0.04, duration: 0.42 }}
                  className="swatch-card"
                  onClick={() => setLightboxItem({ img: s.img, label: s.code + " — " + s.name, desc: `Premium Platinum Collection finish. Available in 18mm and 25mm thickness.` })}
                  style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 18px rgba(0,0,0,0.07)", border: `1px solid ${G.border}` }}>
                  {/* ── Real image preview block ── */}
                  <div style={{ height: 160, position: "relative", overflow: "hidden" }}>
                    {/* Actual room / panel photo */}
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.55 }}
                      src={s.img}
                      alt={s.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    {/* Subtle colour-tone overlay so the card still feels on-brand */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: `${s.color}22`,   /* hex colour at ~13% opacity */
                      mixBlendMode: "multiply",
                    }} />
                    {/* Texture badge for TEX variants */}
                    <div style={{
                      position: "absolute", top: "0.55rem", right: "0.55rem",
                      background: "rgba(0,0,0,0.38)", backdropFilter: "blur(6px)",
                      borderRadius: 20, padding: "0.2rem 0.6rem",
                    }}>
                      <span style={{
                        fontSize: "0.5rem", letterSpacing: "0.12em",
                        color: "rgba(255,255,255,0.9)", textTransform: "uppercase", fontWeight: 600,
                      }}>
                        {s.code.includes("TEX") ? "TEXTURE" : "SOLID"}
                      </span>
                    </div>
                    {/* Zoom icon on hover */}
                    <div style={{
                      position: "absolute", inset: 0, display: "flex",
                      alignItems: "center", justifyContent: "center",
                      opacity: 0, transition: "opacity 0.3s",
                    }}
                      className="swatch-zoom-icon">
                      <div style={{ background: "rgba(255,255,255,0.85)", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <ZoomIn size={16} color={G.gold} />
                      </div>
                    </div>
                  </div>
                  {/* ── Info row ── */}
                  <div style={{ padding: "0.85rem 1rem 1rem" }}>
                    <div style={{ fontSize: "0.7rem", letterSpacing: "0.12em", color: G.gold, textTransform: "uppercase", fontWeight: 600, marginBottom: "0.18rem" }}>{s.code}</div>
                    <div style={{ fontSize: "0.84rem", fontWeight: 500, color: G.dark, marginBottom: "0.65rem" }}>{s.name}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      {/* Real colour dot */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: "50%",
                          background: s.color,
                          border: "2px solid rgba(0,0,0,0.1)",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.14)",
                          flexShrink: 0,
                        }} />
                        <span style={{ fontSize: "0.64rem", color: "#bbb", fontWeight: 400 }}>{s.color}</span>
                      </div>
                      <button style={{
                        fontSize: "0.62rem", letterSpacing: "0.1em", color: G.gold,
                        fontWeight: 600, background: "none", border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: "0.22rem", textTransform: "uppercase",
                      }}>
                        View <ZoomIn size={10} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <FadeUp style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <p style={{ fontSize: "0.82rem", color: G.gray, marginBottom: "1rem" }}>Need custom colours or bulk orders?</p>
            <a href="#inquiry" className="btn-gold" style={{ padding: "0.88rem 2.2rem", border: "none", cursor: "pointer", fontSize: "0.78rem", letterSpacing: "0.12em", fontWeight: 600, color: "#fff", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Request Custom Quote <ArrowUpRight size={14} />
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. APPLICATION GALLERY
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "6rem 4rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SLabel center>Applications</SLabel>
            <h2 style={{ fontFamily: G.serif, fontSize: "clamp(2rem,3.2vw,2.9rem)", fontWeight: 500, color: G.dark }}>
              Platinum in the <em style={{ color: G.gold }}>Real World</em>
            </h2>
          </FadeUp>

          {/* Masonry-style layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "300px 300px", gap: "1.2rem" }} className="gallery-grid">
            {/* Large left */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="gallery-item" style={{ gridRow: "1 / 3", borderRadius: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
              onClick={() => setLightboxItem(GALLERY[0])}>
              <img src={GALLERY[0].img} alt={GALLERY[0].label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div className="gallery-overlay"><ZoomIn size={28} /></div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem", background: "linear-gradient(to top,rgba(10,8,4,0.8),transparent)" }}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: G.goldLight, textTransform: "uppercase", fontWeight: 600, marginBottom: "0.25rem" }}>Featured</div>
                <div style={{ fontFamily: G.serif, fontSize: "1.1rem", color: "#fff" }}>{GALLERY[0].label}</div>
              </div>
            </motion.div>

            {/* Top right 2 */}
            {GALLERY.slice(1, 3).map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.65 }}
                className="gallery-item" style={{ boxShadow: "0 6px 24px rgba(0,0,0,0.09)" }}
                onClick={() => setLightboxItem(item)}>
                <img src={item.img} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="gallery-overlay"><ZoomIn size={24} /></div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.2rem", background: "linear-gradient(to top,rgba(10,8,4,0.75),transparent)" }}>
                  <div style={{ fontFamily: G.serif, fontSize: "0.95rem", color: "#fff" }}>{item.label}</div>
                </div>
              </motion.div>
            ))}

            {/* Bottom right 2 */}
            {GALLERY.slice(3, 5).map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1, duration: 0.65 }}
                className="gallery-item" style={{ boxShadow: "0 6px 24px rgba(0,0,0,0.09)" }}
                onClick={() => setLightboxItem(item)}>
                <img src={item.img} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="gallery-overlay"><ZoomIn size={24} /></div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.2rem", background: "linear-gradient(to top,rgba(10,8,4,0.75),transparent)" }}>
                  <div style={{ fontFamily: G.serif, fontSize: "0.95rem", color: "#fff" }}>{item.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. PRODUCT FEATURES
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#FDF9F0,#FFF8EF)", padding: "6rem 4rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SLabel center>Product Features</SLabel>
            <h2 style={{ fontFamily: G.serif, fontSize: "clamp(2rem,3.2vw,2.9rem)", fontWeight: 500, color: G.dark }}>
              Why <em style={{ color: G.gold }}>uPVC Platinum?</em>
            </h2>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.2rem" }} className="three-col">
            {FEATURES.map(({ Icon, title, desc }, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.6 }}
                className="feat-card"
                style={{ background: "#fff", borderRadius: 10, padding: "2rem 1.8rem", border: `1px solid ${G.border}`, boxShadow: "0 2px 14px rgba(0,0,0,0.04)" }}>
                <div className="feat-icon" style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#FDF6E8,#FEF9F0)", border: `1.5px solid ${G.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.2rem", transition: "background 0.35s, box-shadow 0.35s" }}>
                  <Icon size={23} color={G.gold} style={{ transition: "color 0.35s" }} />
                </div>
                <h3 style={{ fontSize: "0.88rem", fontWeight: 600, color: G.dark, marginBottom: "0.6rem", lineHeight: 1.35 }}>{title}</h3>
                <p style={{ fontSize: "0.8rem", color: "#aaa", lineHeight: 1.75, fontWeight: 300 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. COMPARISON TABLE
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "6rem 4rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SLabel center>Comparison</SLabel>
            <h2 style={{ fontFamily: G.serif, fontSize: "clamp(2rem,3.2vw,2.9rem)", fontWeight: 500, color: G.dark }}>
              Platinum vs <em style={{ color: G.gold }}>Regular</em>
            </h2>
          </FadeUp>

          <FadeUp>
            <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: `1px solid ${G.border}` }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr", background: "linear-gradient(135deg,#1A1A2E,#16213E)" }}>
                {["Feature", "Platinum ✦", "Regular"].map((h, i) => (
                  <div key={h} style={{ padding: "1.2rem 1.8rem", fontSize: "0.76rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, color: i === 1 ? G.goldLight : "rgba(255,255,255,0.6)" }}>
                    {h}
                  </div>
                ))}
              </div>
              {/* Rows */}
              {COMPARE.map((row, i) => (
                <motion.div key={row.feature}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  className="compare-row"
                  style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr", background: i % 2 === 0 ? "#fff" : G.goldPale2, transition: "background 0.25s", borderBottom: `1px solid ${G.border}` }}>
                  <div style={{ padding: "1rem 1.8rem", fontSize: "0.86rem", fontWeight: 500, color: G.dark }}>{row.feature}</div>
                  <div style={{ padding: "1rem 1.8rem", fontSize: "0.86rem", color: G.gold, fontWeight: 600 }}>{row.platinum}</div>
                  <div style={{ padding: "1rem 1.8rem", fontSize: "0.86rem", color: G.gray, fontWeight: 400 }}>{row.regular}</div>
                </motion.div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          8. INQUIRY FORM
      ══════════════════════════════════════════════════ */}
      <section id="inquiry" style={{ background: "linear-gradient(160deg,#FDF9F0,#FFF8EF)", padding: "6rem 4rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "start" }} className="two-col">

          {/* Left info */}
          <FadeUp>
            <SLabel>Get In Touch</SLabel>
            <h2 style={{ fontFamily: G.serif, fontSize: "clamp(2rem,3.2vw,2.8rem)", fontWeight: 500, color: G.dark, lineHeight: 1.14, marginBottom: "1.3rem" }}>
              Request a<br /><em style={{ color: G.gold }}>Free Quote</em>
            </h2>
            <p style={{ color: G.gray, lineHeight: 1.9, fontSize: "0.9rem", fontWeight: 300, marginBottom: "2.2rem" }}>
              Tell us about your project — dimensions, finish preferences, application type — and we'll send you a detailed quote within 24 hours.
            </p>

            {/* Contact cards */}
            {[
              { Icon: Phone, label: "Call Us",   val: "+91 85112 32318",     href: "tel:+918511232318"         },
              { Icon: Mail,  label: "Email Us",  val: "info@taasaupvc.com",   href: "mailto:info@taasaupvc.com" },
              { Icon: Home,  label: "Visit Us",  val: "06-Bileshwar Industrial Estate, Odhav, Ahmedabad — 382415", href: "#" },
            ].map(({ Icon, label, val, href }) => (
              <a key={label} href={href}
                style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.2rem", textDecoration: "none", transition: "opacity 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.75"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#fff", border: `1px solid ${G.border}`, boxShadow: "0 4px 14px rgba(196,145,56,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={16} color={G.gold} />
                </div>
                <div>
                  <div style={{ fontSize: "0.6rem", letterSpacing: "0.18em", color: "#bbb", textTransform: "uppercase", marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: "0.86rem", color: G.dark, fontWeight: 500, lineHeight: 1.5 }}>{val}</div>
                </div>
              </a>
            ))}

            {/* Working hours */}
            <div style={{ marginTop: "2rem", padding: "1.4rem 1.6rem", background: "#fff", borderRadius: 10, border: `1px solid ${G.border}`, boxShadow: "0 4px 18px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: G.gold, textTransform: "uppercase", fontWeight: 600, marginBottom: "0.7rem" }}>Working Hours</div>
              <div style={{ fontSize: "0.85rem", color: G.dark, fontWeight: 500, marginBottom: "0.25rem" }}>Mon – Sat: 9:00 AM – 6:00 PM</div>
              <div style={{ fontSize: "0.82rem", color: "#bbb" }}>Sunday: Closed</div>
            </div>
          </FadeUp>

          {/* Form */}
          <FadeUp delay={0.12}>
            <div style={{ background: "#fff", borderRadius: 14, padding: "2.5rem", boxShadow: "0 12px 48px rgba(0,0,0,0.08)", border: `1px solid ${G.border}` }}>
              <div style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontFamily: G.serif, fontSize: "1.5rem", fontWeight: 500, color: G.dark, marginBottom: "0.4rem" }}>Send an Inquiry</h3>
                <p style={{ fontSize: "0.82rem", color: G.gray, fontWeight: 300 }}>Fill in the form and our team will get back to you within 24 hours.</p>
              </div>
              <InquiryForm />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          9. RELATED PRODUCTS
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "6rem 4rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeUp style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <SLabel>Explore More</SLabel>
              <h2 style={{ fontFamily: G.serif, fontSize: "clamp(2rem,3vw,2.7rem)", fontWeight: 500, color: G.dark }}>
                Related <em style={{ color: G.gold }}>Collections</em>
              </h2>
            </div>
            <a href="/products" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", border: `1.5px solid #E0E0E0`, color: G.gray, fontSize: "0.73rem", letterSpacing: "0.14em", fontWeight: 500, padding: "0.65rem 1.4rem", borderRadius: 4, transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = G.gold; e.currentTarget.style.color = G.gold; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#E0E0E0"; e.currentTarget.style.color = G.gray; }}>
              ALL PRODUCTS <ChevronRight size={13} />
            </a>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.3rem" }} className="four-col">
            {RELATED.map((r, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}
                style={{ borderRadius: 10, overflow: "hidden", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
                className="swatch-card">
                <a href={r.href} style={{ display: "block", textDecoration: "none" }}>
                  <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                    <motion.img whileHover={{ scale: 1.07 }} transition={{ duration: 0.6 }}
                      src={r.img} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(20,16,8,0.75),transparent 55%)" }} />
                    <div style={{ position: "absolute", bottom: "1rem", left: "1rem", right: "1rem" }}>
                      <div style={{ fontFamily: G.serif, fontSize: "1rem", color: "#fff", fontWeight: 500 }}>{r.name}</div>
                    </div>
                  </div>
                  <div style={{ background: "#fff", padding: "0.9rem 1.1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.72rem", color: G.gold, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>View Collection</span>
                    <ChevronRight size={14} color={G.gold} />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          10. MINI FOOTER
      ══════════════════════════════════════════════════ */}
      <footer>
        {/* CTA strip */}
        <div style={{ background: "linear-gradient(135deg,#1A1A2E,#16213E)", padding: "3.5rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
          <div>
            <h3 style={{ fontFamily: G.serif, fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 500, color: "#fff", marginBottom: "0.5rem" }}>
              Ready to Order the <em style={{ color: G.goldLight }}>Platinum Collection?</em>
            </h3>
            <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>Pan-India delivery available. Bulk orders welcome.</p>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#inquiry" className="btn-gold" style={{ padding: "0.92rem 2.2rem", border: "none", cursor: "pointer", fontSize: "0.78rem", letterSpacing: "0.12em", fontWeight: 600, color: "#fff", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
              REQUEST QUOTE <ArrowUpRight size={14} />
            </a>
            <a href="tel:+918511232318" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.92rem 2.2rem", border: "1.5px solid rgba(255,255,255,0.25)", color: "#fff", borderRadius: 4, fontSize: "0.78rem", letterSpacing: "0.12em", fontWeight: 600, textDecoration: "none", transition: "all 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <Phone size={14} /> CALL US
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        {/* <div style={{ background: "#0D0D1A", padding: "1.4rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}> */}
          {/* <div style={{ display: "flex", gap: "1.8rem" }}>
            {["Home", "About Us", "Products", "Clientele", "Contact"].map(l => (
              <a key={l} href={l === "Home" ? "/" : `/${l.toLowerCase().replace(/ /g, "-")}`}
                style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.color = G.gold} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                {l}
              </a>
            ))}
          </div> */}
          {/* <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.22)", letterSpacing: "0.06em" }}>
            © 2026 TAASA Industries Pvt. Ltd. · All Rights Reserved
          </p> */}
        {/* </div> */}
      </footer>

      {/* Lightbox */}
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </>
  );
}
