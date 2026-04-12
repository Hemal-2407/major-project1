// ╔══════════════════════════════════════════════════════════════╗
// ║  TAASA INDUSTRIES — UPVCDoors.jsx                            ║
// ║  Path: src/pages/UPVCDoors.jsx                               ║
// ║                                                              ║
// ║  Sections:                                                   ║
// ║   1.  Navbar                                                 ║
// ║   2.  Hero Banner with breadcrumb                            ║
// ║   3.  Intro — Who We Are                                     ║
// ║   4.  Door Types Grid (Hollow, Panel, Glass, etc.)           ║
// ║   5.  Benefits of uPVC Doors (6 cards)                       ║
// ║   6.  Why TAASA — 3-column trust section                     ║
// ║   7.  Full-bleed image CTA                                   ║
// ║   8.  Product Features (9 icon badges)                       ║
// ║   9.  FAQ Accordion (6 questions)                            ║
// ║   10. Inquiry Form                                           ║
// ║   11. Related Products                                       ║
// ║   12. Footer                                                 ║
// ╚══════════════════════════════════════════════════════════════╝

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ArrowUpRight, Phone, Mail, MapPin,
  ShieldCheck, Droplets, Bug, Flame, Leaf, Zap, Star,
  Sparkles, Send, CheckCircle, X,
  Wind, Lock, Recycle, Thermometer, Palette, Wrench
} from "lucide-react";

/* ─── Design Tokens ────────────────────────────────────────────────────────── */
const G = {
  gold:      "#C49138",
  goldLight: "#E8B84B",
  goldPale:  "#FDF6E3",
  goldPale2: "#FDF9F0",
  dark:      "#1A1A2E",
  dark2:     "#16213E",
  white:     "#FFFFFF",
  cream:     "#F8F5EE",
  gray:      "#6B6B80",
  grayLight: "#AAAABC",
  border:    "rgba(196,145,56,0.15)",
  serif:     "'Playfair Display', Georgia, serif",
  sans:      "'Outfit', system-ui, sans-serif",
};

