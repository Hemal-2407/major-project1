import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Ruler, Package, LayoutGrid, Filter, ArrowUpRight } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products"),
          axios.get("http://localhost:5000/api/categories/nested")
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category._id === selectedCategory || p.category.parentCategory?._id === selectedCategory);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full mb-4"
        />
        <p className="font-serif italic text-slate-500">Cataloging Excellence...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER SECTION */}
        <header className="mb-16 border-b border-slate-200 pb-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-[0.3em] mb-2 block">
              The TAASA Collection
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-slate-950 leading-tight">
              Architectural <span className="italic text-slate-500 font-light text-4xl md:text-5xl block md:inline">Profiles</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <Filter size={16} />
            <span>Showing {filteredProducts.length} Results</span>
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-12">
          
          {/* SIDEBAR: Premium Filter */}
          <aside className="w-full md:w-72 sticky top-32 h-fit">
            <div className="bg-white/50 backdrop-blur-sm border border-white p-8 rounded-3xl shadow-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-3">
                <LayoutGrid size={14} className="text-amber-600" /> Browse Catalog
              </h3>
              
              <div className="space-y-6">
                <button 
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left group flex items-center justify-between text-sm font-bold transition-all ${selectedCategory === "all" ? "text-amber-600" : "text-slate-600 hover:text-slate-950"}`}
                >
                  All Masterpieces
                  {selectedCategory === "all" && <motion.div layoutId="dot" className="w-1 h-1 bg-amber-600 rounded-full" />}
                </button>

                {categories.map(main => (
                  <div key={main._id} className="space-y-4 pt-2">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter border-b border-slate-100 pb-2">
                      {main.name}
                    </p>
                    <div className="space-y-3 pl-2">
                      {main.subcategories.map(sub => (
                        <button 
                          key={sub._id}
                          onClick={() => setSelectedCategory(sub._id)}
                          className={`w-full text-left text-[13px] flex items-center justify-between transition-all ${selectedCategory === sub._id ? "text-amber-600 font-bold" : "text-slate-500 hover:text-slate-800"}`}
                        >
                          {sub.name}
                          {selectedCategory === sub._id && <ChevronRight size={14} />}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN GRID */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    key={product._id}
                    className="group"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-200 mb-6">
                      <img 
                        src={`http://localhost:5000/images/${product.image}`} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      
                      {/* Premium Overlay Badge */}
                      <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <Link to={`/product/${product._id}`}>
                          <button className="w-full bg-white/90 backdrop-blur-md text-slate-950 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-amber-600 hover:text-white transition-colors">
                            Explore Profile <ArrowUpRight size={14} />
                          </button>
                        </Link>
                      </div>

                      <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur px-3 py-1.5 rounded-lg text-[9px] font-bold text-white uppercase tracking-widest">
                        {product.unitType === 'sqft' ? 'SQ.FT' : 'R.FT'}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
                            {product.category?.name}
                          </span>
                          <h2 className="text-xl font-serif text-slate-900 group-hover:text-amber-600 transition-colors">
                            {product.name}
                          </h2>
                        </div>
                      </div>

                      <div className="flex items-end justify-between border-t border-slate-100 pt-4">
                        <div>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter mb-1">Investment Starting At</p>
                          <p className="text-2xl font-light text-slate-950">
                            <span className="text-sm mr-1 font-serif">₹</span>
                            {product.basePrice.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <div className="p-2 rounded-full border border-slate-100 text-slate-300">
                            {product.unitType === 'sqft' ? <Ruler size={16} /> : <Package size={16} />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* EMPTY STATE */}
            {filteredProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200"
              >
                <p className="font-serif italic text-slate-400 text-lg">No designs match your current selection.</p>
                <button 
                   onClick={() => setSelectedCategory("all")}
                   className="mt-4 text-amber-600 font-bold text-xs uppercase tracking-widest hover:underline"
                >
                  Reset Filter
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;

