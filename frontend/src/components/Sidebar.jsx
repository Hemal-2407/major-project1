// ╔══════════════════════════════════════════════════════╗
// ║  TAASA INDUSTRIES — HeroSlider.jsx                    ║
// ║  Path: src/components/HeroSlider.jsx                  ║
// ║  Features:                                            ║
// ║   • Full-screen autoplay image carousel               ║
// ║   • Animated heading + subtext per slide              ║
// ║   • Ken Burns (zoom) effect on images                 ║
// ║   • Progress bar auto-advance                         ║
// ║   • Dot + arrow navigation                            ║
// ║   • Animated stats bar at bottom                      ║
// ╚══════════════════════════════════════════════════════╝

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Slide Data ──────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1900&q=85",
    label: "Platinum Collection",
    heading: ["Transforming", "Spaces"],
    headingItalic: "Beautifully.",
    sub: "India's trusted manufacturer of termite-proof, waterproof uPVC furniture. Built to last a lifetime.",
    cta: { label: "Explore Platinum", href: "/platinum-collection" },
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1900&q=85",
    label: "Modular Kitchens",
    heading: ["Premium uPVC", "Modular"],
    headingItalic: "Kitchens.",
    sub: "Zero swelling, zero warping — uPVC kitchen cabinetry that withstands steam and moisture for decades.",
    cta: { label: "View Kitchens", href: "/kitchen" },
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1900&q=85",
    label: "Sliding Wardrobes",
    heading: ["Luxury Sliding", "Wardrobe"],
    headingItalic: "Systems.",
    sub: "Space-saving wardrobe solutions in premium digital marble, wood grain & solid matte finishes.",
    cta: { label: "See Wardrobes", href: "/wardrobes" },
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1900&q=85",
    label: "Executive Doors",
    heading: ["Architectural", "uPVC"],
    headingItalic: "Doors.",
    sub: "Fire-rated, solid core uPVC doors — termite-proof and maintenance-free for life.",
    cta: { label: "View Doors", href: "/upvc-doors" },
  },
];

const STATS = [
  { n: "13+",  label: "Years of Excellence" },
  { n: "500+", label: "Projects Delivered"  },
  { n: "11",   label: "Product Lines"       },
  { n: "100+", label: "Design Finishes"     },
];

const DURATION = 6000; // ms per slide

// ─── Text animation variants ──────────────────────────────────────────────────
const wordVariants = {
  hidden:  { y: 80, opacity: 0 },
  visible: (i) => ({ y: 0, opacity: 1, transition: { delay: i * 0.14, duration: 0.95, ease: [0.76,0,0.24,1] } }),
  exit:    { y: -40, opacity: 0, transition: { duration: 0.4 } },
};

const fadeVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.5 + i * 0.12, duration: 0.7 } }),
  exit:    { opacity: 0, transition: { duration: 0.3 } },
};

// ─── Progress Bar ─────────────────────────────────────────────────────────────
const ProgressBar = ({ active, duration }) => (
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "rgba(255,255,255,0.15)", zIndex: 20 }}>
    <motion.div
      key={active}
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{ duration: duration / 1000, ease: "linear" }}
      style={{ height: "100%", background: "linear-gradient(90deg,#C49138,#E8B84B)" }}
    />
  </div>
);

// ─── Slide Content ────────────────────────────────────────────────────────────
const SlideContent = ({ slide }) => (
  <AnimatePresence mode="wait">
    <motion.div key={slide.id} style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", alignItems: "center", padding: "0 5rem" }}>
      <div style={{ maxWidth: "900px" }}>

        {/* Slide label */}
        <motion.div
          custom={0} variants={fadeVariants} initial="hidden" animate="visible" exit="exit"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem", background: "rgba(196,145,56,0.15)", border: "1px solid rgba(196,145,56,0.3)", padding: "0.35rem 1.1rem", borderRadius: "30px", marginBottom: "2rem" }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C49138", display: "inline-block" }} />
          <span style={{ fontSize: "0.66rem", letterSpacing: "0.32em", color: "#E8B84B", textTransform: "uppercase", fontWeight: 600 }}>
            {slide.label}
          </span>
        </motion.div>

        {/* Heading lines */}
        {slide.heading.map((line, i) => (
          <div key={i} style={{ overflow: "hidden" }}>
            <motion.h1
              custom={i} variants={wordVariants} initial="hidden" animate="visible" exit="exit"
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(3rem,8.5vw,7.5rem)",
                fontWeight: 500, color: "#fff",
                lineHeight: 1.04, letterSpacing: "-0.02em",
              }}>
              {line}
            </motion.h1>
          </div>
        ))}

        {/* Italic gold line */}
        <div style={{ overflow: "hidden" }}>
          <motion.h1
            custom={slide.heading.length} variants={wordVariants} initial="hidden" animate="visible" exit="exit"
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(3rem,8.5vw,7.5rem)",
              fontWeight: 500, fontStyle: "italic", color: "#E8B84B",
              lineHeight: 1.04, letterSpacing: "-0.02em",
            }}>
            {slide.headingItalic}
          </motion.h1>
        </div>

        {/* Sub text */}
        <motion.p
          custom={1} variants={fadeVariants} initial="hidden" animate="visible" exit="exit"
          style={{ marginTop: "1.8rem", fontSize: "clamp(0.88rem,1.3vw,1.05rem)", color: "rgba(255,255,255,0.6)", maxWidth: "480px", lineHeight: 1.9, fontWeight: 300, marginBottom: "2.5rem" }}>
          {slide.sub}
        </motion.p>

        {/* Buttons */}
        <motion.div
          custom={2} variants={fadeVariants} initial="hidden" animate="visible" exit="exit"
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href={slide.cta.href} className="btn-primary">
            {slide.cta.label} <ArrowUpRight size={15} />
          </a>
          <a href="/contact" className="btn-outline-white">
            Request a Quote
          </a>
        </motion.div>
      </div>
    </motion.div>
  </AnimatePresence>
);

