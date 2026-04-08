import React from "react";
import { motion } from "framer-motion";
import { Award, Users, CheckCircle, ShieldCheck, Factory, Zap } from "lucide-react";

const About = () => {
  const stats = [
    { icon: <Factory size={24} />, label: "Established", value: "2010" },
    { icon: <Award size={24} />, label: "Experience", value: "15+ Years" },
    { icon: <Users size={24} />, label: "Experts", value: "Seasoned Team" },
    { icon: <CheckCircle size={24} />, label: "Quality", value: "International Standards" },
  ];

  const features = [
    { title: "100% Termite Proof", icon: <ShieldCheck className="text-emerald-500" /> },
    { title: "Fire Retardant", icon: <ShieldCheck className="text-emerald-500" /> },
    { title: "100% Waterproof", icon: <ShieldCheck className="text-emerald-500" /> },
    { title: "Zero Maintenance", icon: <ShieldCheck className="text-emerald-500" /> },
    { title: "Eco-Friendly", icon: <ShieldCheck className="text-emerald-500" /> },
    { title: "Bacteria Resistant", icon: <ShieldCheck className="text-emerald-500" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO SECTION */}
        <header className="mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block"
          >
            Since 2010 • Ahmedabad, India
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-950 leading-tight uppercase tracking-tighter max-w-4xl"
          >
            Crafting the future of <span className="text-slate-400 font-light">Interior Excellence.</span>
          </motion.h1>
        </header>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="prose prose-slate lg:prose-xl">
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                Established back in 2010, <span className="text-slate-950 font-bold">"TAASA Industries"</span> has emerged as a prominent name in the realm of PVC products. As a dedicated manufacturer and service provider, we specialize in a comprehensive range of PVC offerings.
              </p>
              <p className="text-slate-500 leading-relaxed">
                From PVC doors, T.V. cabinets, and office furniture to modular PVC kitchens, ceiling paneling, and sliding wardrobes—we cover it all. Our products stand out not only for their quality but also for their competitive pricing. At the core of our operations lies a team of seasoned experts who ensure that every product meets stringent international quality standards.
              </p>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                  <div className="text-emerald-500 mb-3">{stat.icon}</div>
                  <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* IMAGE SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-slate-200 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" 
                alt="TAASA Interior Design"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-10 -left-10 bg-emerald-600 text-white p-10 rounded-[2.5rem] shadow-xl max-w-xs hidden md:block">
              <Zap size={32} className="mb-4" />
              <h4 className="text-lg font-black uppercase tracking-tight leading-tight">
                Pioneering PVC Innovation in Gujarat
              </h4>
            </div>
          </motion.div>
        </div>

        {/* CORE VALUES / FEATURES SECTION */}
        <section className="bg-slate-950 rounded-[4rem] p-12 md:p-20 text-white overflow-hidden relative">
          <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">
              Why Professionals Choose <span className="text-emerald-500 italic">TAASA</span>
            </h2>
            <p className="text-slate-400 font-medium">
              Our journey of success wouldn't be complete without acknowledging the pivotal role of our leadership and our commitment to research-driven market trends.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                {feature.icon}
                <span className="text-sm font-bold uppercase tracking-widest">{feature.title}</span>
              </div>
            ))}
          </div>

          {/* Abstract background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 blur-[100px] rounded-full -mr-40 -mt-40"></div>
        </section>

        {/* LEADERSHIP SECTION */}
        <section className="mt-32 text-center">
          <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Our Foundation</span>
          <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-12">Leadership & Vision</h3>
          <div className="flex flex-col md:flex-row justify-center gap-12">
            <div>
              <p className="text-xl font-black text-slate-900">Mr. Ravi Khoyani</p>
              <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest mt-1">Founder & Managing Director</p>
            </div>
            <div className="w-px h-12 bg-slate-200 hidden md:block"></div>
            <div>
              <p className="text-xl font-black text-slate-900">Mr. Jignesh Kamani</p>
              <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest mt-1">Co-Founder</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
// =======
// import "./About.css";

// export default function About() {
//   return (
//     <div className="about-page">
//       {/* Hero Section */}
//       <section className="about-hero">
//         <h1>About Us</h1>
//         <p>We deliver premium UPVC furniture and modern interior solutions</p>
//       </section>

//       {/* About Content */}
  
//     <section className="about-section">

//       {/* LEFT TEXT */}
//       <div className="about-text">
//         <h1 className="fade-in">About Our Company</h1>

//         <p className="slide-up">
// Established back in 2010, TAASA Industries" has emerged as a prominent name in the realm of PVC products. As a dedicated manufacturer and service provider, we specialize in a comprehensive range of PVC offerings. From PVC doors, TV cabinets, and Maliya, to office furniture, modular PVC kitchens, ceiling and wall paneling, and sliding wardrobe cabinets. and an array of PVC furniture, we cover it all. Our products stand out not only for their quality but also for their competitive pricing. At the core of our operations lies a team of seasoned experts who ensure that every product that leaves our facility meets stringent quality standards. This dedication to quality is further reflected in the international acceptance of our products.
//         </p><br></br>

//         <p className="slide-up delay">
//           Our Journey of success wouldn't be complete without acknowledging the pivotal role played by Mr. Ravi Khoyani His unwavering support and guidance have propelled us towards unprecedented growth in the present market landscape. We're dedicated to quality. Our products go through strict checks at every stage of production. We stay updated with market trends through research, ensuring our range meets demands and holds value. Each finished product is tested thoroughly, earning us great client appreciation for our diverse collection.
//        </p><br></br>

//         <button className="about-btn">Explore More</button>
//       </div><br></br>

//       {/* RIGHT IMAGE */}
//       <div className="about-image">
//         <img src="https://www.taasaupvcprofile.com/images/about_3.jpg" />
//       </div>

//     </section>
 

//       {/* Features */}
//       <section className="features">
//         <h2>Why Choose Us</h2>
//         <div className="feature-grid">
//           <div className="feature-card">
//             <h3>✔ Premium Quality</h3>
//             <p>We use top-grade materials for long-lasting durability.</p>
//           </div>
//           <div className="feature-card">
//             <h3>✔ Modern Design</h3>
//             <p>Stylish and innovative designs for modern homes.</p>
//           </div>
//           <div className="feature-card">
//             <h3>✔ Affordable Price</h3>
//             <p>Best value products at competitive pricing.</p>
//           </div>
//         </div>
//       </section>

//       {/* Gallery */}
//       <section className="gallery">
//         <h2>Our Work</h2>
//         <div className="gallery-grid">
//           <img src="https://images.unsplash.com/photo-1582582621959-48d27397dc69" />
//           <img src="https://images.unsplash.com/photo-1505691938895-1758d7feb511" />
//           <img src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf" />
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="about-footer">
//         <p>© 2026 FurniShop | All Rights Reserved</p>
//       </footer>
//     </div>
//   );
// }

// >>>>>>> b87ef352ecc7bd63f58b6048580306717e0d227a
