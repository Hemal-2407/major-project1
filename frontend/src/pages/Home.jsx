import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Droplets, Bug, ChevronRight, ArrowUpRight,
  Flame, Leaf, Zap, Phone, Mail, MapPin, X, Star
} from "lucide-react";
import { Link } from "react-router-dom";
/* ─── GLOBAL STYLES ─────────────────────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Outfit', sans-serif; background: #ffffff; color: #1a1a2e; overflow-x: hidden; }
    ::selection { background: rgba(196,145,56,0.25); }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #f8f6f0; }
    ::-webkit-scrollbar-thumb { background: #c49138; border-radius: 2px; }

    .serif { font-family: 'Playfair Display', serif; }
    .sans  { font-family: 'Outfit', sans-serif; }

    @keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .marquee-run { animation: marqueeScroll 28s linear infinite; display: flex; gap: 0; }
    .marquee-run:hover { animation-play-state: paused; }

    .btn-gold {
      background: linear-gradient(135deg, #c49138 0%, #e8b84b 50%, #c49138 100%);
      background-size: 200% 100%;
      transition: background-position 0.5s ease, transform 0.2s ease, box-shadow 0.3s ease;
      box-shadow: 0 4px 20px rgba(196,145,56,0.35);
    }
    .btn-gold:hover { background-position: 100% 0; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(196,145,56,0.5); }

    .card-lift { transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease; }
    .card-lift:hover { transform: translateY(-8px); box-shadow: 0 30px 60px rgba(0,0,0,0.12); }

    .img-zoom img { transition: transform 0.7s cubic-bezier(0.23,1,0.32,1); }
    .img-zoom:hover img { transform: scale(1.07); }

    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
    .float-anim { animation: float 5s ease-in-out infinite; }

    .nav-link {
      font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase;
      cursor: pointer; transition: color 0.3s; font-weight: 500;
      position: relative; text-decoration: none;
    }
    .nav-link::after {
      content:''; position:absolute; bottom:-4px; left:0; width:0; height:1.5px;
      background:#c49138; transition: width 0.3s;
    }
    .nav-link:hover::after { width:100%; }

    .icon-circle {
      width: 60px; height: 60px; border-radius: 50%;
      background: linear-gradient(135deg, #fdf6e8, #fef9f0);
      border: 1.5px solid rgba(196,145,56,0.2);
      display: flex; align-items: center; justify-content: center;
      transition: background 0.35s, box-shadow 0.35s;
      margin-bottom: 1.3rem;
    }
    .feature-card:hover .icon-circle {
      background: linear-gradient(135deg, #c49138, #e8b84b);
      box-shadow: 0 8px 24px rgba(196,145,56,0.4);
    }
    .feature-card:hover .feat-icon { color: #fff !important; }

    .section-label {
      display: inline-flex; align-items: center; gap: 10px;
      font-size: 0.68rem; letter-spacing: 0.4em; text-transform: uppercase;
      color: #c49138; font-weight: 600; margin-bottom: 1.2rem;
    }
    .section-label::before { content:''; width:28px; height:1.5px; background:#c49138; display:block; }

    .prod-overlay {
      position: absolute; inset:0;
      background: linear-gradient(to top, rgba(20,16,8,0.9) 0%, rgba(20,16,8,0.15) 55%, transparent 100%);
    }

    .testi-card {
      background: #fff; border: 1px solid rgba(196,145,56,0.15); border-radius: 12px;
      padding: 2rem 2.2rem; box-shadow: 0 4px 24px rgba(0,0,0,0.06);
      transition: box-shadow 0.3s, transform 0.3s;
    }
    .testi-card:hover { box-shadow: 0 12px 40px rgba(196,145,56,0.15); transform: translateY(-4px); }

    @media (max-width: 900px) {
      .hide-mobile { display: none !important; }
      .two-col { grid-template-columns: 1fr !important; gap: 3rem !important; }
      .three-col { grid-template-columns: 1fr 1fr !important; }
      .hero-h1 { font-size: 3.2rem !important; }
      .section-pad { padding: 5rem 1.8rem !important; }
    }
    @media (max-width: 600px) {
      .three-col { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

/* ─── COUNTER ─────────────────────────────────────────────────────────── */
const Counter = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = Date.now();
        const id = setInterval(() => {
          const p = Math.min((Date.now() - t0) / duration, 1);
          setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
          if (p >= 1) clearInterval(id);
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─── FAQ ITEM ─────────────────────────────────────────────────────────── */
const FaqItem = ({ q, a, idx }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
      style={{ borderBottom: "1px solid #eee" }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "1.4rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
        <span style={{ fontSize: "0.95rem", fontWeight: 500, color: open ? "#c49138" : "#1a1a2e", transition: "color 0.3s", paddingRight: "1rem" }}>{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{ fontSize: "1.4rem", color: "#c49138", lineHeight: 1, flexShrink: 0 }}>+</motion.span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}>
            <p style={{ paddingBottom: "1.4rem", fontSize: "0.9rem", color: "#666", lineHeight: 1.85, fontWeight: 300 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};
/* ═══════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["Home", "About Us", "Products", "Clientele", "Contact"];

  const features = [
    { icon: Bug, title: "100% Termite & Borer Proof", desc: "Completely immune to pests and borers — no fumigation, no damage, ever." },
    { icon: Flame, title: "Fire Retardant", desc: "Self-extinguishing, certified for kitchens, offices and commercial use." },
    { icon: Leaf, title: "Non Toxic Sheet", desc: "Food-grade safe, free from harmful chemicals and allergens." },
    { icon: Droplets, title: "Waterproof for Lifetime", desc: "Zero swelling, zero warping — ideal for humid kitchens and bathrooms." },
    { icon: ShieldCheck, title: "Bacteria & Fungus Resistant", desc: "Hygienic surfaces that don't harbour mold or microorganisms." },
    { icon: Zap, title: "Zero Maintenance", desc: "No polishing, no painting, no sealing — ever. Just wipe clean." },
    { icon: Star, title: "Wide Range of Designs", desc: "100+ colours — wood grain, digital marble, solid matte finishes." },
    { icon: ShieldCheck, title: "Fast Installation", desc: "Lightweight panels cut installation time by up to 60%." },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const products = [
    { name: "The Platinum Collection", tag: "Premium Grade", img: "https://www.taasaupvcprofile.com/images/the-platinum-pr-1-main.webp", desc: "Our finest uPVC furniture line — ultra-gloss, UV-stable, built for luxury interiors." ,href: "./PlatinumCollection" },
    { name: "The Regular Collection", tag: "Best Value", img: "https://www.taasaupvcprofile.com/images/the-regular-pr-1-main.webp", desc: "High-performance uPVC products at accessible prices without compromising quality." },
    { name: "WPC & PVC Louvers", tag: "Ventilation & Décor", img: "https://www.taasaupvcprofile.com/images/wpc-pvc-louvers.webp", desc: "Elegant louvers for partitions, facades and decorative ventilation panels." },
    // { name: "uPVC Doors", tag: "Solid Core | Fire Rated", img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=900&q=80", desc: "Architectural-grade uPVC doors — termite-proof, fire-rated and maintenance-free." },
    // { name: "Modular Kitchens", tag: "Waterproof Cabinets", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80", desc: "uPVC kitchen cabinetry that withstands steam, oil and moisture for decades." },
    // { name: "Sliding Wardrobes", tag: "Custom Finish", img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=900&q=80", desc: "Space-saving sliding wardrobe systems in premium finishes and digital textures." },
  ];

  const stats = [
    { n: 13, s: "+", label: "Years of Excellence" },
    { n: 500, s: "+", label: "Projects Delivered" },
    { n: 11, s: "", label: "Product Lines" },
    { n: 100, s: "+", label: "Design Finishes" },
  ];

  const testimonials = [
    { name: "Rajesh Patel", role: "Interior Designer, Ahmedabad", text: "TAASA's uPVC profiles are the best I've worked with — consistent quality, great finish, and always on time." },
    { name: "Priya Shah", role: "Homeowner, Surat", text: "Our modular kitchen from TAASA looks stunning and the waterproof quality is exactly what we needed for our coastal home." },
    { name: "Amit Mehta", role: "Contractor, Vadodara", text: "Supplying TAASA products to my clients for 5 years. Zero complaints. Excellent support team too." },
  ];

  const faqs = [
    { q: "How long do uPVC products last?", a: "uPVC furniture lasts 40+ years with zero maintenance. Unlike wood which degrades in Indian humidity within 10 years, uPVC never warps, swells, or cracks." },
    { q: "Is uPVC safe for kitchen use?", a: "Absolutely. Our uPVC is food-grade, bacteria-resistant, and certified non-toxic — perfect for modular kitchens and pantries." },
    { q: "Do you supply raw uPVC profiles to fabricators?", a: "Yes. We supply Grade-A uPVC extrusion profiles to fabricators and manufacturers across India with pan-India logistics support." },
    { q: "What colours and finishes are available?", a: "We offer 100+ options — solid gloss, matte, wood grain, digital marble, and custom laminates. Our catalogue shows all available options." },
    { q: "Do you offer installation services?", a: "We partner with certified installers in Gujarat and major metros. Contact us for a free consultation and site visit." },
  ];

  return (
    <>
      <GlobalStyle />

      {/* ══ NAVBAR ══ */}
      {/* <motion.header
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          transition: "all 0.4s ease",
          padding: "0 3rem", height: "70px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}> */}
        {/* Logo */}
        {/* <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#c49138,#e8b84b)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="serif" style={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>T</span>
          </div>
          <div>
            <div className="serif" style={{ fontSize: "1.2rem", fontWeight: 700, color: scrolled ? "#1a1a2e" : "#fff", lineHeight: 1, letterSpacing: "0.06em", transition: "color 0.4s" }}>TAASA</div>
            <div style={{ fontSize: "0.48rem", letterSpacing: "0.32em", color: "#c49138", textTransform: "uppercase", marginTop: "1px" }}>Industries</div>
          </div>
        </div> */}

        {/* Desktop nav */}
        {/* <nav style={{ display: "flex", gap: "2rem" }} className="hide-mobile">
          {navLinks.map(l => (
            <span key={l} className="nav-link" style={{ color: scrolled ? "#444" : "rgba(255,255,255,0.85)" }}>{l}</span>
          ))}
        </nav>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }} className="hide-mobile">
          <a href="tel:+918511232318" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: scrolled ? "#666" : "rgba(255,255,255,0.8)", textDecoration: "none" }}>
            <Phone size={13} color="#c49138" /> +91 85112 32318
          </a>
          <button className="btn-gold" style={{ padding: "0.58rem 1.4rem", border: "none", cursor: "pointer", fontSize: "0.73rem", letterSpacing: "0.1em", fontWeight: 600, color: "#fff", borderRadius: "4px" }}>
            GET QUOTE
          </button>
        </div>

        <button onClick={() => setMenuOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: scrolled ? "#1a1a2e" : "#fff" }}>
          <Menu size={22} />
        </button>
      </motion.header> */}

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            style={{ position: "fixed", inset: 0, zIndex: 2000, background: "#fff", padding: "2rem 2.5rem", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
              <span className="serif" style={{ fontSize: "1.4rem", color: "#1a1a2e" }}>TAASA</span>
              <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={24} color="#1a1a2e" /></button>
            </div>
            {navLinks.map((l, i) => (
              <motion.div key={l} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => setMenuOpen(false)} className="serif"
                style={{ fontSize: "2.2rem", fontWeight: 400, color: "#1a1a2e", padding: "0.9rem 0", borderBottom: "1px solid #f0f0f0", cursor: "pointer" }}>{l}</motion.div>
            ))}
            <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
              <button className="btn-gold" style={{ width: "100%", padding: "1rem", border: "none", cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, color: "#fff", borderRadius: "6px" }}>
                Get a Free Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ HERO ══ */}
      <section ref={heroRef} style={{ position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <motion.div style={{ position: "absolute", inset: 0, y: heroImgY }}>
          <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1900&q=85" alt="Premium interior"
            style={{ width: "100%", height: "115%", objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, rgba(12,9,4,0.9) 0%, rgba(12,9,4,0.6) 50%, rgba(12,9,4,0.25) 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "300px", background: "linear-gradient(to top, rgba(196,145,56,0.07), transparent)" }} />
        </motion.div>

        <motion.div style={{ y: heroTextY, opacity: heroOpacity, position: "relative", zIndex: 10, padding: "0 4rem", maxWidth: "1000px" }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem", background: "rgba(196,145,56,0.14)", border: "1px solid rgba(196,145,56,0.32)", padding: "0.38rem 1.1rem", borderRadius: "30px", marginBottom: "2rem" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c49138", display: "inline-block" }} />
            <span style={{ fontSize: "0.66rem", letterSpacing: "0.3em", color: "#e8b84b", textTransform: "uppercase", fontWeight: 500 }}>
              Est. 2010 · Premium uPVC Manufacturing · Ahmedabad
            </span>
          </motion.div>

          {[
            { text: "Transforming", italic: false },
            { text: "Spaces", italic: true, gold: true },
            { text: "Beautifully.", italic: false },
          ].map((line, i) => (
            <div key={line.text} style={{ overflow: "hidden" }}>
              <motion.h1 initial={{ y: 110 }} animate={{ y: 0 }} transition={{ delay: 0.4 + i * 0.15, duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
                className={`serif hero-h1`}
                style={{ fontSize: "clamp(3.2rem, 8.5vw, 7.5rem)", fontWeight: line.gold ? 400 : 500, fontStyle: line.italic ? "italic" : "normal", color: line.gold ? "#e8b84b" : "#ffffff", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
                {line.text}
              </motion.h1>
            </div>
          ))}

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}
            style={{ marginTop: "1.8rem", fontSize: "clamp(0.88rem, 1.4vw, 1.05rem)", color: "rgba(255,255,255,0.62)", maxWidth: "480px", lineHeight: 1.9, fontWeight: 300, marginBottom: "2.5rem" }}>
            India's trusted manufacturer of termite-proof, waterproof uPVC furniture & profiles. From modular kitchens to sliding wardrobes — built to last a lifetime.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="/taasa_catalogue.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button className="btn-gold" style={{ padding: "0.9rem 2.3rem", border: "none", cursor: "pointer", fontSize: "0.78rem", letterSpacing: "0.12em", fontWeight: 600, color: "#fff", borderRadius: "4px", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                VIEW CATALOGUE <ArrowUpRight size={15} />
              </button>
            </a>
            <button style={{ padding: "0.9rem 2.3rem", background: "transparent", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff", cursor: "pointer", fontSize: "0.78rem", letterSpacing: "0.12em", fontWeight: 500, borderRadius: "4px", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}>
              REQUEST A QUOTE
            </button>
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "1.4rem 4rem", display: "flex", gap: "2.5rem", justifyContent: "flex-end", flexWrap: "wrap" }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div className="serif" style={{ fontSize: "1.9rem", color: "#e8b84b", fontWeight: 500, lineHeight: 1 }}>
                <Counter end={s.n} suffix={s.s} />
              </div>
              <div style={{ fontSize: "0.57rem", letterSpacing: "0.16em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ══ MARQUEE ══ */}
      <div style={{ background: "linear-gradient(135deg, #c49138, #e8c055)", padding: "0.82rem 0", overflow: "hidden" }}>
        <div className="marquee-run">
          {Array(2).fill(["100% Termite Proof", "Waterproof for Life", "Fire Retardant", "Zero Maintenance", "Non Toxic", "Bacteria Resistant", "Fast Installation", "100+ Design Finishes", "13+ Years Experience", "Pan India Supply"]).flat().map((item, i) => (
            <span key={i} style={{ whiteSpace: "nowrap", padding: "0 2.5rem", fontSize: "0.7rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.92)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "2.5rem" }}>
              {item} <span style={{ opacity: 0.45, fontSize: "0.45rem" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ ABOUT ══ */}
      <section style={{ background: "#fff", padding: "7rem 4rem" }} className="section-pad">
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="two-col">
          {/* Image collage */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ position: "relative", height: "520px" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "65%", height: "78%", overflow: "hidden", borderRadius: "8px", boxShadow: "0 20px 60px rgba(0,0,0,0.13)" }} className="img-zoom">
              <img src="https://i.pinimg.com/originals/77/81/eb/7781eb708430bcc50d1885aee17f1c14.jpg" alt="Kitchen" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "52%", height: "58%", overflow: "hidden", borderRadius: "8px", boxShadow: "0 20px 60px rgba(0,0,0,0.13)" }} className="img-zoom">
              <img src="https://images.livspace-cdn.com/plain/https://d3gq2merok8n5r.cloudfront.net/abhinav/ond-1634120396-Obfdc/ond-2022-1664872805-f0ijv/wr-1664873436-cbkRF/10denoiser-4-1-1668008138-E5A9m.jpg" alt="Wardrobe" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <motion.div className="float-anim"
              style={{ position: "absolute", top: "36%", right: "26%", background: "linear-gradient(135deg,#c49138,#e8b84b)", padding: "1.3rem 1.5rem", borderRadius: "10px", boxShadow: "0 16px 40px rgba(196,145,56,0.4)", textAlign: "center", zIndex: 10 }}>
              <div className="serif" style={{ fontSize: "2rem", color: "#fff", fontWeight: 700, lineHeight: 1 }}>13+</div>
              <div style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.85)", textTransform: "uppercase", marginTop: "4px" }}>Years of Trust</div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="section-label">About TAASA</div>
            <h2 className="serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3.1rem)", fontWeight: 500, color: "#1a1a2e", lineHeight: 1.15, marginBottom: "1.4rem" }}>
              Expertly Curated<br /><em style={{ color: "#c49138" }}>Furniture & Décor</em>
            </h2>
            <p style={{ color: "#666", lineHeight: 1.9, fontSize: "0.93rem", fontWeight: 300, marginBottom: "1.1rem" }}>
              Established in 2010, TAASA Industries has emerged as a prominent name in the realm of uPVC products across India. As a dedicated manufacturer and supplier, we specialise in a comprehensive range of PVC and uPVC offerings.
            </p>
            <p style={{ color: "#666", lineHeight: 1.9, fontSize: "0.93rem", fontWeight: 300, marginBottom: "2.5rem" }}>
              From PVC doors, TV cabinets and wardrobes to office furniture, modular kitchens, ceiling panels, and sliding wardrobe systems — we cover it all with uncompromising quality.
            </p>
            <div style={{ display: "flex", gap: "2.2rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
              {[["500+", "Projects"], ["11", "Product Lines"], ["Pan India", "Supply"]].map(([n, l]) => (
                <div key={l} style={{ borderLeft: "3px solid #c49138", paddingLeft: "1.1rem" }}>
                  <div className="serif" style={{ fontSize: "1.7rem", color: "#1a1a2e", fontWeight: 600, lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: "0.6rem", letterSpacing: "0.14em", color: "#aaa", textTransform: "uppercase", marginTop: "4px" }}>{l}</div>
                </div>
              ))}
            </div>
            <button style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: "none", border: "none", cursor: "pointer", color: "#c49138", fontSize: "0.78rem", letterSpacing: "0.14em", fontWeight: 600, textTransform: "uppercase", transition: "gap 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.gap = "1rem"} onMouseLeave={e => e.currentTarget.style.gap = "0.6rem"}><a href="/About">
              Read Our Story </a><ChevronRight size={15} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section 
      style={{ 
        position: "relative",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        // 1. CLEAR BACKGROUND - NO WHITE OVERLAY
        backgroundImage: "url('https://i5.walmartimages.com/asr/b17a3d83-d6b6-42bd-9d94-b37a98de2219.416011cb49ae6d766f73047c50969ce0.jpeg?odnHeight=372&odnWidth=372&odnBg=FFFFFF')", 
        backgroundSize: "100%",
        backgroundPosition: "left center",
        backgroundRepeat: "no-repeat",
        padding: "4rem 0",
        overflow: "hidden"
      }}
    >
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <div className="row align-items-center" style={{ display: "flex", flexWrap: "wrap" }}>
          
          {/* LEFT SIDE: Text Heading */}
          <div style={{ flex: "1", minWidth: "300px" }}>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "clamp(2.5rem, 5vw, 4rem)", 
              lineHeight: 1.1,
              color: "#1a1c2e", // Dark Navy
              fontWeight: 700 
            }}>
              Products<br />
              <span style={{ color: "#c49138" }}>Features</span>
            </h2>
          </div>

          {/* RIGHT SIDE: Icon Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ 
              flex: "2",
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", 
              gap: "3rem 1rem",
              justifyItems: "center"
            }}
          >
            {features.map((item, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <div style={{ 
                  width: "75px", 
                  height: "75px", 
                  backgroundColor: "#1a1c2e", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  marginBottom: "1rem",
                  boxShadow: "0 8px 15px rgba(0,0,0,0.1)"
                }}>
                  <item.icon size={28} color="#fff" strokeWidth={1.5} />
                </div>
                <h3 style={{ 
                  fontSize: "0.75rem", 
                  fontWeight: 700, 
                  color: "#1a1c2e", 
                  whiteSpace: "pre-line",
                  lineHeight: 1.3
                }}>
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      </section>

      {/* ══ PRODUCTS ══ */}
      <section style={{ background: "#fff", padding: "7rem 4rem" }} className="section-pad">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <div className="section-label">Our Collections</div>
              <h2 className="serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 500, color: "#1a1a2e" }}>
                Our <em style={{ color: "#c49138" }}>Products</em>
              </h2>
            </div>
            <button style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "1.5px solid #e0e0e0", cursor: "pointer", color: "#777", fontSize: "0.73rem", letterSpacing: "0.14em", fontWeight: 500, padding: "0.65rem 1.4rem", borderRadius: "4px", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#c49138"; e.currentTarget.style.color = "#c49138"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.color = "#777"; }}><a href="/Products">
              VIEW ALL </a><ChevronRight size={13} />
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.4rem" }} className="three-col">
            {products.map((p, i) => (
              <Link 
                key={i} 
                to={p.href}                      // ← use "to" for React Router Link
                style={{ textDecoration: "none" }} // ← remove underline
              >
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.65 }}
                style={{ position: "relative", overflow: "hidden", borderRadius: "10px", aspectRatio: "3/4", cursor: "pointer", boxShadow: "0 4px 22px rgba(0,0,0,0.09)" }}
                className="img-zoom"
                onMouseEnter={() => setHoveredProduct(i)} onMouseLeave={() => setHoveredProduct(null)}>
                <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="prod-overlay" />
                <div style={{ position: "absolute", top: "1rem", left: "1.1rem", background: "rgba(196,145,56,0.82)", padding: "0.26rem 0.75rem", borderRadius: "30px" }}>
                  <span style={{ fontSize: "0.56rem", letterSpacing: "0.14em", color: "#fff", textTransform: "uppercase", fontWeight: 600 }}>{p.tag}</span>
                </div>
                <div style={{ position: "absolute", top: "0.9rem", right: "1.1rem", fontSize: "0.58rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>0{i + 1}</div>
                <div style={{ position: "absolute", bottom: 0, left: 0, padding: "1.6rem" }}>
                  <h3 className="serif" style={{ fontSize: "1.25rem", fontWeight: 500, color: "#fff", marginBottom: "0.55rem" }}>{p.name}</h3>
                  <motion.p animate={{ opacity: hoveredProduct === i ? 1 : 0, y: hoveredProduct === i ? 0 : 8 }} transition={{ duration: 0.35 }}
                    style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, fontWeight: 300, marginBottom: "0.9rem" }}>
                    {p.desc}
                  </motion.p>
                  <motion.div animate={{ opacity: hoveredProduct === i ? 1 : 0 }} transition={{ duration: 0.35, delay: 0.1 }}
                    style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#e8b84b", fontSize: "0.7rem", letterSpacing: "0.12em", fontWeight: 600 }}>
                    EXPLORE <ChevronRight size={12} />
                  </motion.div>
                </div>
              </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1800&q=85" alt="luxury interior"
          style={{ width: "100%", height: "500px", objectFit: "cover", objectPosition: "center 40%", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,8,4,0.9) 0%, rgba(10,8,4,0.55) 55%, rgba(10,8,4,0.18) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 4rem" }}>
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ maxWidth: "580px" }}>
            <div className="section-label" style={{ color: "#e8b84b" }}>Ready to Transform?</div>
            <h2 className="serif" style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", fontWeight: 500, color: "#fff", lineHeight: 1.1, marginBottom: "1.4rem" }}>
              Upgrade to uPVC <em style={{ color: "#e8b84b" }}>Today</em>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.98rem", lineHeight: 1.85, fontWeight: 300, marginBottom: "2.4rem" }}>
              Furniture that looks like luxury wood but lasts like stone. Our Ahmedabad experts are ready to help you design your dream interior.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button className="btn-gold" style={{ padding: "0.95rem 2.4rem", border: "none", cursor: "pointer", fontSize: "0.78rem", letterSpacing: "0.12em", fontWeight: 600, color: "#fff", borderRadius: "4px" }}>
                BOOK FREE CONSULTATION
              </button>
              <button style={{ padding: "0.95rem 2.4rem", background: "transparent", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff", cursor: "pointer", fontSize: "0.78rem", letterSpacing: "0.12em", borderRadius: "4px", transition: "all 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                DOWNLOAD BROCHURE
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section style={{ background: "#fdf9f0", padding: "7rem 4rem" }} className="section-pad">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Client Stories</div>
            <h2 className="serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 500, color: "#1a1a2e" }}>
              What Our <em style={{ color: "#c49138" }}>Clients Say</em>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="testi-card">
                <div style={{ display: "flex", gap: "3px", marginBottom: "1.2rem" }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#c49138" color="#c49138" />)}
                </div>
                <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.88, fontStyle: "italic", fontWeight: 300, marginBottom: "1.5rem" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#c49138,#e8b84b)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span className="serif" style={{ color: "#fff", fontWeight: 700 }}>{t.name[0]}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.86rem", fontWeight: 600, color: "#1a1a2e" }}>{t.name}</div>
                    <div style={{ fontSize: "0.7rem", color: "#bbb", marginTop: "2px" }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 🧱 CURATED COLLECTIONS (Product Section) */}
      <section className="py-24 px-6 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 max-w-7xl mx-auto">
          <div>
            
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">Our Work</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-2 text-slate-900">Curated Collections</h2>
          </div>
          <p className="text-slate-500 md:max-w-xs mt-4 md:mt-0 italic">
            "Design is not just what it looks like, but how it lasts."
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { name: "Modular Kitchens", tag: "Waterproof", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f" },
            { name: "Luxury Wardrobes", tag: "Termite-Free", img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2" },
            { name: "Executive Doors", tag: "Solid Core", img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb" },
            { name: "TV Units", tag: "Digital Marble", img: "https://images.unsplash.com/photo-1615874959474-d609969a20ed" },
            { name: "uPVC Profiles", tag: "Raw Materials", img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecb" },
            { name: "Office Cubicles", tag: "Commercial", img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36" },
          ].map((item, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              className="group relative h-[450px] overflow-hidden cursor-pointer"
            >
              <img
                src={item.img}
                className="h-full w-full object-cover grayscale-[40%] group-hover:grayscale-0 transition duration-700 group-hover:scale-110"
                alt={item.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-8 transform group-hover:-translate-y-2 transition-transform">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-tighter mb-2 block">{item.tag}</span>
                <h3 className="text-white text-2xl font-serif">{item.name}</h3>
                <div className="flex items-center text-white text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details <ChevronRight size={16} />
</div>
</div>
</motion.div>
          ))}
</div>
</section>

      {/* ══ FAQ ══ */}
      <section style={{ background: "#fff", padding: "7rem 4rem" }} className="section-pad">
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "6rem", alignItems: "start" }} className="two-col">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="section-label">FAQ</div>
            <h2 className="serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 500, color: "#1a1a2e", lineHeight: 1.15, marginBottom: "1.4rem" }}>
              Common <em style={{ color: "#c49138" }}>Questions</em>
            </h2>
            <p style={{ color: "#999", lineHeight: 1.88, fontSize: "0.88rem", fontWeight: 300, marginBottom: "2.5rem" }}>
              Still have questions? Our team in Ahmedabad is happy to guide you through products, installation, and custom options.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: Phone, label: "Call Us", val: "+91 85112 32318" },
                { icon: Mail, label: "Email", val: "info@taasaupvc.com" },
                { icon: MapPin, label: "Location", val: "Ahmedabad, Gujarat" },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} style={{ display: "flex", gap: "0.85rem", alignItems: "center" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fdf9f0", border: "1px solid rgba(196,145,56,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={15} color="#c49138" />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.58rem", letterSpacing: "0.15em", color: "#ccc", textTransform: "uppercase" }}>{label}</div>
                    <div style={{ fontSize: "0.87rem", color: "#1a1a2e", fontWeight: 500 }}>{val}</div>
                  </div>

                </div>
              ))}
            </div>
          </motion.div>
          <div>
            {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} idx={i} />)}
          </div>
        </div>
      </section>
      </>
  );
}