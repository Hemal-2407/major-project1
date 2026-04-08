import React from "react";

import { Link } from "react-router-dom";
// Swapped Instagram/Facebook for Globe and Share2 to avoid the Import Error
import { Mail, Phone, MapPin, Globe, Share2, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-white pt-20 pb-10 px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand Column */}
        <div className="space-y-6">
          <Link to="/" className="text-2xl font-black tracking-[0.2em] uppercase">
            Taasa<span className="text-emerald-500">.</span>
          </Link>
          <p className="text-slate-400 text-xs font-bold leading-relaxed tracking-wide uppercase opacity-80">
            Pioneering high-durability PVC solutions for modern architectural interiors. Quality engineered in Gujarat.
          </p>
          <div className="flex gap-4">
            {/* Social Icons with Fallback Lucide Icons */}
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer group">
              <Globe size={18} className="text-slate-400 group-hover:text-white" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer group">
              <Share2 size={18} className="text-slate-400 group-hover:text-white" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-8">Navigation</h3>
          <ul className="space-y-4">
            {["Home", "Products", "About", "Contact"].map((item) => (
              <li key={item}>
                <Link 
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                  className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white flex items-center gap-2 group"
                >
                  <span className="w-0 h-[1px] bg-emerald-500 transition-all group-hover:w-4"></span>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-8">Headquarters</h3>
          <ul className="space-y-5">
            <li className="flex items-start gap-4 group">
              <MapPin size={18} className="text-slate-500 group-hover:text-emerald-500 transition-colors" />
              <span className="text-[11px] font-bold text-slate-400 uppercase leading-5">Ahmedabad, Gujarat,<br /> India</span>
            </li>
            <li className="flex items-center gap-4 group">
              <Phone size={18} className="text-slate-500 group-hover:text-emerald-500 transition-colors" />
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-4 group">
              <Mail size={18} className="text-slate-500 group-hover:text-emerald-500 transition-colors" />
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">info@taasa.com</span>
            </li>
          </ul>
        </div>

        {/* Admin Access */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-8">Management</h3>
          <Link 
            to="/admin" 
            className="flex items-center justify-between p-5 bg-slate-800/50 border border-slate-700 rounded-2xl group hover:border-emerald-500 transition-all"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white">Admin Portal</p>
              <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">Secure Login</p>
            </div>
            <ArrowUpRight size={20} className="text-slate-600 group-hover:text-emerald-500 transition-all" />
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
          © {currentYear} Taasa PVC Furniture.
        </p>
        <div className="flex gap-8">
          <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest hover:text-slate-400 cursor-pointer">Privacy</span>
          <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest hover:text-slate-400 cursor-pointer">Terms</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// import "./Footer.css";

// export default function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
        
//         <div>
//           <h3>FurniShop</h3>
//           <p>Modern furniture & UPVC solutions for your home.</p>
//         </div>

//         <div>
//           <h4>Quick Links</h4>
//           <p>Home</p>
//           <p>About</p>
//           <p>Products</p>
//           <p>Contact</p>
//         </div>

//         <div>
//           <h4>Contact</h4>
//           <p>📍 Ahmedabad, India</p>
//           <p>📞 +91 9876543210</p>
//           <p>📧 info@furnishop.com</p>
//         </div>

//       </div>

//       <p className="copyright">
//         © 2026 FurniShop | All Rights Reserved
//       </p>
//     </footer>
//   );
// }
