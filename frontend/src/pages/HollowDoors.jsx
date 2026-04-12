// import React, { useRef } from 'react';
// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import { Shield, Zap, Box, ArrowRight, Layers, Maximize, MousePointer2 } from 'lucide-react';

// const HollowDoors = () => {
//   const containerRef = useRef(null);
  
//   // 1. Smooth Scroll Progress for Parallax
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });

//   const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
//   const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

//   return (
//     <div ref={containerRef} className="bg-[#0a0a0a] text-white selection:bg-[#c49138]">
      
//       {/* --- HERO SECTION WITH MASK REVEAL --- */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         <motion.div 
//           style={{ y: backgroundY }}
//           className="absolute inset-0 z-0 opacity-30"
//         >
//           {/* Animated Mesh Gradient Background */}
//           <div className="absolute inset-0 bg-gradient-to-br from-[#c49138]/20 via-transparent to-[#1a1c2e]/40 animate-pulse" />
//         </motion.div>

//         <div className="relative z-10 text-center">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, ease: [0, 0.71, 0.2, 1.01] }}
//           >
//             <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-[#c49138] mb-6">
//               Engineering Excellence
//             </h2>
//             <h1 className="text-7xl md:text-[120px] font-black leading-none uppercase tracking-tighter">
//               HOLLOW <br /> 
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
//                 PROFILES
//               </span>
//             </h1>
//           </motion.div>

//           {/* Floating Mouse Icon Animation */}
//           <motion.div 
//             animate={{ y: [0, 15, 0] }}
//             transition={{ repeat: Infinity, duration: 2 }}
//             className="mt-20 flex flex-col items-center gap-2 opacity-40"
//           >
//             <div className="w-[1px] h-12 bg-white" />
//             <span className="text-[8px] uppercase tracking-widest">Scroll to Explore</span>
//           </motion.div>
//         </div>
//       </section>

//       {/* --- INTERACTIVE GRID SECTION --- */}
//       <section className="py-32 px-6 max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
//           <motion.div 
//             initial={{ x: -50, opacity: 0 }}
//             whileInView={{ x: 0, opacity: 1 }}
//             className="max-w-xl"
//           >
//             <h3 className="text-4xl font-bold uppercase leading-tight">
//               Revolutionizing <br /> <span className="text-[#c49138]">Interior Architecture</span>
//             </h3>
//           </motion.div>
//           <motion.p 
//             initial={{ x: 50, opacity: 0 }}
//             whileInView={{ x: 0, opacity: 1 }}
//             className="text-gray-500 text-sm max-w-sm text-right font-medium"
//           >
//             Our hollow uPVC sections provide the perfect balance between feather-light handling and structural rigidity.
//           </motion.p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {[
//             { title: "Standard Hollow", icon: Box, img: "01" },
//             { title: "Reinforced Core", icon: Layers, img: "02" },
//             { title: "Lite-Series", icon: Maximize, img: "03" }
//           ].map((item, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ y: -20 }}
//               className="relative aspect-[4/5] bg-[#151515] rounded-tl-[60px] rounded-br-[60px] overflow-hidden group border border-white/5"
//             >
//               <div className="absolute inset-0 bg-[#c49138] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[0.76, 0, 0.24, 1]" />
              
//               <div className="relative z-10 p-10 h-full flex flex-col justify-between">
//                 <span className="text-4xl font-black opacity-10 group-hover:opacity-20 transition-opacity">{item.img}</span>
//                 <div>
//                   <item.icon size={40} className="mb-6 text-[#c49138] group-hover:text-white transition-colors" />
//                   <h4 className="text-2xl font-black uppercase group-hover:text-black transition-colors">{item.title}</h4>
//                   <p className="text-xs mt-4 text-gray-500 group-hover:text-black/70 transition-colors uppercase font-bold tracking-widest">
//                     Technical Specification v2.0
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* --- HORIZONTAL SCROLLING TEXT --- */}
//       <div className="py-20 bg-[#c49138] overflow-hidden whitespace-nowrap flex border-y border-black">
//         <motion.div 
//           animate={{ x: ["0%", "-50%"] }}
//           transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
//           className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black flex gap-20"
//         >
//           <span>TAASA INDUSTRIES</span>
//           <span>UPVC MANUFACTURER</span>
//           <span>HOLLOW TECHNOLOGY</span>
//           <span>GUJARAT INDIA</span>
//         </motion.div>
//       </div>

//       {/* --- DYNAMIC STATS SECTION --- */}
//       <section className="py-32 grid grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto px-6 text-center">
//         {[
//           { num: "0% ", label: "Water Absorption" },
//           { num: "40%", label: "Lighter Weight" },
//           { num: "10+", label: "Year Warranty" },
//           { num: "100%", label: "Termite Proof" }
//         ].map((stat, i) => (
//           <motion.div 
//             key={i}
//             whileInView={{ opacity: [0, 1], scale: [0.5, 1] }}
//             viewport={{ once: true }}
//           >
//             <h5 className="text-5xl font-black text-[#c49138] mb-2">{stat.num}</h5>
//             <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{stat.label}</p>
//           </motion.div>
//         ))}
//       </section>

