// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Package, Tags, Layers, TrendingUp, ChevronRight, ClipboardCheck } from "lucide-react";
// import { Link } from "react-router-dom";

// const AdminDashboard = () => {
//     // 1. Added 'surveys' to the state
//     const [stats, setStats] = useState({ products: 0, categories: 0, collections: 0, surveys: 0 });

//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 // 2. Included the surveys API in the Promise.all
//                 const [pRes, cRes, sRes] = await Promise.all([
//                     axios.get("http://localhost:5000/api/products"),
//                     axios.get("http://localhost:5000/api/categories"),
//                     axios.get("http://localhost:5000/api/surveys") // New fetch
//                 ]);
                
//                 setStats({
//                     products: pRes.data.length,
//                     categories: cRes.data.length,
//                     collections: cRes.data.filter(c => !c.parentCategory).length,
//                     surveys: sRes.data.length // New Stat
//                 });
//             } catch (err) { 
//                 console.error("Dashboard Stats Error:", err); 
//             }
//         };
//         fetchStats();
//     }, []);

//     return (
//         <div className="space-y-8 animate-in fade-in duration-500">
//             <div>
//                 <h1 className="text-3xl font-black uppercase text-slate-800 tracking-tight">Dashboard</h1>
//                 <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Inventory & Lead Control Center</p>
//             </div>

//             {/* 3. Updated Grid to 4 columns to fit the new card */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {[
//                     { label: "Products", val: stats.products, icon: <Package />, color: "text-blue-600", bg: "bg-blue-50" },
//                     { label: "Categories", val: stats.categories, icon: <Tags />, color: "text-emerald-600", bg: "bg-emerald-50" },
//                     { label: "Collections", val: stats.collections, icon: <Layers />, color: "text-orange-600", bg: "bg-orange-50" },
//                     // NEW SURVEY CARD
//                     { label: "Surveys", val: stats.surveys, icon: <ClipboardCheck />, color: "text-amber-600", bg: "bg-amber-50" }
//                 ].map((stat) => (
//                     <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
//                         <div>
//                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
//                             <h2 className="text-4xl font-black text-slate-800">{stat.val}</h2>
//                         </div>
//                         <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl`}>{stat.icon}</div>
//                     </div>
//                 ))}
//             </div>

//             {/* 4. Added a Secondary CTA for Surveys */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-blue-100 flex flex-col justify-between items-start gap-6">
//                     <div className="space-y-2">
//                         <h3 className="text-xl font-black uppercase">Inventory Updates</h3>
//                         <p className="text-slate-400 text-sm italic">Manage your door series and pricing.</p>
//                     </div>
//                     <Link to="/admin/products" className="bg-blue-600 hover:bg-white hover:text-blue-600 transition-all px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2">
//                         Manage Products <ChevronRight size={16} />
//                     </Link>
//                 </div>

//                 <div className="bg-amber-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-amber-100 flex flex-col justify-between items-start gap-6">
//                     <div className="space-y-2">
//                         <h3 className="text-xl font-black uppercase">Measurement Leads</h3>
//                         <p className="text-amber-100/80 text-sm italic">You have {stats.surveys} pending site visits.</p>
//                     </div>
//                     <Link to="/admin/surveys" className="bg-white text-amber-600 hover:bg-slate-900 hover:text-white transition-all px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2">
//                         View Survey Requests <ChevronRight size={16} />
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Package, 
  Tags, 
  Layers, 
  ChevronRight, 
  ClipboardCheck, 
  Calendar, 
  User, 
  ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const [stats, setStats] = useState({ 
        products: 0, 
        categories: 0, 
        collections: 0, 
        surveys: 0,
        recentSurveys: [] 
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [pRes, cRes, sRes] = await Promise.all([
                    axios.get("http://localhost:5000/api/products"),
                    axios.get("http://localhost:5000/api/categories"),
                    axios.get("http://localhost:5000/api/surveys")
                ]);
                
                setStats({
                    products: pRes.data.length,
                    categories: cRes.data.length,
                    collections: cRes.data.filter(c => !c.parentCategory).length,
                    surveys: sRes.data.length,
                    // Get only the 5 most recent requests for the table
                    recentSurveys: sRes.data.slice(0, 5) 
                });
                setLoading(false);
            } catch (err) { 
                console.error("Dashboard Stats Error:", err); 
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-96 animate-pulse text-slate-400 font-bold uppercase tracking-widest">Loading Tasau Systems...</div>;

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* --- HEADER --- */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black uppercase text-slate-900 tracking-tight">System <span className="text-slate-300 font-light italic">Overview</span></h1>
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.3em] mt-1">TasauPVC Management Portal</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Server Status</p>
                    <p className="text-xs font-bold text-emerald-500 uppercase flex items-center justify-end gap-1">
                        <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping"></span> Online
                    </p>
                </div>
            </div>

            {/* --- STAT CARDS GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Products", val: stats.products, icon: <Package />, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Active Categories", val: stats.categories, icon: <Tags />, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Design Series", val: stats.collections, icon: <Layers />, color: "text-orange-600", bg: "bg-orange-50" },
                    { label: "Site Surveys", val: stats.surveys, icon: <ClipboardCheck />, color: "text-amber-600", bg: "bg-amber-50" }
                ].map((stat) => (
                    <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 flex items-center justify-between group">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h2 className="text-4xl font-black text-slate-800 group-hover:scale-110 transition-transform origin-left">{stat.val}</h2>
                        </div>
                        <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl`}>{stat.icon}</div>
                    </div>
                ))}
            </div>

            {/* --- RECENT ACTIVITY TABLE --- */}
            <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-black uppercase text-slate-800">Recent Survey Requests</h3>
                        <p className="text-xs text-slate-400 font-medium">Latest potential customers from Ahmedabad</p>
                    </div>
                    <Link to="/admin/surveys" className="text-[10px] font-black uppercase tracking-widest text-amber-600 hover:text-slate-900 flex items-center gap-2 transition-colors">
                        View All <ArrowRight size={14} />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Preferred Date</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {stats.recentSurveys.map((survey) => (
                                <tr key={survey._id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                                                <User size={14} />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">{survey.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-xs font-medium text-slate-500 uppercase tracking-tight">{survey.productName}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Calendar size={12} />
                                            {new Date(survey.preferredDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <Link to="/admin/surveys" className="p-2 inline-flex items-center justify-center rounded-lg bg-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                                            <ChevronRight size={16} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- PRIMARY CTAs --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
                <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl flex flex-col justify-between items-start gap-8 group">
                    <h3 className="text-2xl font-black uppercase leading-tight">Refine<br/>Inventory</h3>
                    <Link to="/admin/products" className="bg-amber-500 hover:bg-white hover:text-slate-900 transition-all px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                        Manage Products <ChevronRight size={16} />
                    </Link>
                </div>

                <div className="bg-amber-600 rounded-[3rem] p-10 text-white shadow-2xl flex flex-col justify-between items-start gap-8 group">
                    <h3 className="text-2xl font-black uppercase leading-tight">Analyze<br/>Market Leads</h3>
                    <Link to="/admin/surveys" className="bg-white text-amber-600 hover:bg-slate-900 hover:text-white transition-all px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                        Inspect Surveys <ChevronRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;