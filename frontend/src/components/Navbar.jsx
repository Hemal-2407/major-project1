import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Phone, Mail,
  ArrowUpRight, ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";

// ─── Data ────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { name: "The Platinum Collection", tag: "Premium", href: "/PlatinumCollection" },
  { name: "The Regular Collection",  tag: "Value",   href: "/regular-collection"  },
  { name: "WPC & PVC Louvers",       tag: "Décor",   href: "/louvers"             },
  { name: "uPVC Doors",              tag: "Safety",  href: "/doors"          },
  { name: "Modular Kitchens",        tag: "Popular", href: "/kitchen"             },
  { name: "Sliding Wardrobes",       tag: "Custom",  href: "/wardrobes"           },
  { name: "TV & Media Units",        tag: "Living",  href: "/tv-units"            },
  { name: "Office Cubicles",         tag: "Comml.",  href: "/office"              },
  { name: "uPVC Profiles",           tag: "B2B",     href: "/profiles"            },
  { name: "PVC Laminates",           tag: "Finish",  href: "/laminates"           },
  { name: "uPVC Fencing",            tag: "Outdoor", href: "/fencing"             },
  { name: "PVC Partitions",          tag: "Space",   href: "/partitions"          },
];

const NAV_LINKS = [
  { label: "Home",      href: "/"         },
  { label: "About Us",  href: "/about"    },
  { label: "Products", hasDropdown: true },
  { label: "Clientele", href: "/clientele"},
  { label: "Career",    href: "/career"   },
  { label: "Contact",   href: "/contact"  },
   { label: "Login",     href: "/login" } 
];

