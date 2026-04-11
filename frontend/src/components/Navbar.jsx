import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, PhoneCall } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-[100] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center group-hover:bg-emerald-600 transition-colors duration-300">
            <span className="text-white font-black text-xs">T</span>
          </div>
          <span className="text-xl font-black text-slate-900 tracking-[0.15em] uppercase">
            Taasa<span className="text-emerald-600">.</span>
          </span>
        </Link>

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

        {/* Action Button */}
        <button className="hidden md:flex items-center gap-2 bg-[#0f172a] text-white px-6 py-3 rounded-2xl hover:bg-emerald-600 transition-all font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-slate-200 active:scale-95">
          <PhoneCall size={14} />
          Get Quote
        </button>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-3 bg-slate-50 rounded-2xl text-slate-900 hover:bg-slate-100 transition-all"
        >
          {menuOpen ? <X size={22} strokeWidth={3} /> : <Menu size={22} strokeWidth={3} />}
        </button>
      </div>

      {/* Mobile Menu Slide-down */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b-4 border-emerald-500 shadow-2xl px-8 py-10"
          >
            <div className="grid gap-8">
              <ul className="space-y-6">
                {["Home", "About", "Products", "Contact"].map((item) => (
                  <li key={item}>
                    <Link 
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                      onClick={handleCloseMenu}
                      className="flex justify-between items-center text-sm font-black uppercase tracking-[0.25em] text-slate-800"
                    >
                      {item}
                      <ChevronRight size={16} className="text-slate-300" />
                    </Link>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-emerald-500 text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-lg shadow-emerald-100">
                Contact Sales
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;