// ═══════════════════════════════════════════════════
// HERO SLIDER — Main Export
// ═══════════════════════════════════════════════════
const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);
  const timer = useRef(null);

  const goTo = useCallback((idx) => {
    setCurrent((idx + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(next, DURATION);
    return () => clearTimeout(timer.current);
  }, [current, paused, next]);

  return (
    <section
      style={{ position: "relative", height: "100vh", overflow: "hidden", minHeight: "600px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>

      {/* ── Background images with Ken Burns ── */}
      {SLIDES.map((slide, i) => (
        <AnimatePresence key={slide.id}>
          {i === current && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              style={{ position: "absolute", inset: 0, zIndex: 1 }}>
              <motion.img
                src={slide.img}
                alt={slide.label}
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: DURATION / 1000 + 0.5, ease: "linear" }}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
              />
              {/* Overlays */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg,rgba(10,8,4,0.88) 0%,rgba(10,8,4,0.55) 50%,rgba(10,8,4,0.2) 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "320px", background: "linear-gradient(to top, rgba(196,145,56,0.06), transparent)" }} />
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {/* ── Slide text content ── */}
      <SlideContent slide={SLIDES[current]} />

      {/* ── Vertical slide counter (right side) ── */}
      <div style={{
        position: "absolute", right: "3rem", top: "50%",
        transform: "translateY(-50%)", zIndex: 20,
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem",
      }} className="hide-mobile">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            style={{
              width: i === current ? "28px" : "4px",
              height: "4px",
              borderRadius: "4px",
              background: i === current ? "#C49138" : "rgba(255,255,255,0.35)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "width 0.4s ease, background 0.4s ease",
            }} />
        ))}
        <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)", marginTop: "0.4rem" }} />
        <span style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", writingMode: "vertical-rl", textTransform: "uppercase" }}>Scroll</span>
      </div>

      {/* ── Slide number (top right) ── */}
      <div style={{ position: "absolute", top: "6rem", right: "3rem", zIndex: 20 }} className="hide-mobile">
        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "3.5rem", fontWeight: 300, color: "rgba(255,255,255,0.08)", lineHeight: 1 }}>
          0{current + 1}
        </span>
      </div>

      {/* ── Prev / Next arrows ── */}
      {[
        { dir: "prev", fn: prev, icon: <ChevronLeft  size={22} />, style: { left:  "2rem" } },
        { dir: "next", fn: next, icon: <ChevronRight size={22} />, style: { right: "2rem" } },
      ].map(({ dir, fn, icon, style }) => (
        <button key={dir} onClick={fn}
          style={{
            position: "absolute", bottom: "6rem", zIndex: 20,
            width: 48, height: 48, borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(8px)",
            transition: "background 0.3s, border-color 0.3s, transform 0.3s",
            ...style,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(196,145,56,0.7)"; e.currentTarget.style.borderColor = "#C49138"; e.currentTarget.style.transform = "scale(1.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.transform = "scale(1)"; }}>
          {icon}
        </button>
      ))}

      {/* ── Stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(14px)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "1.4rem 5rem",
          display: "flex", justifyContent: "flex-end", gap: "3.5rem", flexWrap: "wrap",
        }}>
        {STATS.map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", color: "#E8B84B", fontWeight: 500, lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontSize: "0.57rem", letterSpacing: "0.16em", color: "rgba(255,255,255,0.42)", textTransform: "uppercase", marginTop: "4px" }}>{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* ── Progress bar ── */}
      <ProgressBar active={current} duration={paused ? 99999 : DURATION} />
    </section>
  );
};

export default HeroSlider;