/* ─── Google Fonts + Global CSS ────────────────────────────────────────────── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Outfit', sans-serif; background: #fff; color: #1A1A2E; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
    img  { display: block; max-width: 100%; }
    a    { text-decoration: none; color: inherit; }
    ::selection { background: rgba(196,145,56,0.22); }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track  { background: #f8f5ee; }
    ::-webkit-scrollbar-thumb  { background: #C49138; border-radius: 2px; }

    /* Marquee */
    @keyframes mq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .mq-wrap { overflow: hidden; }
    .mq-track { display: flex; animation: mq 32s linear infinite; width: max-content; }
    .mq-track:hover { animation-play-state: paused; }

    /* Buttons */
    .btn-gold {
      display: inline-flex; align-items: center; gap: .5rem;
      padding: .9rem 2.2rem; border: none; cursor: pointer;
      background: linear-gradient(135deg, #C49138 0%, #E8B84B 50%, #C49138 100%);
      background-size: 200% auto; color: #fff;
      font-family: 'Outfit', sans-serif; font-size: .78rem;
      font-weight: 600; letter-spacing: .13em; text-transform: uppercase;
      border-radius: 4px;
      box-shadow: 0 6px 22px rgba(196,145,56,.38);
      transition: background-position .5s, transform .2s, box-shadow .3s;
    }
    .btn-gold:hover { background-position: right center; transform: translateY(-2px); box-shadow: 0 10px 32px rgba(196,145,56,.52); }

    .btn-outline {
      display: inline-flex; align-items: center; gap: .5rem;
      padding: .9rem 2.2rem; background: transparent; color: #fff;
      font-family: 'Outfit', sans-serif; font-size: .78rem;
      font-weight: 600; letter-spacing: .13em; text-transform: uppercase;
      border: 1.5px solid rgba(255,255,255,.35); border-radius: 4px; cursor: pointer;
      transition: background .3s, border-color .3s;
    }
    .btn-outline:hover { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.65); }

    /* Cards */
    .card-lift { transition: transform .38s cubic-bezier(.23,1,.32,1), box-shadow .38s; }
    .card-lift:hover { transform: translateY(-8px); box-shadow: 0 28px 56px rgba(0,0,0,.12); }

    /* Door type card */
    .door-card { transition: transform .4s cubic-bezier(.23,1,.32,1), box-shadow .4s; overflow: hidden; border-radius: 12px; cursor: pointer; }
    .door-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 32px 64px rgba(0,0,0,.15); }
    .door-card img { transition: transform .65s cubic-bezier(.23,1,.32,1); }
    .door-card:hover img { transform: scale(1.08); }
    .door-card .door-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(20,16,8,.88) 0%, rgba(20,16,8,.1) 55%, transparent 100%); }

    /* Feature icon */
    .feat-icon { transition: background .35s, box-shadow .35s; }
    .feat-card:hover .feat-icon { background: linear-gradient(135deg,#C49138,#E8B84B) !important; box-shadow: 0 8px 24px rgba(196,145,56,.42) !important; }
    .feat-card:hover .feat-icon svg { color: #fff !important; }
    .feat-card { transition: transform .38s, box-shadow .38s; }
    .feat-card:hover { transform: translateY(-6px); box-shadow: 0 24px 52px rgba(0,0,0,.09); }

    /* Benefit card */
    .benefit-card { transition: transform .35s, box-shadow .35s, border-color .35s; }
    .benefit-card:hover { transform: translateY(-7px); box-shadow: 0 24px 52px rgba(196,145,56,.12); border-color: rgba(196,145,56,.4) !important; }
    .benefit-card:hover .ben-num { color: #C49138 !important; }

    /* Form input */
    .f-input {
      width: 100%; padding: .88rem 1.1rem;
      border: 1.5px solid #e8e0d0; border-radius: 6px;
      font-family: 'Outfit', sans-serif; font-size: .88rem; color: #1A1A2E;
      background: #fff; outline: none;
      transition: border-color .3s, box-shadow .3s;
    }
    .f-input:focus { border-color: #C49138; box-shadow: 0 0 0 3px rgba(196,145,56,.1); }
    .f-input::placeholder { color: #bbb; }

    /* FAQ */
    .faq-item:hover .faq-q { color: #C49138 !important; }

    /* Float */
    @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    .float-badge { animation: floatBadge 4.5s ease-in-out infinite; }

    /* Why card accent line */
    .why-card::before {
      content: ''; display: block; width: 0; height: 3px;
      background: linear-gradient(90deg,#C49138,#E8B84B);
      transition: width .4s ease;
      margin-bottom: 1.4rem; border-radius: 2px;
    }
    .why-card:hover::before { width: 48px; }

    /* Responsive */
    @media (max-width: 1024px) {
      .g4 { grid-template-columns: repeat(2,1fr) !important; }
    }
    @media (max-width: 768px) {
      .g2, .g3 { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
      .g4 { grid-template-columns: 1fr 1fr !important; }
      .hero-title { font-size: 2.8rem !important; }
      .sec { padding: 4.5rem 1.6rem !important; }
      .hide-m { display: none !important; }
    }
    @media (max-width: 540px) {
      .g4 { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

/* ─── Helpers ──────────────────────────────────────────────────────────────── */
const FadeUp = ({ children, delay = 0, style = {} }) => (
  <motion.div
    initial={{ opacity: 0, y: 34 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: .72, delay, ease: [.23, 1, .32, 1] }}
    style={style}>
    {children}
  </motion.div>
);

const SLabel = ({ children, center }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: ".9rem", justifyContent: center ? "center" : "flex-start" }}>
    <span style={{ display: "block", width: 26, height: 1.5, background: G.gold, flexShrink: 0 }} />
    <span style={{ fontSize: ".66rem", letterSpacing: ".42em", textTransform: "uppercase", color: G.gold, fontWeight: 600, fontFamily: G.sans }}>
      {children}
    </span>
  </div>
);

/* ─── Counter ──────────────────────────────────────────────────────────────── */
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
    }, { threshold: .5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
const DOOR_TYPES = [
  {
    name: "Hollow uPVC Doors",
    tag: "Lightweight · Durable",
    desc: "Ideal for interior spaces. Lightweight hollow-core construction with premium uPVC shell for lasting performance.",
    img: "https://www.taasaupvcprofile.com/sub-images/hollow-upvc-doors.jpg",
    href: "/Products",
  },
  {
    name: "Hollow uPVC Doors",
    tag: "Classic · Solid",
    desc: "Traditional panel design with modern uPVC engineering — perfect for main entrances and premium residential projects.",
    img: "https://www.taasaupvcprofile.com/sub-images/hollow-upvc-doors-2.jpg",
    href: "/Products",
  },
  {
    name: "Hollow uPVC Doors",
    tag: "Modern · Bright",
    desc: "Let natural light flow through with elegant glass inserts set in strong uPVC frames — for balconies and living areas.",
    img: "https://www.taasaupvcprofile.com/sub-images/hollow-upvc-doors-1.jpg",
    href: "/Products",
  },
  // {
  //   name: "Sliding uPVC Doors",
  //   tag: "Space-Saving · Smooth",
  //   desc: "Precision-engineered sliding systems for terraces, balconies and large openings with effortless glide action.",
  //   img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=700&q=85",
  //   href: "/sliding-upvc-doors",
  // },
  // {
  //   name: "Folding uPVC Doors",
  //   tag: "Flexible · Open-Plan",
  //   desc: "Bi-fold and accordion designs that open up spaces completely — ideal for connecting indoors to outdoor living areas.",
  //   img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=85",
  //   href: "/folding-upvc-doors",
  // },
  // {
  //   name: "Bathroom uPVC Doors",
  //   tag: "Waterproof · Hygienic",
  //   desc: "100% waterproof uPVC doors designed specifically for bathrooms, wet rooms, and high-humidity environments.",
  //   img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700&q=85",
  //   href: "/bathroom-upvc-doors",
  // },
];

const BENEFITS = [
  { num: "01", Icon: Wind,        title: "Extra Durable",          desc: "Withstands tough weather, UV rays, and daily wear and tear. Preserves beauty and functionality for decades to come." },
  { num: "02", Icon: Thermometer, title: "Energy Efficient",        desc: "Maintains indoor temperature, minimises energy consumption and reduces heating & cooling costs significantly." },
  { num: "03", Icon: Wrench,      title: "Very Low Maintenance",    desc: "Resistant to fading, warping, and corrosion. Simply wipe clean with soap and water — no painting required ever." },
  { num: "04", Icon: Lock,        title: "Reinforced Security",     desc: "Strong multi-point locking frames prove as a highly effective barrier against forced entry and intruders." },
  { num: "05", Icon: Recycle,     title: "Eco-Friendly",           desc: "As a conscious PVC products manufacturer, we use recyclable materials ensuring minimal ecological footprint." },
  { num: "06", Icon: Palette,     title: "Wide Customisation",      desc: "Extensive range of colours, styles, and configurations to create your perfect door design for any space." },
];

const FEATURES = [
  { Icon: Bug,         title: "100% Termite & Borer Proof"  },
  { Icon: Flame,       title: "Fire Retardant"              },
  { Icon: Leaf,        title: "Non Toxic"                   },
  { Icon: Droplets,    title: "Waterproof for Lifetime"     },
  { Icon: ShieldCheck, title: "Bacteria & Fungus Resistant" },
  { Icon: Zap,         title: "Washable"                    },
  { Icon: Star,        title: "Zero Maintenance"            },
  { Icon: Sparkles,    title: "Fast Installation"           },
  { Icon: Palette,     title: "Wide Range of Designs"       },
];

const WHY = [
  {
    icon: "🏆",
    title: "13+ Years of Excellence",
    desc: "Since 2010, TAASA Industries has been a trusted name in uPVC manufacturing — backed by thousands of satisfied customers across India.",
  },
  {
    icon: "🔬",
    title: "Grade-A Raw Materials",
    desc: "Every door is crafted from the finest Grade-A uPVC compound, ensuring superior structural integrity, colour fastness, and longevity.",
  },
  {
    icon: "🎨",
    title: "Custom Design Options",
    desc: "We understand every space is unique. Choose from 100+ colours, finishes, glass options, and hardware combinations to match your vision.",
  },
  {
    icon: "🚚",
    title: "Pan-India Delivery",
    desc: "Reliable logistics network across India ensures your order is delivered on time, every time — from Ahmedabad to any state.",
  },
  {
    icon: "🤝",
    title: "Expert Consultation",
    desc: "Our experienced team guides you from product selection through installation — ensuring the perfect fit for your application.",
  },
  {
    icon: "✅",
    title: "Quality Guaranteed",
    desc: "Every product undergoes strict quality checks. We stand behind our craftsmanship with comprehensive after-sales support.",
  },
];

const FAQS = [
  { q: "How to choose the right uPVC door for my home?",    a: "Connect with our UPVC door experts who will guide you in selecting the right door based on your specific conditions, space dimensions, and design preferences. You can book a free consultation with our team today." },
  { q: "Are uPVC doors water-resistant?",                    a: "Yes, absolutely! uPVC is inherently waterproof. Our doors will never swell, warp, or rot due to moisture — making them ideal for coastal areas, bathrooms, kitchens, and regions with high rainfall." },
  { q: "Does a coloured uPVC door fade after a few years?",  a: "No. Unlike painted or coated wooden doors, uPVC doors are colour-through — the colour is embedded in the material itself using UV-stable pigments. They retain their appearance for 25+ years." },
  { q: "Are uPVC doors energy-efficient?",                   a: "Yes! uPVC is a natural thermal insulator. Our doors help maintain indoor temperatures by preventing heat transfer, reducing your dependency on air conditioning and heating — saving significant energy costs." },
  { q: "Do uPVC doors require a lot of maintenance?",        a: "No, uPVC doors are extremely low-maintenance. They never need painting, polishing, or sealing. An occasional wipe with soap and water keeps them looking brand new for decades." },
  { q: "Are uPVC doors secure?",                             a: "Yes, absolutely! TAASA's uPVC doors feature reinforced frames and multi-point locking systems that provide a high level of security against forced entry — far superior to standard wooden or hollow-core doors." },
];

// const RELATED = [
//   { name: "Hollow uPVC Doors",    img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=500&q=80", href: "/hollow-upvc-doors"    },
//   { name: "Platinum Collection",  img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80", href: "/platinum-collection"  },
//   { name: "Modular Kitchens",     img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80",    href: "/kitchen"             },
//   { name: "Sliding Wardrobes",    img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&q=80", href: "/wardrobes"           },
// ];

const RELATED = [
  { name: "The Regular Collection", img: "/images/the-regular-pr-1-main.webp", href: "/Products" },
  { name: "WPC & PVC Louvers",      img: "/images/wpc-pvc-louvers.webp", href: "/Products" },
  { name: "Modular Kitchens",       img: "/images/commercialspaces.webp", href: "/Products" },
  { name: "Sliding Wardrobes",      img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80", href: "/Products" },
];

/* ─── Navbar ───────────────────────────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [prodOpen,   setProdOpen]   = useState(false);
  const hoverTimer = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 44);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const PROD_LINKS = [
    "The Platinum Collection","The Regular Collection","WPC & PVC Louvers",
    "uPVC Doors","WPC (Wood Polymer Composite)","uPVC Kitchen Cabinet",
    "uPVC Profile","Sliding Wardrobe Cabinet","PVC Laminates Sheet","uPVC Fencing","PVC Partition",
  ];

  return (
    <>
      {/* Top bar */}
      {/* <div style={{ background: `linear-gradient(90deg,${G.dark},${G.dark2})`, padding: ".4rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[{icon:<Phone size={11}/>, text:"+91 85112 32318", href:"tel:+918511232318"},{icon:<Mail size={11}/>, text:"info@taasaupvc.com", href:"mailto:info@taasaupvc.com"}].map(({icon,text,href})=>(
            <a key={text} href={href} style={{ display:"flex",alignItems:"center",gap:".4rem",fontSize:".7rem",color:"rgba(255,255,255,.6)",transition:"color .3s" }}
              onMouseEnter={e=>e.currentTarget.style.color="#E8B84B"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.6)"}>
              <span style={{color:G.gold}}>{icon}</span>{text}
            </a>
          ))}
        </div>
        <span className="hide-m" style={{ fontSize:".62rem",color:"rgba(255,255,255,.38)",letterSpacing:".18em",textTransform:"uppercase" }}>
          Trusted uPVC Manufacturer · Ahmedabad, India
        </span>
      </div> */}

      {/* Main nav */}
      {/* <motion.nav initial={{y:-68,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.65}}
        style={{
          position:"sticky",top:0,zIndex:999,
          background:"rgba(255,255,255,.97)",backdropFilter:"blur(16px)",
          boxShadow: scrolled?"0 2px 20px rgba(0,0,0,.08)":"0 1px 0 rgba(196,145,56,.1)",
          transition:"box-shadow .4s",
          padding:"0 3rem",height:68,
          display:"flex",alignItems:"center",justifyContent:"space-between",
        }}>

        {/* Logo */}
        {/* <a href="/" style={{display:"flex",alignItems:"center",gap:".7rem"}}>
          <div style={{width:38,height:38,background:"linear-gradient(135deg,#C49138,#E8B84B)",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 14px rgba(196,145,56,.36)"}}>
            <span style={{fontFamily:G.serif,color:"#fff",fontWeight:700,fontSize:"1.1rem"}}>T</span>
          </div>
          <div>
            <div style={{fontFamily:G.serif,fontSize:"1.26rem",fontWeight:700,color:G.dark,letterSpacing:".06em",lineHeight:1}}>TAASA</div>
            <div style={{fontSize:".44rem",letterSpacing:".34em",color:G.gold,textTransform:"uppercase",marginTop:2}}>Industries</div>
          </div>
        </a> */} 

        {/* Desktop links */}
        {/* <nav className="hide-m" style={{display:"flex",gap:".1rem",flex:1,justifyContent:"center"}}>
          {["Home","About Us","Products","Clientele","Career","Contact"].map(l=>(
            <div key={l} style={{position:"relative"}}
              onMouseEnter={()=>{if(l==="Products"){clearTimeout(hoverTimer.current);setProdOpen(true);}}}
              onMouseLeave={()=>{if(l==="Products"){hoverTimer.current=setTimeout(()=>setProdOpen(false),130);}}}>
              <a href={l==="Home"?"/":`/${l.toLowerCase().replace(/ /g,"-")}`}
                style={{display:"inline-flex",alignItems:"center",gap:3,padding:".48rem .85rem",fontSize:".76rem",letterSpacing:".1em",textTransform:"uppercase",fontWeight:500,color:"#555",borderRadius:4,transition:"color .3s,background .3s"}}
                onMouseEnter={e=>{e.currentTarget.style.color=G.gold;e.currentTarget.style.background="rgba(196,145,56,.06)";}}
                onMouseLeave={e=>{e.currentTarget.style.color="#555";e.currentTarget.style.background="transparent";}}>
                {l}{l==="Products"&&<ChevronRight size={12} style={{rotate:prodOpen?"90deg":"0",transition:"rotate .25s"}}/>}
              </a> */}
              {/* Products dropdown */}
              {/* {l==="Products"&&(
                <AnimatePresence>
                  {prodOpen&&(
                    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}} transition={{duration:.22}}
                      onMouseEnter={()=>{clearTimeout(hoverTimer.current);setProdOpen(true);}}
                      onMouseLeave={()=>{hoverTimer.current=setTimeout(()=>setProdOpen(false),130);}}
                      style={{position:"absolute",top:"calc(100% + 10px)",left:"50%",transform:"translateX(-50%)",background:"#fff",borderRadius:10,boxShadow:"0 20px 60px rgba(0,0,0,.12)",padding:"1.2rem",minWidth:300,zIndex:200,border:`1px solid ${G.border}`}}>
                      {PROD_LINKS.map(p=>(
                        <a key={p} href={`/${p.toLowerCase().replace(/[\s&()]/g,"-").replace(/-+/g,"-")}`}
                          style={{display:"block",padding:".58rem .9rem",fontSize:".82rem",color:G.dark,borderRadius:6,transition:"background .2s,color .2s"}}
                          onMouseEnter={e=>{e.currentTarget.style.background=G.goldPale;e.currentTarget.style.color=G.gold;}}
                          onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=G.dark;}}>
                          {p}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav> */}

        {/* <div style={{display:"flex",gap:".8rem",alignItems:"center"}}>
          <a href="tel:+918511232318" className="hide-m"
            style={{display:"flex",alignItems:"center",gap:".4rem",fontSize:".75rem",color:"#666",transition:"color .3s"}}
            onMouseEnter={e=>e.currentTarget.style.color=G.gold} onMouseLeave={e=>e.currentTarget.style.color="#666"}>
            <Phone size={13} color={G.gold}/> +91 85112 32318
          </a>
          <a href="#inquiry" className="btn-gold" style={{padding:".52rem 1.28rem",fontSize:".71rem"}}>
            Quick Enquiry <ArrowUpRight size={12}/>
          </a>
          <button onClick={()=>setMenuOpen(true)} style={{color:G.dark}}><Menu size={21}/></button>
        </div>
      </motion.nav> */}

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen&&(
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setMenuOpen(false)}
              style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",zIndex:1998}}/>
            <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{duration:.4,ease:[.76,0,.24,1]}}
              style={{position:"fixed",top:0,right:0,bottom:0,width:"min(340px,92vw)",background:"#fff",zIndex:1999,display:"flex",flexDirection:"column"}}>
              <div style={{padding:"1.3rem 1.8rem",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${G.goldPale}`}}>
                <span style={{fontFamily:G.serif,fontSize:"1.3rem",color:G.dark}}>TAASA</span>
                <button onClick={()=>setMenuOpen(false)}><X size={22} color={G.dark}/></button>
              </div>
              <div style={{flex:1,overflowY:"auto"}}>
                {["Home","About Us","Products","Clientele","Career","Contact"].map((l,i)=>(
                  <motion.a key={l} href={l==="Home"?"/":`/${l.toLowerCase().replace(/ /g,"-")}`}
                    initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:i*.06}}
                    onClick={()=>setMenuOpen(false)}
                    style={{display:"block",padding:"1rem 1.8rem",fontSize:"1rem",fontWeight:500,color:G.dark,borderBottom:"1px solid #f5f5f5"}}
                    onMouseEnter={e=>e.currentTarget.style.color=G.gold} onMouseLeave={e=>e.currentTarget.style.color=G.dark}>
                    {l}
                  </motion.a>
                ))}
              </div>
              <div style={{padding:"1.4rem 1.8rem",borderTop:`1px solid ${G.goldPale}`,display:"flex",flexDirection:"column",gap:".8rem"}}>
                <a href="#inquiry" className="btn-gold" style={{justifyContent:"center",borderRadius:6}} onClick={()=>setMenuOpen(false)}>Get a Free Quote</a>
                <a href="tel:+918511232318" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:".5rem",padding:".8rem",background:G.goldPale2,borderRadius:4,fontSize:".82rem",color:G.dark,fontWeight:500}}>
                  <Phone size={14} color={G.gold}/> +91 85112 32318
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

/* ─── Inquiry Form ─────────────────────────────────────────────────────────── */
const InquiryForm = () => {
  const [form,    setForm]    = useState({ name:"",company:"",phone:"",email:"",message:"" });
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const update = k => e => setForm(f => ({...f, [k]: e.target.value}));
  const submit = e => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) return (
    <motion.div initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}}
      style={{textAlign:"center",padding:"3.5rem 2rem"}}>
      <div style={{width:68,height:68,borderRadius:"50%",background:`linear-gradient(135deg,${G.gold},${G.goldLight})`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1.4rem",boxShadow:`0 12px 32px rgba(196,145,56,.4)`}}>
        <CheckCircle size={30} color="#fff"/>
      </div>
      <h3 style={{fontFamily:G.serif,fontSize:"1.7rem",color:G.dark,marginBottom:".7rem"}}>Thank You!</h3>
      <p style={{color:G.gray,fontSize:".9rem",lineHeight:1.8}}>Your inquiry has been received. Our team will contact you within 24 hours.</p>
      <button onClick={()=>setSent(false)} className="btn-gold" style={{marginTop:"1.8rem"}}>Send Another Enquiry</button>
    </motion.div>
  );

  return (
    <form onSubmit={submit} style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
        {[["name","Your Name *","Full name",true],["company","Company","Company name",false]].map(([k,label,ph,req])=>(
          <div key={k}>
            <label style={{fontSize:".7rem",letterSpacing:".12em",textTransform:"uppercase",color:"#aaa",display:"block",marginBottom:".42rem",fontWeight:600}}>{label}</label>
            <input className="f-input" value={form[k]} onChange={update(k)} placeholder={ph} required={req}/>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
        {[["phone","Phone *","+91 XXXXX XXXXX",true],["email","Email *","your@email.com",true]].map(([k,label,ph,req])=>(
          <div key={k}>
            <label style={{fontSize:".7rem",letterSpacing:".12em",textTransform:"uppercase",color:"#aaa",display:"block",marginBottom:".42rem",fontWeight:600}}>{label}</label>
            <input className="f-input" type={k==="email"?"email":"text"} value={form[k]} onChange={update(k)} placeholder={ph} required={req}/>
          </div>
        ))}
      </div>
      <div>
        <label style={{fontSize:".7rem",letterSpacing:".12em",textTransform:"uppercase",color:"#aaa",display:"block",marginBottom:".42rem",fontWeight:600}}>Message</label>
        <textarea className="f-input" rows={4} value={form.message} onChange={update("message")}
          placeholder="Tell us about your project — door type, dimensions, quantity, finish preferences…"
          style={{resize:"vertical",minHeight:105}}/>
      </div>
      <button type="submit" className="btn-gold" style={{justifyContent:"center",cursor:loading?"wait":"pointer"}}>
        {loading
          ? <motion.div animate={{rotate:360}} transition={{duration:1,repeat:Infinity,ease:"linear"}} style={{width:17,height:17,border:"2px solid rgba(255,255,255,.35)",borderTopColor:"#fff",borderRadius:"50%"}}/>
          : <><Send size={14}/>Submit Inquiry</>}
      </button>
    </form>
  );
};

/* ─── FAQ Item ─────────────────────────────────────────────────────────────── */
const FaqItem = ({ q, a, idx }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:idx*.07}}
      className="faq-item" style={{borderBottom:`1px solid #EEEEE9`}}>
      <button onClick={()=>setOpen(!open)}
        style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1.3rem 0",background:"none",border:"none",cursor:"pointer",gap:"1rem",textAlign:"left",fontFamily:G.sans}}>
        <span className="faq-q" style={{fontSize:".94rem",fontWeight:500,color:open?G.gold:G.dark,transition:"color .3s",lineHeight:1.4}}>{q}</span>
        <motion.span animate={{rotate:open?45:0}} transition={{duration:.28}}
          style={{fontSize:"1.45rem",color:G.gold,lineHeight:1,flexShrink:0,fontWeight:300}}>+</motion.span>
      </button>
      <AnimatePresence>
        {open&&(
          <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.33}} style={{overflow:"hidden"}}>
            <p style={{paddingBottom:"1.3rem",fontSize:".88rem",color:G.gray,lineHeight:1.88,fontWeight:300}}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function UPVCDoors() {
  return (
    <>
      <Styles/>
      <Navbar/>

      {/* ══════════════ 2. HERO BANNER ══════════════ */}
      <section style={{position:"relative",height:440,overflow:"hidden",display:"flex",alignItems:"flex-end"}}>
        <motion.img
          initial={{scale:1.1}} animate={{scale:1}} transition={{duration:1.3}}
          src="/images/samantha-internal-pvc-panelled-directdoors.webp"
          alt="uPVC Doors"
          style={{position:"absolute",inset:0,width:"85%",height:"100%",objectFit:"cover",objectPosition:"center 40%"}}
        />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(110deg,rgba(10,8,4,.9) 0%,rgba(10,8,4,.55) 58%,rgba(10,8,4,.2) 100%)"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:220,background:`linear-gradient(to top,rgba(196,145,56,.06),transparent)`}}/>

        <div style={{position:"relative",zIndex:10,padding:"0 4rem 3.5rem",width:"100%"}}>
          {/* Breadcrumb */}
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.3}}
            style={{display:"flex",alignItems:"center",gap:".4rem",marginBottom:"1.1rem"}}>
            {[{l:"Home",h:"/"},{l:"Products",h:"/products"},{l:"uPVC Doors",h:null}].map((b,i,arr)=>(
              <React.Fragment key={b.l}>
                {b.h
                  ? <a href={b.h} style={{fontSize:".7rem",color:"rgba(255,255,255,.5)",letterSpacing:".08em"}}
                      onMouseEnter={e=>e.currentTarget.style.color="#E8B84B"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.5)"}>{b.l}</a>
                  : <span style={{fontSize:".7rem",color:"#E8B84B",letterSpacing:".08em"}}>{b.l}</span>}
                {i<arr.length-1&&<ChevronRight size={11} color="rgba(255,255,255,.3)"/>}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Title */}
          {[{t:"uPVC Doors",italic:false},{t:"Manufacturer",italic:false},{t:"& Supplier",italic:true}].map((line,i)=>(
            <div key={i} style={{overflow:"hidden"}}>
              <motion.h1 initial={{y:90}} animate={{y:0}} transition={{delay:.38+i*.14,duration:1,ease:[.76,0,.24,1]}}
                className="hero-title"
                style={{fontFamily:G.serif,fontSize:"clamp(2.6rem,6vw,5rem)",fontWeight:line.italic?400:500,fontStyle:line.italic?"italic":"normal",color:line.italic?"#E8B84B":"#fff",lineHeight:1.06,letterSpacing:"-.02em"}}>
                {line.t}
              </motion.h1>
            </div>
          ))}

          <motion.p initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.85}}
            style={{marginTop:"1rem",fontSize:"clamp(.85rem,1.2vw,1rem)",color:"rgba(255,255,255,.58)",maxWidth:480,lineHeight:1.88,fontWeight:300}}>
            India's trusted UPVC door suppliers and manufacturer — crafting elegant, durable uPVC doors for residential and commercial spaces since 2010.
          </motion.p>
        </div>

        {/* Gold stripe */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:4,background:`linear-gradient(90deg,${G.gold},${G.goldLight},${G.gold})`}}/>
      </section>

      {/* ══════════════ MARQUEE ══════════════ */}
      <div style={{background:`linear-gradient(90deg,${G.gold},#E8C055,${G.gold})`,padding:".85rem 0"}} className="mq-wrap">
        <div className="mq-track">
          {Array(2).fill(["UPVC Door Suppliers","uPVC Doors Manufacturer","Poly Plast PVC Doors","Waterproof Lifetime","Termite Proof","Fire Retardant","Zero Maintenance","Energy Efficient","Pan India Delivery","Custom Designs"]).flat().map((t,i)=>(
            <span key={i} style={{whiteSpace:"nowrap",padding:"0 2.5rem",fontSize:".68rem",letterSpacing:".28em",textTransform:"uppercase",color:"rgba(255,255,255,.93)",fontWeight:600,display:"inline-flex",alignItems:"center",gap:"2.5rem"}}>
              {t}<span style={{opacity:.4,fontSize:".4rem"}}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════ 3. INTRO ══════════════ */}
      <section style={{background:"#fff",padding:"6rem 4rem"}} className="sec">
        <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5.5rem",alignItems:"center"}} className="g2">
          <FadeUp>
            <SLabel>About TAASA Industries</SLabel>
            <h2 style={{fontFamily:G.serif,fontSize:"clamp(1.9rem,3.2vw,2.9rem)",fontWeight:500,color:G.dark,lineHeight:1.13,marginBottom:"1.3rem"}}>
              Reputed UPVC Doors<br/><em style={{color:G.gold}}>Manufacturer & Supplier</em>
            </h2>
            <p style={{fontSize:".93rem",color:G.gray,lineHeight:1.9,fontWeight:300,marginBottom:"1rem"}}>
              Welcome to TAASA Industries — where you find a seamless blend of exceptional craftsmanship with innovative designs. As one of the premier <strong style={{color:G.dark,fontWeight:500}}>UPVC door suppliers</strong> and <strong style={{color:G.dark,fontWeight:500}}>UPVC products manufacturer</strong>, we specialise in crafting elegant and durable uPVC and PVC doors tailored to fit any setting.
            </p>
            <p style={{fontSize:".93rem",color:G.gray,lineHeight:1.9,fontWeight:300,marginBottom:"2.4rem"}}>
              Our doors, recognised for their strength, aesthetics, and low maintenance, are designed to provide superior performance and appeal for both <strong style={{color:G.dark,fontWeight:500}}>residential and commercial spaces</strong>.
            </p>

            {/* Key facts */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".9rem",marginBottom:"2.2rem"}}>
              {[
                ["Trusted Since","2010"],
                ["Door Varieties","6+ Types"],
                ["Delivery","Pan India"],
                ["Experience","13+ Years"],
              ].map(([k,v])=>(
                <div key={k} style={{background:G.goldPale2,borderRadius:8,padding:".88rem 1.1rem",borderLeft:`3px solid ${G.gold}`}}>
                  <div style={{fontSize:".7rem",letterSpacing:".1em",color:G.grayLight,textTransform:"uppercase",marginBottom:3}}>{k}</div>
                  <div style={{fontSize:".95rem",fontWeight:600,color:G.dark}}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
              <a href="#door-types" className="btn-gold" style={{textDecoration:"none"}}>Explore Door Types <ChevronRight size={14}/></a>
              <a href="#inquiry" style={{display:"inline-flex",alignItems:"center",gap:".5rem",padding:".9rem 2.2rem",background:"transparent",border:`1.5px solid ${G.border}`,color:G.dark,fontSize:".78rem",fontWeight:600,letterSpacing:".13em",textTransform:"uppercase",borderRadius:4,transition:"all .3s",textDecoration:"none"}}
                onMouseEnter={e=>{e.currentTarget.style.background=G.goldPale;e.currentTarget.style.borderColor=G.gold;}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor=G.border;}}>
                Request Quote <ArrowUpRight size={14}/>
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={.12}>
            <div style={{position:"relative"}}>
              <div style={{borderRadius:12,overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,.13)"}}>
                <motion.img whileHover={{scale:1.05}} transition={{duration:.65}}
                  src="https://www.taasaupvcprofile.com/sub-images/hollow-upvc-doors.jpg"
                  alt="uPVC Door" style={{width:"100%",height:420,objectFit:"cover",display:"block"}}/>
              </div>
              {/* Float badge */}
              <div className="float-badge" style={{position:"absolute",top:"-1.5rem",right:"-1.5rem",background:`linear-gradient(135deg,${G.gold},${G.goldLight})`,padding:"1.2rem 1.4rem",borderRadius:10,boxShadow:`0 14px 36px rgba(196,145,56,.45)`,textAlign:"center",zIndex:10}}>
                <div style={{fontFamily:G.serif,fontSize:"2.2rem",color:"#fff",fontWeight:700,lineHeight:1}}>13+</div>
                <div style={{fontSize:".5rem",letterSpacing:".2em",color:"rgba(255,255,255,.85)",textTransform:"uppercase",marginTop:3}}>Years of Trust</div>
              </div>
              {/* Stats strip */}
              {/* <div style={{position:"absolute",bottom:"1.5rem",left:"1.5rem",right:"1.5rem",background:"rgba(255,255,255,.92)",backdropFilter:"blur(10px)",padding:".9rem 1.3rem",borderRadius:8,boxShadow:"0 8px 24px rgba(0,0,0,.09)",display:"flex",justifyContent:"space-around",gap:"1rem"}}>
                {[{n:500,s:"+",l:"Projects"},{n:6,s:"+",l:"Door Types"},{n:100,s:"+",l:"Designs"}].map(st=>(
                  <div key={st.l} style={{textAlign:"center"}}>
                    <div style={{fontFamily:G.serif,fontSize:"1.5rem",color:G.gold,fontWeight:600,lineHeight:1}}><Counter end={st.n} suffix={st.s}/></div>
                    <div style={{fontSize:".58rem",letterSpacing:".14em",color:G.grayLight,textTransform:"uppercase",marginTop:3}}>{st.l}</div>
                  </div>
                ))}
              </div> */}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════ 4. DOOR TYPES ══════════════ */}
      <section id="door-types" style={{background:G.goldPale2,padding:"6rem 4rem"}} className="sec">
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <FadeUp style={{textAlign:"center",marginBottom:"4rem"}}>
            <SLabel center>Our Door Range</SLabel>
            <h2 style={{fontFamily:G.serif,fontSize:"clamp(1.9rem,3.2vw,2.9rem)",fontWeight:500,color:G.dark,marginBottom:".5rem"}}>
              Types of <em style={{color:G.gold}}>uPVC Doors</em>
            </h2>
            <p style={{color:G.gray,fontSize:".9rem",maxWidth:500,margin:"0 auto",lineHeight:1.8}}>
              From hollow-core interior doors to heavy-duty commercial sliding systems — we manufacture them all.
            </p>
          </FadeUp>

          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.5rem"}} className="g3">
            {DOOR_TYPES.map((d,i)=>(
              <motion.div key={i}
                initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*.07,duration:.68}}
                className="door-card"
                style={{boxShadow:"0 4px 22px rgba(0,0,0,.08)"}}>
                <a href={d.href} style={{display:"block",textDecoration:"none"}}>
                  <div style={{position:"relative",height:260,overflow:"hidden",borderRadius:"12px 12px 0 0"}}>
                    <img src={d.img} alt={d.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    <div className="door-overlay"/>
                    <div style={{position:"absolute",top:".9rem",left:".9rem",background:"rgba(196,145,56,.82)",padding:".24rem .72rem",borderRadius:20}}>
                      <span style={{fontSize:".52rem",letterSpacing:".12em",color:"#fff",textTransform:"uppercase",fontWeight:600}}>{d.tag}</span>
                    </div>
                    <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"1.4rem"}}>
                      <h3 style={{fontFamily:G.serif,fontSize:"1.2rem",fontWeight:500,color:"#fff",marginBottom:".35rem"}}>{d.name}</h3>
                    </div>
                  </div>
                  <div style={{background:"#fff",padding:"1.3rem 1.5rem 1.6rem",borderRadius:"0 0 12px 12px"}}>
                    <p style={{fontSize:".82rem",color:G.gray,lineHeight:1.75,fontWeight:300,marginBottom:"1rem"}}>{d.desc}</p>
                    <div style={{display:"flex",alignItems:"center",gap:".4rem",color:G.gold,fontSize:".72rem",letterSpacing:".12em",fontWeight:600,textTransform:"uppercase"}}>
                      Learn More <ChevronRight size={12}/>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 5. BENEFITS ══════════════ */}
      <section style={{background:"#fff",padding:"6rem 4rem"}} className="sec">
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <FadeUp style={{textAlign:"center",marginBottom:"4rem"}}>
            <SLabel center>Why uPVC?</SLabel>
            <h2 style={{fontFamily:G.serif,fontSize:"clamp(1.9rem,3.2vw,2.9rem)",fontWeight:500,color:G.dark}}>
              Benefits of <em style={{color:G.gold}}>uPVC Doors</em>
            </h2>
          </FadeUp>

          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.3rem"}} className="g3">
            {BENEFITS.map(({num,Icon,title,desc},i)=>(
              <motion.div key={i}
                initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*.07,duration:.66}}
                className="benefit-card"
                style={{background:G.goldPale2,borderRadius:10,padding:"2rem 1.9rem",border:`1px solid ${G.border}`,transition:"all .35s"}}>
                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"1.3rem"}}>
                  <div style={{width:52,height:52,borderRadius:"50%",background:"#fff",border:`1.5px solid ${G.border}`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 14px rgba(196,145,56,.1)`}}>
                    <Icon size={22} color={G.gold}/>
                  </div>
                  <span className="ben-num" style={{fontFamily:G.serif,fontSize:"2.4rem",color:"#EEE8D8",fontWeight:700,lineHeight:1,transition:"color .35s"}}>{num}</span>
                </div>
                <h3 style={{fontSize:".92rem",fontWeight:600,color:G.dark,marginBottom:".65rem",lineHeight:1.35}}>{title}</h3>
                <p style={{fontSize:".8rem",color:G.gray,lineHeight:1.78,fontWeight:300}}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 6. WHY TAASA ══════════════ */}
      <section style={{background:"linear-gradient(160deg,#FDF9F0,#FFF8EF)",padding:"6rem 4rem"}} className="sec">
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <FadeUp style={{textAlign:"center",marginBottom:"4rem"}}>
            <SLabel center>Why Choose Us</SLabel>
            <h2 style={{fontFamily:G.serif,fontSize:"clamp(1.9rem,3.2vw,2.9rem)",fontWeight:500,color:G.dark}}>
              Best Manufacturer &amp; Supplier of<br/><em style={{color:G.gold}}>UPVC Doors</em>
            </h2>
          </FadeUp>

          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.3rem"}} className="g3">
            {WHY.map(({icon,title,desc},i)=>(
              <motion.div key={i}
                initial={{opacity:0,y:26}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*.07,duration:.65}}
                className="why-card card-lift"
                style={{background:"#fff",borderRadius:10,padding:"2rem 1.9rem",border:`1px solid ${G.border}`,boxShadow:"0 2px 14px rgba(0,0,0,.04)"}}>
                <div style={{fontSize:"2rem",marginBottom:"1rem",lineHeight:1}}>{icon}</div>
                <h3 style={{fontSize:".92rem",fontWeight:600,color:G.dark,marginBottom:".65rem",lineHeight:1.35}}>{title}</h3>
                <p style={{fontSize:".8rem",color:G.gray,lineHeight:1.78,fontWeight:300}}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 7. FULL-BLEED CTA ══════════════ */}
      <section style={{position:"relative",overflow:"hidden"}}>
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=85"
          alt="uPVC Door interior"
          style={{width:"100%",height:500,objectFit:"cover",objectPosition:"center 38%",display:"block"}}
        />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(10,8,4,.9) 0%,rgba(10,8,4,.62) 50%,rgba(10,8,4,.2) 100%)"}}/>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",padding:"0 4rem"}}>
          <FadeUp style={{maxWidth:600}}>
            <SLabel>Elevate Your Spaces</SLabel>
            <h2 style={{fontFamily:G.serif,fontSize:"clamp(2.4rem,5vw,4.2rem)",fontWeight:500,color:"#fff",lineHeight:1.1,marginBottom:"1.4rem"}}>
              Trusted UPVC<br/><em style={{color:"#E8B84B"}}>Door Suppliers</em>
            </h2>
            <p style={{color:"rgba(255,255,255,.6)",fontSize:".98rem",lineHeight:1.85,fontWeight:300,marginBottom:"2.4rem",maxWidth:480}}>
              With TAASA Industries, you're investing in doors that reflect your unique style while providing security, energy efficiency, and eco-conscious craftsmanship.
            </p>
            <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
              <a href="#inquiry" className="btn-gold" style={{textDecoration:"none"}}>BOOK FREE CONSULTATION <ArrowUpRight size={14}/></a>
              <a href="/taasa_catalogue.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{textDecoration:"none"}}>DOWNLOAD CATALOGUE</a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════ 8. PRODUCT FEATURES ══════════════ */}
      <section style={{background:"#fff",padding:"6rem 4rem"}} className="sec">
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <FadeUp style={{textAlign:"center",marginBottom:"4rem"}}>
            <SLabel center>Product Features</SLabel>
            <h2 style={{fontFamily:G.serif,fontSize:"clamp(1.9rem,3.2vw,2.9rem)",fontWeight:500,color:G.dark}}>
              What Makes Our Doors <em style={{color:G.gold}}>Special?</em>
            </h2>
          </FadeUp>

          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.2rem"}} className="g3">
            {FEATURES.map(({Icon,title},i)=>(
              <motion.div key={i}
                initial={{opacity:0,y:26}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*.06,duration:.6}}
                className="feat-card"
                style={{background:G.goldPale2,borderRadius:10,padding:"1.8rem 1.7rem",border:`1px solid ${G.border}`,display:"flex",alignItems:"center",gap:"1.2rem"}}>
                <div className="feat-icon" style={{width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,#FDF6E8,#FEF9F0)",border:`1.5px solid ${G.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"none"}}>
                  <Icon size={21} color={G.gold}/>
                </div>
                <h3 style={{fontSize:".86rem",fontWeight:600,color:G.dark,lineHeight:1.35}}>{title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 9. FAQ ══════════════ */}
      <section style={{background:"linear-gradient(160deg,#FDF9F0,#FFF8EF)",padding:"6rem 4rem"}} className="sec">
        <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:"6rem",alignItems:"start"}} className="g2">
          <FadeUp>
            <SLabel>FAQ</SLabel>
            <h2 style={{fontFamily:G.serif,fontSize:"clamp(1.9rem,3.2vw,2.8rem)",fontWeight:500,color:G.dark,lineHeight:1.14,marginBottom:"1.3rem"}}>
              Frequently Asked<br/><em style={{color:G.gold}}>Questions</em>
            </h2>
            <p style={{color:G.gray,lineHeight:1.88,fontSize:".88rem",fontWeight:300,marginBottom:"2.2rem"}}>
              Have more questions about our uPVC doors? Our Ahmedabad-based team is always here to help.
            </p>
            {[
              {Icon:Phone,  label:"Call Us",   val:"+91 85112 32318",     href:"tel:+918511232318"        },
              {Icon:Mail,   label:"Email Us",  val:"info@taasaupvc.com",   href:"mailto:info@taasaupvc.com"},
              {Icon:MapPin, label:"Visit Us",  val:"06-Bileshwar Industrial Estate, Odhav, Ahmedabad — 382415", href:"#"},
            ].map(({Icon,label,val,href})=>(
              <a key={label} href={href} style={{display:"flex",gap:"1rem",alignItems:"flex-start",marginBottom:"1.1rem",textDecoration:"none",transition:"opacity .3s"}}
                onMouseEnter={e=>e.currentTarget.style.opacity=".72"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                <div style={{width:40,height:40,borderRadius:"50%",background:"#fff",border:`1px solid ${G.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 4px 14px rgba(196,145,56,.1)`}}>
                  <Icon size={15} color={G.gold}/>
                </div>
                <div>
                  <div style={{fontSize:".58rem",letterSpacing:".15em",color:G.grayLight,textTransform:"uppercase",marginBottom:3}}>{label}</div>
                  <div style={{fontSize:".85rem",color:G.dark,fontWeight:500,lineHeight:1.5}}>{val}</div>
                </div>
              </a>
            ))}
          </FadeUp>

          <div>
            {FAQS.map((f,i)=><FaqItem key={i} q={f.q} a={f.a} idx={i}/>)}
          </div>
        </div>
      </section>

      {/* ══════════════ 10. INQUIRY FORM ══════════════ */}
      <section id="inquiry" style={{background:"#fff",padding:"6rem 4rem"}} className="sec">
        <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:"5rem",alignItems:"start"}} className="g2">
          <FadeUp>
            <SLabel>Get In Touch</SLabel>
            <h2 style={{fontFamily:G.serif,fontSize:"clamp(1.9rem,3.2vw,2.8rem)",fontWeight:500,color:G.dark,lineHeight:1.14,marginBottom:"1.3rem"}}>
              Request a<br/><em style={{color:G.gold}}>Free Quote</em>
            </h2>
            <p style={{color:G.gray,lineHeight:1.9,fontSize:".9rem",fontWeight:300,marginBottom:"2.2rem"}}>
              Tell us about your project — door type, dimensions, finish preferences — and we'll provide a detailed quote within 24 hours.
            </p>

            {/* Working Hours card */}
            <div style={{background:G.goldPale2,borderRadius:10,padding:"1.4rem 1.6rem",border:`1px solid ${G.border}`,marginBottom:"1.5rem"}}>
              <div style={{fontSize:".6rem",letterSpacing:".2em",color:G.gold,textTransform:"uppercase",fontWeight:600,marginBottom:".7rem"}}>Working Hours</div>
              <div style={{fontSize:".88rem",color:G.dark,fontWeight:500,marginBottom:".2rem"}}>Mon – Sat: 9:00 AM – 6:00 PM</div>
              <div style={{fontSize:".84rem",color:G.grayLight}}>Sunday: Closed</div>
            </div>

            {/* Quick action buttons */}
            <div style={{display:"flex",flexDirection:"column",gap:".7rem"}}>
              <a href="tel:+918511232318" className="btn-gold" style={{justifyContent:"center",textDecoration:"none"}}>
                <Phone size={14}/> Call Now: +91 85112 32318
              </a>
              <a href="https://wa.me/918511232318" target="_blank" rel="noopener noreferrer"
                style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:".5rem",padding:".9rem",background:"#25D366",color:"#fff",fontSize:".78rem",fontWeight:600,letterSpacing:".12em",textTransform:"uppercase",borderRadius:4,textDecoration:"none",transition:"opacity .3s"}}
                onMouseEnter={e=>e.currentTarget.style.opacity=".88"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                💬 WhatsApp Us
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={.12}>
            <div style={{background:"#fff",borderRadius:14,padding:"2.5rem",boxShadow:"0 12px 48px rgba(0,0,0,.08)",border:`1px solid ${G.border}`}}>
              <div style={{marginBottom:"1.8rem"}}>
                <h3 style={{fontFamily:G.serif,fontSize:"1.5rem",fontWeight:500,color:G.dark,marginBottom:".4rem"}}>Send an Inquiry</h3>
                <p style={{fontSize:".82rem",color:G.gray,fontWeight:300}}>Fill in the form — we'll reply within 24 hours.</p>
              </div>
              <InquiryForm/>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════ 11. RELATED PRODUCTS ══════════════ */}
      <section style={{background:G.goldPale2,padding:"6rem 4rem"}} className="sec">
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <FadeUp style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"3rem",flexWrap:"wrap",gap:"1.5rem"}}>
            <div>
              <SLabel>Explore More</SLabel>
              <h2 style={{fontFamily:G.serif,fontSize:"clamp(1.9rem,3vw,2.7rem)",fontWeight:500,color:G.dark}}>
                Related <em style={{color:G.gold}}>Products</em>
              </h2>
            </div>
            <a href="/products" style={{display:"inline-flex",alignItems:"center",gap:".5rem",border:"1.5px solid #E0E0E0",color:G.gray,fontSize:".73rem",letterSpacing:".14em",fontWeight:500,padding:".65rem 1.4rem",borderRadius:4,transition:"all .3s",textDecoration:"none"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=G.gold;e.currentTarget.style.color=G.gold;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#E0E0E0";e.currentTarget.style.color=G.gray;}}>
              ALL PRODUCTS <ChevronRight size={13}/>
            </a>
          </FadeUp>

          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1.3rem"}} className="g4">
            {RELATED.map((r,i)=>(
              <motion.div key={i}
                initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*.08,duration:.6}}
                style={{borderRadius:10,overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,.08)"}}
                className="card-lift">
                <a href={r.href} style={{display:"block",textDecoration:"none"}}>
                  <div style={{position:"relative",height:200,overflow:"hidden"}}>
                    <motion.img whileHover={{scale:1.07}} transition={{duration:.6}}
                      src={r.img} alt={r.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(20,16,8,.75),transparent 55%)"}}/>
                    <div style={{position:"absolute",bottom:"1rem",left:"1rem",right:"1rem"}}>
                      <div style={{fontFamily:G.serif,fontSize:"1rem",color:"#fff",fontWeight:500}}>{r.name}</div>
                    </div>
                  </div>
                  <div style={{background:"#fff",padding:".88rem 1.1rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:".7rem",color:G.gold,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase"}}>View Collection</span>
                    <ChevronRight size={14} color={G.gold}/>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 12. FOOTER ══════════════ */}
      <footer>
        {/* CTA Strip */}
        <div style={{background:`linear-gradient(135deg,${G.dark},${G.dark2})`,padding:"3.5rem 4rem",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"2rem",flexWrap:"wrap"}}>
          <div>
            <h3 style={{fontFamily:G.serif,fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:500,color:"#fff",marginBottom:".45rem"}}>
              Ready to Order <em style={{color:"#E8B84B"}}>uPVC Doors?</em>
            </h3>
            <p style={{fontSize:".86rem",color:"rgba(255,255,255,.45)",fontWeight:300}}>Pan-India delivery · Bulk orders welcome · Custom designs available</p>
          </div>
          <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
            <a href="#inquiry" className="btn-gold" style={{textDecoration:"none"}}>REQUEST QUOTE <ArrowUpRight size={13}/></a>
            <a href="tel:+918511232318"
              style={{display:"inline-flex",alignItems:"center",gap:".5rem",padding:".9rem 2.2rem",border:"1.5px solid rgba(255,255,255,.25)",color:"#fff",borderRadius:4,fontSize:".78rem",letterSpacing:".12em",fontWeight:600,textDecoration:"none",transition:"background .3s"}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.09)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <Phone size={13}/> CALL US
            </a>
          </div>
        </div>

        {/* Links + Address */}
        {/* <div style={{background:"linear-gradient(160deg,#1A1A2E,#12121F)",padding:"3rem 4rem"}}>
          <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"3rem"}} className="g4">
            <div>
              <div style={{display:"flex",alignItems:"center",gap:".7rem",marginBottom:"1rem"}}>
                <div style={{width:38,height:38,background:`linear-gradient(135deg,${G.gold},${G.goldLight})`,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{fontFamily:G.serif,color:"#fff",fontWeight:700,fontSize:"1.05rem"}}>T</span>
                </div>
                <div style={{fontFamily:G.serif,fontSize:"1.3rem",fontWeight:700,color:"#fff",letterSpacing:".06em"}}>TAASA<span style={{fontSize:".45rem",display:"block",letterSpacing:".35em",color:G.gold,marginTop:2}}>Industries</span></div>
              </div>
              <p style={{fontSize:".8rem",color:"rgba(255,255,255,.38)",lineHeight:1.85,fontWeight:300,maxWidth:280}}>
                06-Bileshwar Industrial Estate, Opp. G.V.M.M., Nr. Octroi Naka, Odhav, Ahmedabad — 382415, Gujarat, India.
              </p>
              <div style={{marginTop:"1.2rem",display:"flex",flexDirection:"column",gap:".5rem"}}>
                {[{Icon:Phone,v:"+91 85112 32318",h:"tel:+918511232318"},{Icon:Mail,v:"info@taasaupvc.com",h:"mailto:info@taasaupvc.com"}].map(({Icon,v,h})=>(
                  <a key={v} href={h} style={{display:"flex",alignItems:"center",gap:".6rem",fontSize:".8rem",color:"rgba(255,255,255,.45)",textDecoration:"none",transition:"color .3s"}}
                    onMouseEnter={e=>e.currentTarget.style.color="#E8B84B"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.45)"}>
                    <Icon size={13} color={G.gold}/>{v}
                  </a>
                ))}
              </div>
            </div>
            {[
              {title:"Products",links:["Platinum Collection","Regular Collection","WPC & PVC Louvers","uPVC Doors","Modular Kitchens","Sliding Wardrobes"]},
              {title:"Company", links:["Home","About Us","Clientele","Career","Contact Us","Download Catalogue"]},
              {title:"Support", links:["FAQ","Privacy Policy","Terms of Use","Sitemap","Blog"]},
            ].map(col=>(
              <div key={col.title}>
                <h4 style={{fontFamily:G.serif,fontSize:".95rem",fontWeight:500,color:"#fff",marginBottom:"1.1rem",paddingBottom:".8rem",borderBottom:`1px solid rgba(255,255,255,.06)`}}>{col.title}</h4>
                {col.links.map(l=>(
                  <a key={l} href={`/${l.toLowerCase().replace(/[\s&]/g,"-")}`}
                    style={{display:"block",fontSize:".78rem",color:"rgba(255,255,255,.4)",marginBottom:".55rem",transition:"color .3s,padding-left .3s"}}
                    onMouseEnter={e=>{e.currentTarget.style.color="#E8B84B";e.currentTarget.style.paddingLeft="7px";}}
                    onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,.4)";e.currentTarget.style.paddingLeft="0";}}>
                    {l}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div> */}

        {/* Bottom bar
        <div style={{background:"#0D0D1A",padding:"1.3rem 4rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem",borderTop:"1px solid rgba(255,255,255,.04)"}}>
          <p style={{fontSize:".68rem",color:"rgba(255,255,255,.22)",letterSpacing:".06em"}}>
            © 2026 TAASA Industries Pvt. Ltd. · All Rights Reserved · uPVC Door Suppliers &amp; Manufacturer in India
          </p>
          <p style={{fontSize:".67rem",color:"rgba(255,255,255,.18)",letterSpacing:".06em"}}>Made with ♥ in Ahmedabad, India</p>
        </div> */}
      </footer>
    </>
  );
}


// import React, { useState } from 'react';

// const UPVDoors = () => {
//   const [cart, setCart] = useState([]);

//   const products = [
//     {
//       id: 1,
//       name: "Classic UPVC Door",
//       price: 250,
//       image: "[via.placeholder.com](https://via.placeholder.com/300x400?text=Classic+UPVC+Door)",
//       description: "Elegant classic design with high security features."
//     },
//     {
//       id: 2,
//       name: "Modern UPVC Door",
//       price: 320,
//       image: "[via.placeholder.com](https://via.placeholder.com/300x400?text=Modern+UPVC+Door)",
//       description: "Contemporary style with energy efficient glazing."
//     },
//     {
//       id: 3,
//       name: "French UPVC Door",
//       price: 450,
//       image: "[via.placeholder.com](https://via.placeholder.com/300x400?text=French+UPVC+Door)",
//       description: "Double door French style for patios and gardens."
//     },
//     {
//       id: 4,
//       name: "Stable UPVC Door",
//       price: 280,
//       image: "[via.placeholder.com](https://via.placeholder.com/300x400?text=Stable+UPVC+Door)",
//       description: "Top and bottom opening stable door design."
//     }
//   ];

//   const addToCart = (product) => {
//     setCart([...cart, { ...product, quantity: 1 }]);
//     alert(`${product.name} added to cart!`);
//   };

//   const getCartCount = () => cart.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <div className="upvc-doors-container">
//       <header className="header">
//         <nav className="navbar">
//           <div className="logo">
//             <h2>Taasa UPVC</h2>
//           </div>
//           <div className="nav-links">
//             <a href="#home">Home</a>
//             <a href="#products">Products</a>
//             <a href="#about">About</a>
//             <a href="#contact">Contact</a>
//           </div>
//           <div className="cart-icon">
//             <span className="cart-count">{getCartCount()}</span>
//             <button>Cart</button>
//           </div>
//         </nav>
//       </header>

//       <section className="hero">
//         <div className="hero-content">
//           <h1>Premium UPVC Doors</h1>
//           <p>High-quality, durable, and energy-efficient UPVC doors for your home</p>
//           <button className="cta-button">Explore Collection</button>
//         </div>
//       </section>

//       <section className="products-section" id="products">
//         <div className="container">
//           <h2>Our UPVC Door Collection</h2>
//           <div className="products-grid">
//             {products.map((product) => (
//               <div key={product.id} className="product-card">
//                 <img src={product.image} alt={product.name} />
//                 <div className="product-info">
//                   <h3>{product.name}</h3>
//                   <p>{product.description}</p>
//                   <div className="price">₹{product.price.toLocaleString()}</div>
//                   <button 
//                     className="add-to-cart-btn"
//                     onClick={() => addToCart(product)}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="features">
//         <div className="container">
//           <div className="features-grid">
//             <div className="feature">
//               <h3>High Security</h3>
//               <p>Multi-point locking system for maximum protection</p>
//             </div>
//             <div className="feature">
//               <h3>Energy Efficient</h3>
//               <p>Excellent thermal insulation to reduce energy costs</p>
//             </div>
//             <div className="feature">
//               <h3>Low Maintenance</h3>
//               <p>No painting or regular upkeep required</p>
//             </div>
//             <div className="feature">
//               <h3>Weather Resistant</h3>
//               <p>Built to withstand harsh weather conditions</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <footer className="footer">
//         <div className="container">
//           <p>&copy; 2024 Taasa UPVC. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// // CSS Styles
// const styles = `
// .upvc-doors-container {
//   font-family: 'Arial', sans-serif;
//   line-height: 1.6;
//   color: #333;
// }

// .header {
//   background: #fff;
//   box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//   position: sticky;
//   top: 0;
//   z-index: 100;
// }

// .navbar {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 1rem 2rem;
// }

// .logo h2 {
//   margin: 0;
//   color: #2c5aa0;
// }

// .nav-links {
//   display: flex;
//   gap: 2rem;
// }

// .nav-links a {
//   text-decoration: none;
//   color: #333;
//   font-weight: 500;
// }

// .cart-icon {
//   position: relative;
// }

// .cart-count {
//   position: absolute;
//   top: -8px;
//   right: -8px;
//   background: #ff4444;
//   color: white;
//   border-radius: 50%;
//   width: 20px;
//   height: 20px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 12px;
// }

// .hero {
//   background: linear-gradient(135deg, #2c5aa0 0%, #4a90e2 100%);
//   color: white;
//   text-align: center;
//   padding: 4rem 2rem;
// }

// .hero-content h1 {
//   font-size: 3rem;
//   margin-bottom: 1rem;
// }

// .hero-content p {
//   font-size: 1.2rem;
//   margin-bottom: 2rem;
//   max-width: 600px;
//   margin-left: auto;
//   margin-right: auto;
// }

// .cta-button {
//   background: #ff6b35;
//   color: white;
//   border: none;
//   padding: 1rem 2rem;
//   font-size: 1.1rem;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background 0.3s;
// }

// .cta-button:hover {
//   background: #e55a2b;
// }

// .container {
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 2rem;
// }

// .products-section {
//   padding: 4rem 0;
//   background: #f8f9fa;
// }

// .products-section h2 {
//   text-align: center;
//   font-size: 2.5rem;
//   margin-bottom: 3rem;
//   color: #2c3e50;
// }

// .products-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//   gap: 2rem;
// }

// .product-card {
//   background: white;
//   border-radius: 10px;
//   overflow: hidden;
//   box-shadow: 0 5px 15px rgba(0,0,0,0.1);
//   transition: transform 0.3s;
// }

// .product-card:hover {
//   transform: translateY(-5px);
// }

// .product-card img {
//   width: 100%;
//   height: 250px;
//   object-fit: cover;
// }

// .product-info {
//   padding: 1.5rem;
// }

// .product-info h3 {
//   margin: 0 0 0.5rem 0;
//   color: #2c5aa0;
// }

// .price {
//   font-size: 1.5rem;
//   font-weight: bold;
//   color: #ff6b35;
//   margin: 1rem 0;
// }

// .add-to-cart-btn {
//   width: 100%;
//   background: #28a745;
//   color: white;
//   border: none;
//   padding: 0.8rem;
//   border-radius: 5px;
//   font-size: 1rem;
//   cursor: pointer;
//   transition: background 0.3s;
// }

// .add-to-cart-btn:hover {
//   background: #218838;
// }

// .features {
//   padding: 4rem 0;
// }

// .features-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 2rem;
// }

// .feature {
//   text-align: center;
//   padding: 2rem;
// }

// .feature h3 {
//   color: #2c5aa0;
//   margin-bottom: 1rem;
// }

// .footer {
//   background: #2c3e50;
//   color: white;
//   text-align: center;
//   padding: 2rem 0;
// }

// @media (max-width: 768px) {
//   .navbar {
//     flex-direction: column;
//     gap: 1rem;
//   }
  
//   .nav-links {
//     gap: 1rem;
//   }
  
//   .hero-content h1 {
//     font-size: 2rem;
//   }
// }
// `;

// // Inject styles
// const styleSheet = document.createElement("style");
// styleSheet.textContent = styles;
// document.head.appendChild(styleSheet);

// export default UPVDoors;
