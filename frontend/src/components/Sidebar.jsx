import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import { motion } from "framer-motion";
import { toast } from "react-hot-toast"; // Added for notification
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  ClipboardCheck, 
  LogOut,
  ChevronRight
} from "lucide-react";

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Hook for redirection

    // Logout Handler function
    const handleLogout = () => {
        // 1. Remove the token from local storage
        localStorage.removeItem("adminToken"); 

        // 2. Show a success notification
        toast.success("Logged out successfully", {
            style: {
                borderRadius: '10px',
                background: '#0f172a',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 'bold'
            },
        });

        // 3. Redirect to login page
        navigate("/login");
    };

    const menuItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin" },
        { name: "Products", icon: <Package size={18} />, path: "/admin/products" },
        { name: "Categories", icon: <Tags size={18} />, path: "/admin/categories" },
        { name: "Site Surveys", icon: <ClipboardCheck size={18} />, path: "/admin/surveys" },
    ];

    return (
        <div className="w-64 h-screen bg-[#0f172a] text-white p-7 flex flex-col fixed left-0 top-0 border-r border-slate-800/50 shadow-2xl z-50">
            {/* Branding Section */}
            <div className="mb-12 px-2">
                <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-serif italic tracking-tighter text-white">
                        Tasau<span className="text-amber-500 not-italic font-black">PVC</span>
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-[1px] w-4 bg-amber-500/50"></div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em]">Control Portal</p>
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`group flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${
                                isActive 
                                ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-900/20" 
                                : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <span className={`${isActive ? "text-white" : "text-slate-500 group-hover:text-amber-500"} transition-colors`}>
                                    {item.icon}
                                </span>
                                <span className="text-[11px] uppercase tracking-[0.15em]">{item.name}</span>
                            </div>
                            
                            {isActive && (
                                <motion.div layoutId="activeArrow">
                                    <ChevronRight size={14} className="text-amber-200" />
                                </motion.div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / User Section */}
            <div className="pt-6 border-t border-slate-800/60">
                <div className="bg-slate-800/30 p-4 rounded-2xl mb-4 border border-slate-700/30">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Active User</p>
                    <p className="text-xs font-serif italic text-slate-200">Administrator</p>
                </div>
                
                {/* Updated Logout Button with onClick handler */}
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-5 py-4 w-full text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-2xl transition-all font-bold uppercase text-[10px] tracking-widest group"
                >
                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;