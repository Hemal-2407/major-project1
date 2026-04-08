import React from "react";
import { Edit3, Trash2, AlertCircle, Layers, Box, ChevronRight } from "lucide-react";

const ProductTable = ({ products, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-white overflow-hidden">
            {/* Horizontal Scroll Container */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                        <tr className="bg-[#0f172a] text-white">
                            <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] border-r border-white/5">
                                Product Details
                            </th>
                            <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] border-r border-white/5">
                                Pricing Status
                            </th>
                            <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-center border-r border-white/5">
                                Variants
                            </th>
                            <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {products.map((p) => {
                            const isComplete = p.basePrice > 0 && p.unitType;
                            
                            return (
                                <tr key={p._id} className="group hover:bg-slate-50/80 transition-all duration-300">
                                    {/* Column 1: Image & Identity */}
                                    <td className="p-8">
                                        <div className="flex items-center gap-6">
                                            <div className="relative w-16 h-16 rounded-[1.25rem] overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                                                <img
                                                    src={`http://localhost:5000/images/${p.image}`}
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                    alt={p.name}
                                                    onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image"; }}
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-black text-slate-800 text-lg leading-tight mb-1 uppercase tracking-tighter">
                                                    {p.name || "Undefined Profile"}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <Box size={10} className="text-amber-500" />
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                                                        {p.category?.name || "Premium Collection"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Column 2: Pricing - Emerald Theme */}
                                    <td className="p-8">
                                        {isComplete ? (
                                            <div className="flex flex-col">
                                                <div className="flex items-baseline gap-1 text-emerald-600">
                                                    <span className="text-xl font-black tracking-tighter">
                                                        ₹{p.basePrice}
                                                    </span>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase">
                                                        / {p.unitType}
                                                    </span>
                                                </div>
                                                <div className="w-8 h-[2px] bg-emerald-500/20 rounded-full mt-1 group-hover:w-12 transition-all"></div>
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-100 text-amber-600 font-black text-[9px] uppercase tracking-widest animate-pulse">
                                                <AlertCircle size={12} /> Pending Data
                                            </div>
                                        )}
                                    </td>

                                    {/* Column 3: Variants - Slate/Amber Theme */}
                                    <td className="p-8 text-center">
                                        <div className="inline-flex items-center gap-2.5 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm group-hover:border-amber-200 transition-colors">
                                            <Layers size={14} className="text-amber-500" />
                                            <span className="text-[11px] font-black text-slate-600 uppercase tracking-wide">
                                                {p.variants?.length || 1} <span className="text-slate-300 font-bold">Shades</span>
                                            </span>
                                        </div>
                                    </td>

                                    {/* Column 4: Action Suite */}
                                    <td className="p-8">
                                        <div className="flex justify-end gap-3 md:opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 md:translate-x-4">
                                            <button 
                                                onClick={() => onEdit(p)}
                                                className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-amber-600 hover:border-amber-100 hover:shadow-xl hover:shadow-amber-900/5 transition-all active:scale-90"
                                                title="Modify Profile"
                                            >
                                                <Edit3 size={18} />
                                            </button>

                                            <button
                                                onClick={() => onDelete(p._id)}
                                                className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-red-600 hover:border-red-100 hover:shadow-xl hover:shadow-red-900/5 transition-all active:scale-90"
                                                title="Remove Profile"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            
            {/* Bottom Utility Bar */}
            <div className="bg-slate-50/50 p-4 px-8 flex justify-between items-center border-t border-slate-100">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    Displaying {products.length} Inventory Records
                </p>
                <div className="hidden md:flex items-center gap-2 text-[9px] font-bold text-amber-600 uppercase tracking-[0.2em]">
                    Security Protocol Active <ChevronRight size={10} />
                </div>
            </div>
        </div>
    );
};

export default ProductTable;