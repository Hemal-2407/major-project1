import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ProductForm from "../components/admin/ProductForm";
import ProductTable from "../components/admin/ProductTable";
import { PlusCircle,  Database, Activity } from "lucide-react";

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/products");
            setProducts(data);
            setLoading(false);
        } catch (err) {
            console.error("Error loading products", err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Permanent Action: Delete this product from inventory?")) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                fetchProducts();
            } catch (err) {
                alert("Delete failed");
            }
        }
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingProduct(null);
        fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">Syncing Master Database</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-20 px-4 md:px-10 font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 pt-12">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-amber-600">
                            <Database size={16} />
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Live Inventory Management</span>
                        </div>
                        <h1 className="text-6xl font-serif text-slate-900 leading-none tracking-tighter">
                            Product <span className="italic text-slate-300 font-light">Library</span>
                        </h1>
                    </div>
                    
                    <button 
                        onClick={handleAddNew}
                        className="group bg-slate-900 text-white pl-10 pr-6 py-6 rounded-[2rem] font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-6 hover:bg-amber-600 transition-all shadow-2xl shadow-slate-300 active:scale-95"
                    >
                        Register New Profile 
                        <div className="bg-white/10 p-2 rounded-2xl group-hover:bg-white/20 transition-colors">
                            <PlusCircle size={22} />
                        </div>
                    </button>
                </header>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                           <Activity size={12} className="text-amber-500" /> Total SKU
                        </p>
                        <p className="text-4xl font-serif text-slate-900">{products.length}</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Categories</p>
                        <p className="text-4xl font-serif text-slate-900">
                            {[...new Set(products.map(p => p.category))].length}
                        </p>
                    </div>
                </div>

                {/* Product Table Container */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-white"
                >
                    <ProductTable 
                        products={products} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete}
                    />
                </motion.div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {showForm && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseForm}
                            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl"
                        />

                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 60 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 60 }}
                            className="relative w-full max-w-6xl max-h-[92vh] overflow-hidden bg-white rounded-[3.5rem] shadow-2xl"
                        >
                            <div className="overflow-y-auto h-full p-2">
                                <ProductForm
                                    product={editingProduct}
                                    onClose={handleCloseForm}
                                    onUpdate={handleCloseForm}
                                />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;