//       {/* --- MAGNETIC BUTTON CALL TO ACTION --- */}
//       <section className="py-40 flex flex-col items-center">
//         <motion.div
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           className="relative group cursor-pointer"
//         >
//           <div className="absolute inset-0 bg-[#c49138] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
//           <button className="relative z-10 w-64 h-64 rounded-full border border-white/20 flex flex-col items-center justify-center gap-4 hover:bg-white hover:text-black transition-all duration-500">
//             <MousePointer2 size={32} />
//             <span className="text-xs font-black uppercase tracking-[0.3em]">Request Quote</span>
//           </button>
//         </motion.div>
//       </section>

//     </div>
//   );
// };

// export default HollowDoors;

// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import { ShieldCheck, Zap, Droplets, ArrowRight, Package } from 'lucide-react';

// // const hollowProducts = [
// //   {
// //     id: 1,
// //     title: "Eco-Lite Hollow PVC Door",
// //     features: ["Lightweight Design", "Waterproof", "Cost-Effective"],
// //     image: "hollow-door-1.jpg"
// //   },
// //   {
// //     id: 2,
// //     title: "Reinforced Hollow uPVC Door",
// //     features: ["High Durability", "Termite Proof", "Sound Insulation"],
// //     image: "hollow-door-2.jpg"
// //   },
// //   {
// //     id: 3,
// //     title: "Poly Plast Hollow Section",
// //     features: ["Non-Toxic Material", "Fire Retardant", "Zero Maintenance"],
// //     image: "hollow-door-3.jpg"
// //   }
// // ];

// // const HollowDoors = () => {
// //   return (
// //     <div className="bg-white min-h-screen">
// //       {/* Hero Header */}
// //       <section className="relative py-20 bg-[#f8f9fa] border-b">
// //         <div className="max-w-7xl mx-auto px-6 text-center">
// //           <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1c2e] tracking-tight uppercase">
// //             Hollow uPVC <span className="text-[#c49138]">Doors</span>
// //           </h1>
// //           <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
// //             Leading Manufacturer of high-performance PVC Hollow Doors and Sectional uPVC solutions. 
// //             Engineered for durability, lightweight handling, and premium aesthetics.
// //           </p>
// //         </div>
// //       </section>

// //       {/* Main Content Grid */}
// //       <section className="py-16 max-w-7xl mx-auto px-6">
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
// //           {hollowProducts.map((product) => (
// //             <motion.div 
// //               key={product.id}
// //               whileHover={{ y: -10 }}
// //               className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all"
// //             >
// //               <div className="aspect-[3/4] bg-gray-100 rounded-2xl mb-6 overflow-hidden flex items-center justify-center text-gray-400">
// //                 {/* Placeholder for your actual product image */}
// //                 <Package size={48} strokeWidth={1} />
// //               </div>
              
// //               <h3 className="text-xl font-bold text-[#1a1c2e] mb-4 uppercase">{product.title}</h3>
              
// //               <ul className="space-y-2 mb-8">
// //                 {product.features.map((feat, i) => (
// //                   <li key={i} className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
// //                     <div className="w-1.5 h-1.5 bg-[#c49138] rounded-full" />
// //                     {feat}
// //                   </li>
// //                 ))}
// //               </ul>

// //               <button className="w-full py-4 bg-[#1a1c2e] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-[#c49138] transition-colors flex items-center justify-center gap-2">
// //                 Get Quote <ArrowRight size={14} />
// //               </button>
// //             </motion.div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Technical Specifications Section */}
// //       <section className="bg-[#1a1c2e] py-16 text-white overflow-hidden relative">
// //         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
// //           <div className="flex flex-col items-center text-center">
// //             <Zap className="text-[#c49138] mb-4" size={32} />
// //             <h4 className="font-bold uppercase text-sm tracking-widest">Lightweight Strength</h4>
// //             <p className="text-gray-400 text-xs mt-2 px-4 leading-5">Specialized hollow core reduces weight by 40% while maintaining structural integrity.</p>
// //           </div>
// //           <div className="flex flex-col items-center text-center border-x border-gray-800">
// //             <Droplets className="text-[#c49138] mb-4" size={32} />
// //             <h4 className="font-bold uppercase text-sm tracking-widest">100% Waterproof</h4>
// //             <p className="text-gray-400 text-xs mt-2 px-4 leading-5">Perfect for bathrooms and humid environments. Zero swelling or warping.</p>
// //           </div>
// //           <div className="flex flex-col items-center text-center">
// //             <ShieldCheck className="text-[#c49138] mb-4" size={32} />
// //             <h4 className="font-bold uppercase text-sm tracking-widest">Termite Proof</h4>
// //             <p className="text-gray-400 text-xs mt-2 px-4 leading-5">Non-toxic PVC materials that are naturally resistant to borers and fungi.</p>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default HollowDoors;