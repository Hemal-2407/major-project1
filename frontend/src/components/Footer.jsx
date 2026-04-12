import React from "react";

import { Link } from "react-router-dom";
// Swapped Instagram/Facebook for Globe and Share2 to avoid the Import Error
import { Mail, Phone, MapPin, Globe, Share2, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
  //  <footer style={{ background: "#070707", padding: "3rem", borderTop: "1px solid #111" }}>
  // <footer style={{ background: "linear-gradient(135deg, rgb(59, 41, 18), hsl(36, 60%, 11%))", padding: "4rem" }}>
  <footer style={{ background:"linear-gradient(160deg,#1A1A2E,#12121F)", padding: "1.4rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "1.8rem" }}></div>
               {/* Navigation */}
                  <div>
                    {/* <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-8">Navigati</h3> */}
                    <ul className="flex items-center gap-11"> {/* Changed to flex and added horizontal gap */}
                      {["Home", "Products", "About","Cetalog","Blog", "Contact"].map((item) => (
                        <li key={item}>
                          <Link 
                            to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                            className="text-[20px] font-black uppercase tracking-widest text-slate-400 hover:text-white flex items-center gap-2 group transition-colors"
                          >
                            {/* The line will now expand to the left of the text horizontally */}
                            <span className="w-0 h-[1px] bg-emerald-500 transition-all duration-300 group-hover:w-4"></span>
                            <span className="group-hover:translate-x-1 transition-transform"></span>
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div><br></br><br></br>
                <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.5rem", alignItems: "center" }}>
                  <div>
                    {/* <div className="serif" style={{ fontSize: "1.5rem", fontWeight: 600, color: "#fff" }}>TAASA <span style={{ color: "#c49138" }}>Industries</span></div> */}
                    <img 
                      src="/images/logo.svg" 
                      alt="TAASA Industries Logo" 
                      className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110" 
                    /><br></br>
                    <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.78rem", marginTop: "0.4rem", fontWeight: 300 }}>Premium uPVC Manufacturer, Ahmedabad</p>
                  </div>
                  {[
                    { icon: Phone, label: "Phone", val: "+91 85112 32318" },
                    { icon: Mail, label: "Email", val: "info@taasaupvc.com" },
                    { icon: MapPin, label: "Address", val: "06-Bileshwar Industrial Estate, Opp. G.V.M.M., Nr. Octroi Naka,Odhav, Ahmedabad - 382415." },
                  ].map(({ icon: Icon, label, val }) => (
                    <div key={label} style={{ display: "flex", gap: "0.9rem", alignItems: "flex-start" }}>
                      <Icon size={16} color="#c49138" style={{ marginTop: "3px", flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: "0.56rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.32)", textTransform: "uppercase", marginBottom: "4px" }}>{label}</div>
                        <div style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.72)", fontWeight: 300 }}>{val}</div>
                      </div>
                    </div>
                  ))}
                </div>  <br></br>    
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
          
         {/* Brand Column */}
        <div className="space-y-6">
          {/* <Link to="/" className="text-2xl font-black tracking-[0.2em] uppercase">
            Taasa<span className="text-emerald-500">.</span>
          </Link> */}
          {/* <p className="text-slate-400 text-xs font-bold leading-relaxed tracking-wide uppercase opacity-80">
            Pione ering high-durability PVC solutions for modern architectural interiors. Quality engineered in Gujarat.
          </p> */}
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
        {/* <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-8">Navigati</h3>
          <ul className="flex items-center gap-8"> {/* Changed to flex and added horizontal gap */}
            {/* {["Home", "Products", "About","Cetalog","Blog", "Contact"].map((item) => (
              <li key={item}>
                <Link 
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                  className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white flex items-center gap-2 group transition-colors"
                >
                  {/* The line will now expand to the left of the text horizontally */}
                  {/* <span className="w-0 h-[1px] bg-emerald-500 transition-all group-hover:w-4"></span>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div> */} 

        {/* Contact
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
        </div> */}

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
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]" style={{color:"white"}}>
          © {currentYear} Taasa PVC Furniture.
        </p>
        <div className="flex gap-8">
          <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest hover:text-slate-400 cursor-pointer" style={{color:"white"}}>Privacy</span>
          <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest hover:text-slate-400 cursor-pointer" style={{color:"white"}}>Terms</span>
        </div>
          <div className="serif" style={{ fontSize: "1.4rem", fontWeight: 300, color: "white", letterSpacing: "0.1em" }}>
            T<span style={{ color: "#c8a050" }}>AA</span>SA <span style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "white" }}>INDUSTRIES</span>
          </div>
          <p style={{ fontSize: "0.7rem", color: "white", letterSpacing: "0.1em" }}>
            © 2026 TAASA Industries. Designed for Performance.
          </p>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["Sitemap"].map(link => (
              <span key={link} style={{ fontSize: "0.7rem", color: "white", cursor: "pointer", letterSpacing: "0.1em" }}
                onMouseEnter={(e) => e.target.style.color = "#c8a050"} onMouseLeave={(e) => e.target.style.color = "white"}>
                {link}
              </span>
            ))}
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
