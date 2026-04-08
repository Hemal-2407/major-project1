import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Droplets, Bug, ChevronRight, ArrowUpRight } from "lucide-react"; // Using lucide-react for cleaner icons

const Home = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="bg-[#fcfcfc] text-slate-900 font-sans selection:bg-amber-200">

      {/* 🏆 LUXURY HERO SECTION */}
      <section className="relative h-[95vh] flex items-center justify-start overflow-hidden">
        <motion.img
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
          className="absolute w-full h-full object-cover"
          alt="Premium Interior"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/40 to-transparent"></div>

        <div className="relative z-10 px-8 md:px-20 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-amber-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            Est. 2026 | Premium uPVC Manufacturing
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-light mb-6 leading-[1.1] text-white"
          >
            Architectural <br />
            <span className="font-serif italic text-amber-500">Excellence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl mb-10 max-w-xl text-slate-300 leading-relaxed font-light"
          >
            TAASA Industries redefines interiors with termite-proof, waterproof,
            and fire-retardant uPVC solutions crafted for the modern Indian home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-5"
          >
            {/* <button className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-sm flex items-center gap-2 transition-all transform hover:translate-x-2">
              View Catalog <ArrowUpRight size={20} />
            </button> */}
            <a
              href="/taasa_catalogue.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-sm flex items-center gap-2 transition-all transform hover:translate-x-2">
                View Catalog <ArrowUpRight size={20} />
              </button>
            </a>
            <button className="backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-sm hover:bg-white hover:text-slate-900 transition-all">
              Request a Quote
            </button>
          </motion.div>
        </div>
      </section>

      {/* 🛠️ THE CORE ADVANTAGE (Replaces Why Choose Us) */}
      <section className="py-24 px-6 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-serif mb-6">The TAASA <br /> Standard</h2>
              <div className="h-1 w-20 bg-amber-500"></div>
            </div>

            {[
              { icon: <Droplets className="text-amber-500" />, title: "100% Waterproof", desc: "Ideal for humid coastal climates and wet areas." },
              { icon: <Bug className="text-amber-500" />, title: "Termite Proof", desc: "Unlike wood, uPVC offers lifetime immunity to pests." },
              { icon: <ShieldCheck className="text-amber-500" />, title: "Fire Retardant", desc: "Enhanced safety standards for kitchens and offices." }
            ].map((trait, i) => (
              <motion.div key={i} {...fadeInUp} className="space-y-4">
                {trait.icon}
                <h3 className="text-xl font-semibold">{trait.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{trait.desc}</p>
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

      {/* 📞 THE TAASA EXPERIENCE (CTA) */}
      <section className="py-24 px-6 flex justify-center">
        <motion.div
          {...fadeInUp}
          className="bg-slate-900 w-full max-w-7xl rounded-3xl p-12 md:p-20 relative overflow-hidden text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
              Ready to Upgrade to <br /> <span className="text-amber-500">uPVC?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto font-light">
              Transform your space with furniture that looks like luxury wood but
              lasts like stone. Contact our experts in Ahmedabad today.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <button className="bg-amber-600 text-white px-12 py-5 rounded-full font-bold hover:bg-amber-700 transition shadow-xl shadow-amber-900/20">
                Book a Free Consultation
              </button>
              <button className="border border-slate-700 text-white px-12 py-5 rounded-full hover:bg-slate-800 transition">
                Download Brochure
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER MINI */}
      <footer className="py-12 border-t border-slate-200 text-center text-slate-500 text-sm">
        <p>&copy; 2026 TAASA Industries. Designed for Performance.</p>
      </footer>

    </div>
  );
};

export default Home;