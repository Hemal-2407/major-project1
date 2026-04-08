import React from "react";
import { Plus, Trash2, ImageIcon, UploadCloud, Palette, Hash } from "lucide-react";

const VariantInput = ({ variants, setVariants }) => {
  
  // 1. Add a new empty shade row
  const addVariant = () => {
    setVariants([
      ...variants, 
      { shadeName: "", hexCode: "#0f172a", imageFile: null, previewUrl: null }
    ]);
  };

  // 2. Remove a shade row
  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  // 3. Update Text or Color fields
  const updateVariant = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  // 4. Handle Shade Image Upload & Preview
  const handleImageChange = (index, file) => {
    if (!file) return;
    
    const newVariants = [...variants];
    newVariants[index].imageFile = file; 
    newVariants[index].previewUrl = URL.createObjectURL(file); 
    setVariants(newVariants);
  };

  return (
    <div className="space-y-6 mt-8">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b-2 border-slate-50 pb-4">
        <div className="flex items-center gap-2">
          <Palette size={16} className="text-amber-500" />
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
            Surface Finish & Shades
          </label>
        </div>
        <button 
          type="button" 
          onClick={addVariant} 
          className="bg-amber-50 text-amber-600 font-black text-[10px] px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-amber-500 hover:text-white transition-all shadow-sm uppercase tracking-widest active:scale-95"
        >
          <Plus size={14} strokeWidth={3} /> Add New Shade
        </button>
      </div>

      {/* Variants Grid */}
      <div className="grid gap-4">
        {variants.map((v, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-5 items-center bg-white p-5 rounded-[2rem] border-2 border-slate-50 group transition-all hover:border-amber-100 hover:shadow-xl hover:shadow-slate-200/40">
            
            {/* SHADE IMAGE UPLOADER */}
            <div className="relative w-20 h-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-amber-400 group-hover:bg-amber-50/30 transition-all duration-300">
              {v.previewUrl || v.shadeImage ? (
                <img 
                  src={v.previewUrl || `http://localhost:5000/images/${v.shadeImage}`} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                  alt="shade preview" 
                />
              ) : (
                <div className="flex flex-col items-center text-slate-300 group-hover:text-amber-400 transition-colors">
                  <UploadCloud size={24} />
                  <span className="text-[8px] font-black uppercase mt-1 tracking-tighter">Upload</span>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                onChange={(e) => handleImageChange(index, e.target.files[0])}
              />
            </div>

            {/* INPUTS SECTION */}
            <div className="flex-1 w-full space-y-3">
              <div className="flex flex-wrap md:flex-nowrap gap-4 items-center">
                
                {/* Shade Name Input */}
                <div className="flex-1 min-w-[200px] relative">
                  <input
                    type="text"
                    placeholder="e.g. WALNUT TEAK"
                    className="w-full bg-slate-50 border-2 border-transparent rounded-xl p-3 pr-4 font-black text-xs text-slate-800 placeholder:text-slate-300 uppercase tracking-wide focus:bg-white focus:border-amber-200 outline-none transition-all"
                    value={v.shadeName}
                    onChange={(e) => updateVariant(index, "shadeName", e.target.value)}
                  />
                </div>
                
                {/* Color Hex Input */}
                <div className="flex items-center gap-3 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 group-hover:bg-white transition-colors">
                   <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-white shadow-sm shrink-0">
                    <input
                      type="color"
                      className="absolute -inset-2 w-10 h-10 cursor-pointer border-none p-0"
                      value={v.hexCode}
                      onChange={(e) => updateVariant(index, "hexCode", e.target.value)}
                    />
                   </div>
                   <div className="flex items-center gap-1">
                     <Hash size={10} className="text-slate-300" />
                     <span className="text-[10px] font-mono font-black text-slate-500 uppercase w-14">
                       {v.hexCode.replace('#', '')}
                     </span>
                   </div>
                </div>

                {/* Delete Button */}
                <button 
                  type="button" 
                  onClick={() => removeVariant(index)} 
                  className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {variants.length === 0 && (
          <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50 group hover:bg-white transition-colors duration-500">
            <div className="relative w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
              <ImageIcon size={28} className="text-slate-200 group-hover:text-amber-300 transition-colors" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              Waiting for shade profiles...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VariantInput;