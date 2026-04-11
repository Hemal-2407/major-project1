import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Plus, Folder, Trash2, Edit3, Save, Loader2, 
  Layers, ChevronRight, Hash 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/categories");
            setCategories(res.data);
        } catch (err) {
            console.error("Error fetching categories", err);
        }
    };

    useEffect(() => { fetchCategories(); }, []);

    const startEdit = (category) => {
        setEditingId(category._id);
        setName(category.name);
        setParentCategory(category.parentCategory?._id || "");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setName("");
        setParentCategory("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = { name, parentCategory: parentCategory || null };
            if (editingId) {
                await axios.put(`http://localhost:5000/api/categories/${editingId}`, payload);
            } else {
                await axios.post("http://localhost:5000/api/categories/add", payload);
            }
            cancelEdit();
            fetchCategories();
        } catch (err) {
            alert("Operation failed: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id) => {
        if (!window.confirm("Permanent Action: Delete this category and all its associations?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/categories/${id}`);
            fetchCategories();
        } catch (err) {
            alert("Delete failed");
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            {/* Header Section */}
            <header className="pt-10">
                <div className="flex items-center gap-3 text-amber-600 mb-2">
                    <Layers size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Structure & Taxonomy</span>
                </div>
                <h1 className="text-5xl font-serif text-slate-900 leading-none">
                    Category <span className="italic text-slate-400 font-light">Architecture</span>
                </h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                
                {/* DYNAMIC FORM SECTION */}
                <div className="lg:col-span-1 sticky top-28">
                    <motion.div 
                        layout
                        className={`p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border-t-4 transition-all duration-500 ${
                            editingId ? 'bg-slate-900 border-amber-500 text-white' : 'bg-white border-slate-900 text-slate-900'
                        }`}
                    >
                        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                            {editingId ? <Edit3 size={16} className="text-amber-500" /> : <Plus size={16} className="text-amber-500" />}
                            {editingId ? "Modify Existing" : "Create Taxonomy"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className={`text-[9px] font-bold uppercase tracking-widest ${editingId ? 'text-slate-500' : 'text-slate-400'}`}>Category Identity</label>
                                <input 
                                    className={`w-full rounded-2xl p-4 font-bold outline-none transition-all border ${
                                        editingId 
                                        ? 'bg-slate-800 border-slate-700 focus:border-amber-500 text-white' 
                                        : 'bg-slate-50 border-slate-100 focus:border-slate-900'
                                    }`}
                                    placeholder="e.g., Sliding Doors"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className={`text-[9px] font-bold uppercase tracking-widest ${editingId ? 'text-slate-500' : 'text-slate-400'}`}>Hierarchy Level</label>
                                <div className="relative">
                                    <select 
                                        className={`w-full appearance-none rounded-2xl p-4 font-bold outline-none transition-all border ${
                                            editingId 
                                            ? 'bg-slate-800 border-slate-700 focus:border-amber-500 text-white' 
                                            : 'bg-slate-50 border-slate-100 focus:border-slate-900'
                                        }`}
                                        value={parentCategory}
                                        onChange={(e) => setParentCategory(e.target.value)}
                                    >
                                        <option value="">Main Collection (Root)</option>
                                        {categories
                                            .filter(c => !c.parentCategory && c._id !== editingId)
                                            .map(cat => (
                                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    <ChevronRight className="absolute right-4 top-4 rotate-90 text-slate-500" size={16} />
                                </div>
                            </div>

                            <div className="pt-4 space-y-3">
                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full font-bold py-5 rounded-2xl transition-all uppercase tracking-[0.2em] text-[10px] flex justify-center items-center gap-3 shadow-xl ${
                                        editingId 
                                        ? 'bg-amber-500 text-white hover:bg-white hover:text-slate-900' 
                                        : 'bg-slate-900 text-white hover:bg-amber-600'
                                    }`}
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : (editingId ? <Save size={16} /> : <Plus size={16} />)}
                                    {editingId ? "Save Changes" : "Deploy Category"}
                                </button>
                                
                                {editingId && (
                                    <button 
                                        type="button"
                                        onClick={cancelEdit}
                                        className="w-full bg-slate-800 text-slate-400 font-bold py-4 rounded-2xl hover:text-white transition-all uppercase tracking-[0.2em] text-[10px]"
                                    >
                                        Abort Editing
                                    </button>
                                )}
                            </div>
                        </form>
                    </motion.div>
                </div>

                {/* CATEGORY LIST SECTION */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Structure</th>
                                    <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Designation</th>
                                    <th className="p-8 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <AnimatePresence>
                                    {categories.map((cat) => (
                                        <motion.tr 
                                            key={cat._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="group hover:bg-slate-50/80 transition-colors"
                                        >
                                            <td className="p-8 font-serif text-lg text-slate-800">
                                                <div className="flex items-center gap-4">
                                                    {cat.parentCategory ? (
                                                        <Hash size={14} className="text-amber-500/40" />
                                                    ) : (
                                                        <Folder size={18} className="text-slate-900" />
                                                    )}
                                                    {cat.name}
                                                </div>
                                            </td>
                                            <td className="p-8">
                                                {cat.parentCategory ? (
                                                    <span className="text-[9px] font-black text-slate-400 uppercase bg-slate-100 px-4 py-2 rounded-xl">
                                                        Sub of {cat.parentCategory.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-[9px] font-black text-amber-600 uppercase bg-amber-50 px-4 py-2 rounded-xl">
                                                        Root Component
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-8">
                                                <div className="flex justify-end gap-3">
                                                    <button 
                                                        onClick={() => startEdit(cat)}
                                                        className="p-3 bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white rounded-xl transition-all"
                                                    >
                                                        <Edit3 size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => deleteCategory(cat._id)}
                                                        className="p-3 bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                        {categories.length === 0 && (
                            <div className="p-20 text-center border-t border-slate-50">
                                <p className="text-slate-300 font-serif italic text-xl">No categories defined in catalog yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryManager;