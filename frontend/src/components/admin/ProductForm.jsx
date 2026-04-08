import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, Save, Loader2, Package, Tag, IndianRupee, Layers, Image as ImageIcon } from "lucide-react";
import VariantInput from "./VariantInput";

const ProductForm = ({ product, onClose, onUpdate }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [variants, setVariants] = useState(product?.variants || []);
    const [isSaving, setIsSaving] = useState(false);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: product?.name || "",
        basePrice: product?.basePrice || 0,
        unitType: product?.unitType || "sqft",
        description: product?.description || "",
        category: product?.category?._id || product?.category || ""
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/categories");
                setCategories(res.data);
            } catch (err) {
                console.error("Failed to load categories:", err);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const data = new FormData();
        data.append("name", formData.name);
        data.append("basePrice", formData.basePrice);
        data.append("unitType", formData.unitType);
        data.append("description", formData.description);
        data.append("category", formData.category); 

        if (selectedFile) {
            data.append("image", selectedFile);
        }

        const cleanVariants = variants.map(({ previewUrl, imageFile, ...rest }) => rest);
        data.append("variants", JSON.stringify(cleanVariants));

        variants.forEach((v, index) => {
            if (v.imageFile) {
                data.append(`variantImage_${index}`, v.imageFile);
            }
        });

        try {
            const isEdit = product && product._id;
            const url = isEdit 
                ? `http://localhost:5000/api/products/${product._id}` 
                : `http://localhost:5000/api/products/add`;
            
            const method = isEdit ? "patch" : "post";

            await axios({
                method: method,
                url: url,
                data: data,
                headers: { "Content-Type": "multipart/form-data" },
            });
            
            onUpdate(); 
            onClose();  
        } catch (err) {
            console.error("Operation failed:", err.response?.data || err.message);
            const errorMsg = err.response?.data?.error || err.response?.data?.message || "Something went wrong";
            alert(`Error: ${errorMsg}`);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-md z-[999] flex items-center justify-center p-4">
            <div className="bg-white rounded-[3rem] w-full max-w-xl shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] flex flex-col max-h-[92vh] border border-white/20 animate-in fade-in zoom-in duration-300">
                
                {/* Premium Header */}
                <div className="p-10 border-b border-slate-100 flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="font-black text-2xl uppercase tracking-tighter text-slate-900">
                            {product ? "Edit Product" : "New Catalog Entry"}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="w-8 h-[2px] bg-emerald-500 rounded-full"></span>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                {product ? `Profile ID: ${product._id.slice(-6)}` : "Inventory Management V1.0"}
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-3 hover:bg-slate-100 rounded-2xl transition-all text-slate-400 hover:text-slate-900 active:scale-90"
                    >
                        <X size={24} strokeWidth={3} />
                    </button>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-10 overflow-y-auto space-y-8 custom-scrollbar">
                    
                    {/* Product Name & Category Group */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Product Name</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Luxury Casement"
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.25rem] p-4 pl-12 font-bold text-slate-800 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <Package className="absolute left-4 top-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Category</label>
                            <div className="relative group">
                                <select
                                    required
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.25rem] p-4 pl-12 font-bold text-slate-800 outline-none focus:border-amber-500 focus:bg-white appearance-none cursor-pointer transition-all"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                                <Tag className="absolute left-4 top-4 text-slate-300 group-focus-within:text-amber-500 transition-colors" size={20} />
                            </div>
                        </div>
                    </div>

                    {/* Pricing Architecture */}
                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Base Price</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        required
                                        className="w-full bg-white border-2 border-white rounded-xl p-4 pl-12 font-black text-emerald-600 outline-none focus:border-emerald-500 transition-all"
                                        value={formData.basePrice}
                                        onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                                    />
                                    <IndianRupee className="absolute left-4 top-4 text-emerald-500/50" size={20} />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Measurement Unit</label>
                                <select
                                    className="w-full bg-white border-2 border-white rounded-xl p-4 font-black text-slate-600 outline-none focus:border-slate-300 cursor-pointer"
                                    value={formData.unitType}
                                    onChange={(e) => setFormData({ ...formData, unitType: e.target.value })}
                                >
                                    <option value="sqft">SQ. FEET</option>
                                    <option value="rft">RUNNING FEET</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Variant Section Container */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                            <Layers size={14} className="text-amber-500" /> Technical Variants
                        </label>
                        <div className="p-2 border-2 border-dashed border-slate-100 rounded-[2rem]">
                            <VariantInput variants={variants} setVariants={setVariants} />
                        </div>
                    </div>

                    {/* Visual Media Upload */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                            <ImageIcon size={14} className="text-slate-400" /> Master Profile Image
                        </label>
                        <div className="relative group overflow-hidden bg-slate-50 border-2 border-slate-100 rounded-[1.25rem] p-4 transition-all hover:border-slate-300">
                            <input
                                type="file"
                                accept="image/*"
                                required={!product} 
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                className="w-full text-xs font-black text-slate-400 file:mr-6 file:py-2 file:px-6 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-[#0f172a] file:text-white file:uppercase hover:file:bg-emerald-600 file:transition-colors cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Action Suite */}
                    <button 
                        type="submit" 
                        disabled={isSaving}
                        className={`w-full py-6 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-xl ${
                            isSaving 
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                            : 'bg-[#0f172a] text-white hover:bg-emerald-600 shadow-emerald-900/10'
                        }`}
                    >
                        {isSaving ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <Save size={20} />
                        )}
                        {isSaving ? "Synchronizing..." : product ? "Update Catalog" : "Commit to Inventory"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;