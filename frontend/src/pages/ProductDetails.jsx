import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Ruler, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Maximize2,
  CheckCircle2,
  PhoneCall,
  ArrowRight
} from "lucide-react";

// Use the name you assigned to your component file
import SurveyManager from "../components/SurveyManager";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedShade, setSelectedShade] = useState(null);
  
  // State to control the survey popup
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(7);
  const [length, setLength] = useState(10);
  const [totalEstimate, setTotalEstimate] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setSelectedShade({ name: "Standard Finish", image: data.image });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const pricePerUnit = product.basePrice || 0;
    if (product.unitType === 'sqft') {
      setTotalEstimate(width * height * pricePerUnit);
    } else {
      setTotalEstimate(length * pricePerUnit);
    }
  }, [width, height, length, product]);

  if (loading || !product) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ repeat: Infinity }} 
          className="w-24 h-1 bg-amber-500 mx-auto mb-4" 
        />
        <p className="font-serif italic text-slate-400 tracking-widest uppercase text-xs">
          Fetching Specifications
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-20 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-12">
          <span className="hover:text-amber-600 transition-colors cursor-pointer">Archive</span>
          <ChevronRight size={10} />
          <span>{product.category?.name || "uPVC Solutions"}</span>
          <ChevronRight size={10} />
          <span className="text-slate-900">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* LEFT: IMAGE GALLERY */}
          <div className="flex-1">
            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedShade?.image}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 shadow-2xl shadow-slate-200"
                >
                  <img 
                    src={`http://localhost:5000/images/${selectedShade?.image}`} 
                    className="w-full h-full object-cover" 
                    alt={selectedShade?.name} 
                  />
                </motion.div>
              </AnimatePresence>

              {/* Material Shade Selector */}
              {product.variants?.length > 0 && (
                <div className="mt-10 p-10 bg-white border border-slate-100 rounded-3xl shadow-sm">
                  <h4 className="text-[10px] font-bold text-amber-600 uppercase mb-6 tracking-widest">
                    Available Material Finishes
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => setSelectedShade({ name: "Standard Finish", image: product.image })}
                      className={`w-12 h-12 rounded-full border-2 transition-all p-1 ${
                        selectedShade?.name === "Standard Finish" ? "border-amber-600" : "border-transparent"
                      }`}
                    >
                      <div className="w-full h-full rounded-full bg-slate-100 border border-slate-200" />
                    </button>
                    
                    {product.variants.map((v) => (
                      <button
                        key={v._id}
                        onClick={() => setSelectedShade({ name: v.shadeName, image: v.shadeImage })}
                        className={`w-12 h-12 rounded-full border-2 transition-all p-1 ${
                          selectedShade?.name === v.shadeName ? "border-amber-600" : "border-transparent"
                        }`}
                      >
                        <div 
                          className="w-full h-full rounded-full border border-slate-200" 
                          style={{ 
                            backgroundImage: `url(http://localhost:5000/images/${v.shadeImage})`, 
                            backgroundSize: 'cover' 
                          }}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="mt-6 text-[11px] font-medium text-slate-500 uppercase tracking-widest italic">
                    Currently Viewing: <span className="text-slate-900 font-bold">{selectedShade?.name}</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: CONTENT & CALCULATOR */}
          <div className="flex-1 space-y-12">
            <section className="space-y-6">
              <span className="bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {product.unitType === 'sqft' ? 'Precision Area Pricing' : 'Linear Measurement'}
              </span>
              <h1 className="text-5xl md:text-6xl font-serif text-slate-950 leading-tight">
                {product.name}
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed font-light max-w-xl">
                {product.description}
              </p>
            </section>

            {/* LIVE ESTIMATOR BOX */}
            <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white shadow-3xl shadow-slate-900/20">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-amber-600 rounded-xl">
                  <Maximize2 size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-xl">Commercial Estimate</h3>
                  <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                    Adjust dimensions for live pricing
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10 mb-12">
                {product.unitType === 'sqft' ? (
                  <>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Ruler size={12} className="text-amber-500" /> Width (ft)
                      </label>
                      <input 
                        type="number" 
                        value={width} 
                        onChange={(e)=>setWidth(parseFloat(e.target.value) || 0)} 
                        className="w-full bg-slate-900 border-b border-slate-700 py-3 text-3xl font-light focus:border-amber-500 outline-none transition-colors" 
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Ruler size={12} className="text-amber-500 rotate-90" /> Height (ft)
                      </label>
                      <input 
                        type="number" 
                        value={height} 
                        onChange={(e)=>setHeight(parseFloat(e.target.value) || 0)} 
                        className="w-full bg-slate-900 border-b border-slate-700 py-3 text-3xl font-light focus:border-amber-500 outline-none transition-colors" 
                      />
                    </div>
                  </>
                ) : (
                  <div className="col-span-2 space-y-4">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Ruler size={12} className="text-amber-500" /> Running Length (ft)
                    </label>
                    <input 
                      type="number" 
                      value={length} 
                      onChange={(e)=>setLength(parseFloat(e.target.value) || 0)} 
                      className="w-full bg-slate-900 border-b border-slate-700 py-3 text-3xl font-light focus:border-amber-500 outline-none transition-colors" 
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-10 border-t border-slate-800">
                <div>
                  <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-2">Projected Investment</p>
                  <p className="text-6xl font-light tracking-tighter">
                    <span className="text-2xl font-serif mr-1 italic">₹</span>
                    {totalEstimate.toLocaleString()}
                  </p>
                </div>
                <div className="text-slate-500 text-[9px] font-bold uppercase tracking-widest text-right leading-loose">
                  *Rate: ₹{product.basePrice} / {product.unitType}<br/>
                  *Excludes Installation & Taxes
                </div>
              </div>
            </div>

            {/* Feature Tags */}
            <div className="grid grid-cols-2 gap-6">
              {product.features?.map((f, i) => (
                <div key={i} className="flex items-center gap-4 py-4 border-b border-slate-100 group">
                  <CheckCircle2 size={16} className="text-amber-600 group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">{f}</span>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-12 py-6">
              <div className="flex items-center gap-3">
                <ShieldCheck size={24} className="text-slate-300" />
                <p className="text-[9px] font-bold uppercase leading-tight text-slate-500 tracking-widest">Lifetime<br/>Termite Warranty</p>
              </div>
              <div className="flex items-center gap-3">
                <Truck size={24} className="text-slate-300" />
                <p className="text-[9px] font-bold uppercase leading-tight text-slate-500 tracking-widest">Nationwide<br/>Rapid Delivery</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-amber-600 text-white py-6 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-amber-700 transition-all flex items-center justify-center gap-3"
              >
                <PhoneCall size={18} /> Schedule Measurement Survey
              </button>
              
              <button className="w-full border border-slate-200 py-6 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                Download Technical Datasheet <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* MODAL / SURVEY MANAGER COMPONENT */}
      {/* We wrap this to ensure it stays on top of all page elements */}
      <div className="relative z-[9999]">
        <SurveyManager 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          productName={product?.name} 
        />
      </div>
    </div>
  );
};

export default ProductDetails;