// ─── Top Bar ──────────────────────────────────────────────────────────────────
const TopBar = () => (
  <div style={{
    background: "linear-gradient(90deg,#1A1A2E,#16213E)",
    padding: "0.42rem 3rem",
    display: "flex", justifyContent: "space-between", alignItems: "center",
  }}>
    <div style={{ display: "flex", gap: "2rem" }}>
      {[
        { icon: <Phone size={11} color="#C49138" />, text: "+91 85112 32318", href: "tel:+918511232318" },
        { icon: <Mail  size={11} color="#C49138" />, text: "info@taasaupvc.com", href: "mailto:info@taasaupvc.com" },
      ].map(({ icon, text, href }) => (
        <a key={text} href={href} style={{
          display: "flex", alignItems: "center", gap: "0.45rem",
          fontSize: "0.7rem", color: "rgba(255,255,255,0.65)",
          letterSpacing: "0.04em", textDecoration: "none", transition: "color 0.3s",
        }}
          onMouseEnter={e => e.currentTarget.style.color = "#E8B84B"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.65)"}>
          {icon}{text}
        </a>
      ))}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} className="hide-mobile">
      <ShieldCheck size={11} color="#C49138" />
      <span style={{ fontSize: "0.64rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
        ISO Certified · 13+ Years of Excellence
      </span>
    </div>
  </div>
);


        {/* Desktop Menu - Focused on Customers */}
        <ul className="hidden md:flex items-center space-x-10">
          {["Home", "About", "Products", "Contact","Login"].map((item) => (
            <li key={item}>
              <Link 
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-500 transition-all group-hover:w-full"></span>
              </Link>
            </li>
          ))}
          </ul>
        
        
        
// ─── Logo ─────────────────────────────────────────────────────────────────────
const Logo = ({ light }) => (
  <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
    {/* <div style={{
      width: 40, height: 40,
      background: "linear-gradient(135deg,#C49138,#E8B84B)",
      borderRadius: "8px",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 4px 14px rgba(196,145,56,0.38)", flexShrink: 0,
    }}>
      <span style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontWeight: 700, fontSize: "1.15rem" }}>T</span>
    </div> */}
    <img 
            src="/images/logo.svg" 
            alt="TAASA Industries Logo" 
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110" 
          />
    {/* <div> */}
      {/* <div style={{
        fontFamily: "'Playfair Display',serif",
        fontSize: "1.32rem", fontWeight: 700,
        color: light ? "#1A1A2E" : "#fff",
        letterSpacing: "0.07em", lineHeight: 1,
        transition: "color 0.4s",
      }}>TAASA</div>
      <div style={{ fontSize: "0.46rem", letterSpacing: "0.36em", color: "#C49138", textTransform: "uppercase", marginTop: "2px" }}>
        Industries
      </div> */}
    {/* </div> */}
  </a>
);


// ─── Mega Menu ────────────────────────────────────────────────────────────────
const MegaMenu = ({ visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.22 }}
        style={{
          position: "absolute", top: "calc(100% + 12px)", left: "50%",
          transform: "translateX(-50%)",
          background: "#fff", borderRadius: "12px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.13), 0 0 0 1px rgba(196,145,56,0.1)",
          padding: "1.5rem", width: "680px", zIndex: 200,
        }}>
        {/* Caret */}
        <div style={{
          position: "absolute", top: -7, left: "50%", transform: "translateX(-50%) rotate(45deg)",
          width: 14, height: 14, background: "#fff",
          border: "1px solid rgba(196,145,56,0.12)",
          borderBottomColor: "transparent", borderRightColor: "transparent",
        }} />
        <p style={{ fontSize: "0.62rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#C49138", fontWeight: 600, marginBottom: "0.8rem", paddingBottom: "0.8rem", borderBottom: "1px solid #f0ead8" }}>
          Our Product Lines
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px" }}>
          {PRODUCTS.map(p => (
            <a key={p.name} href={p.href} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0.62rem 0.85rem", borderRadius: "6px",
              transition: "background 0.2s", textDecoration: "none", gap: "0.5rem",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#fdf6e3"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <span style={{ fontSize: "0.81rem", color: "#1A1A2E" }}>{p.name}</span>
              <span style={{
                fontSize: "0.52rem", letterSpacing: "0.08em", textTransform: "uppercase",
                background: "rgba(196,145,56,0.1)", color: "#C49138",
                padding: "2px 7px", borderRadius: "20px", fontWeight: 600, flexShrink: 0,
              }}>{p.tag}</span>
            </a>

          ))}
        </div>
        <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #f0ead8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.78rem", color: "#aaa" }}>Need something custom?</span>
          <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.74rem", fontWeight: 600, color: "#C49138", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Request a Quote <ArrowUpRight size={13} />
          </a>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Mobile Drawer ────────────────────────────────────────────────────────────
const MobileDrawer = ({ open, onClose }) => {
  const [prodOpen, setProdOpen] = useState(false);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1998 }} />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.76,0,0.24,1] }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0,
              width: "min(360px,92vw)", background: "#fff", zIndex: 1999,
              display: "flex", flexDirection: "column",
              boxShadow: "-10px 0 40px rgba(0,0,0,0.15)",
            }}>
            <div style={{ padding: "1.3rem 1.8rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0ead8" }}>
              <Logo light />
              <button onClick={onClose}><X size={22} color="#1A1A2E" /></button>
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  {link.hasDropdown ? (
                    <>
                      <button onClick={() => setProdOpen(!prodOpen)}
                        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.8rem", fontSize: "1rem", fontWeight: 500, color: "#1A1A2E", fontFamily: "'Outfit',sans-serif", borderBottom: "1px solid #f5f5f5" }}>
                        {link.label}
                        <motion.div animate={{ rotate: prodOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                          <ChevronDown size={16} color="#C49138" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {prodOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} style={{ overflow: "hidden", background: "#fdf9f0" }}>
                            {PRODUCTS.map(p => (
                              <a key={p.name} href={p.href} onClick={onClose}
                                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.72rem 2.4rem", fontSize: "0.86rem", color: "#444", textDecoration: "none", borderBottom: "1px solid rgba(196,145,56,0.07)" }}>
                                {p.name}
                                <span style={{ fontSize: "0.5rem", letterSpacing: "0.1em", background: "rgba(196,145,56,0.12)", color: "#C49138", padding: "2px 6px", borderRadius: "20px", fontWeight: 600 }}>{p.tag}</span>
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a href={link.href} onClick={onClose}
                      style={{ display: "block", padding: "1rem 1.8rem", fontSize: "1rem", fontWeight: 500, color: "#1A1A2E", borderBottom: "1px solid #f5f5f5", textDecoration: "none" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#C49138"}
                      onMouseLeave={e => e.currentTarget.style.color = "#1A1A2E"}>
                      {link.label}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
            <div style={{ padding: "1.4rem 1.8rem", borderTop: "1px solid #f0ead8", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <button className="btn-primary" style={{ width: "100%", justifyContent: "center", borderRadius: "6px" }}>Get a Free Quote</button>
              <a href="tel:+918511232318" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.8rem", background: "#fdf9f0", borderRadius: "4px", fontSize: "0.82rem", color: "#1A1A2E", fontWeight: 500, textDecoration: "none" }}>
                <Phone size={14} color="#C49138" /> +91 85112 32318
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ═══════════════════════════════════════════════════
// NAVBAR — Main Export
// Props:  transparent (bool) — use true on hero pages
// ═══════════════════════════════════════════════════
const Navbar = ({ transparent = false }) => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prodHover, setProdHover]   = useState(false);
  const hoverTimer = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isLight = !transparent || scrolled;

  return (
    <>
      {isLight && <TopBar />}

      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        style={{
          position: transparent ? "fixed" : "sticky",
          top: 0, left: 0, right: 0, zIndex: 999,
          background: isLight ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: isLight ? "blur(16px)" : "none",
          boxShadow: isLight ? "0 2px 20px rgba(0,0,0,0.07)" : "none",
          borderBottom: isLight ? "1px solid rgba(196,145,56,0.1)" : "none",
          transition: "background 0.4s, box-shadow 0.4s, border-color 0.4s",
          padding: "0 3rem", height: "70px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem",
        }}>

        <Logo light={isLight} />

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "0.1rem", alignItems: "center", flex: 1, justifyContent: "center" }}>
          {NAV_LINKS.map(link => (
            <div key={link.label} style={{ position: "relative" }}
              onMouseEnter={() => { if (link.hasDropdown) { clearTimeout(hoverTimer.current); setProdHover(true); } }}
              onMouseLeave={() => { if (link.hasDropdown) { hoverTimer.current = setTimeout(() => setProdHover(false), 130); } }}>
              <a href={link.href} style={{
                display: "inline-flex", alignItems: "center", gap: "4px",
                padding: "0.5rem 0.9rem",
                fontSize: "0.77rem", letterSpacing: "0.1em", textTransform: "uppercase",
                fontWeight: 500, color: isLight ? "#444" : "rgba(255,255,255,0.88)",
                textDecoration: "none", borderRadius: "4px",
                transition: "color 0.3s, background 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "#C49138"; e.currentTarget.style.background = "rgba(196,145,56,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = isLight ? "#444" : "rgba(255,255,255,0.88)"; e.currentTarget.style.background = "transparent"; }}>
                {link.label}
                {link.hasDropdown && (
                  <motion.div animate={{ rotate: prodHover ? 180 : 0 }} transition={{ duration: 0.24 }}>
                    <ChevronDown size={13} />
                  </motion.div>
                )}
              </a>
              {link.hasDropdown && (
                <div onMouseEnter={() => { clearTimeout(hoverTimer.current); setProdHover(true); }}
                  onMouseLeave={() => { hoverTimer.current = setTimeout(() => setProdHover(false), 130); }}>
                  <MegaMenu visible={prodHover} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", gap: "0.8rem", alignItems: "center", flexShrink: 0 }}>
          <a href="tel:+918511232318" className="hide-mobile"
            style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.76rem", color: isLight ? "#555" : "rgba(255,255,255,0.8)", textDecoration: "none", transition: "color 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#C49138"}
            onMouseLeave={e => e.currentTarget.style.color = isLight ? "#555" : "rgba(255,255,255,0.8)"}>
            <Phone size={13} color="#C49138" /> +91 85112 32318
          </a>
          <button className="btn-gold" style={{ padding: "0.58rem 1.4rem", border: "none", cursor: "pointer", fontSize: "0.73rem", letterSpacing: "0.1em", fontWeight: 600, color: "#fff", borderRadius: "4px" }}>
            GET QUOTE
          </button>
          <button onClick={() => setMobileOpen(true)} style={{ color: isLight ? "#1A1A2E" : "#fff" }}>
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Navbar;
