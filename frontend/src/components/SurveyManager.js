import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Phone, MapPin, Calendar, CheckCircle2 } from "lucide-react";

const SurveyManager = ({ isOpen, onClose, productName }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    preferredDate: "",
  });
  const [loading, setLoading] = useState(false);

  // Get today's date in YYYY-MM-DD format for the 'min' attribute
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final Validation Check
    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/surveys", {
        ...formData,
        productName: productName || "Custom Solution",
      });
      
      alert("Survey Requested Successfully! Our team will call you shortly.");
      setFormData({ name: "", phone: "", address: "", preferredDate: "" });
      onClose();
    } catch (err) {
      console.error("Error submitting survey:", err);
      alert("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check if form is valid to enable button styling
  const isFormValid = 
    formData.name.trim().length >= 3 && 
    /^\d{10}$/.test(formData.phone) && 
    formData.address.trim().length >= 10 && 
    formData.preferredDate !== "";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
          >
            <div className="p-8 md:p-12">
              <button 
                onClick={onClose} 
                className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors p-2 hover:bg-slate-50 rounded-full"
              >
                <X size={20} />
              </button>

              <header className="mb-10">
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.3em] mb-3 block">
                  Concierge Service
                </span>
                <h2 className="text-4xl font-serif text-slate-900 leading-tight">
                  Request <span className="italic text-slate-500">Survey</span>
                </h2>
                <div className="h-1 w-12 bg-amber-500 mt-4 mb-2" />
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest italic">
                  Project: <span className="text-slate-900 font-bold not-italic">{productName || "Custom Solution"}</span>
                </p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-600 transition-colors" size={16} />
                  <input
                    required
                    type="text"
                    minLength="3"
                    value={formData.name}
                    placeholder="FULL NAME"
                    className="w-full bg-slate-50 border border-slate-100 py-5 pl-14 pr-6 rounded-2xl outline-none focus:bg-white focus:border-amber-500 focus:shadow-lg focus:shadow-amber-500/5 transition-all text-[11px] font-bold tracking-widest placeholder:text-slate-300 uppercase"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {/* Contact Number with 10-digit validation */}
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-600 transition-colors" size={16} />
                  <input
                    required
                    type="tel"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    value={formData.phone}
                    placeholder="CONTACT NUMBER (10 DIGITS)"
                    className="w-full bg-slate-50 border border-slate-100 py-5 pl-14 pr-6 rounded-2xl outline-none focus:bg-white focus:border-amber-500 focus:shadow-lg focus:shadow-amber-500/5 transition-all text-[11px] font-bold tracking-widest placeholder:text-slate-300 uppercase"
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, ""); // Only allow numbers
                      setFormData({ ...formData, phone: val });
                    }}
                  />
                  {formData.phone.length === 10 && (
                    <CheckCircle2 size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-500" />
                  )}
                </div>

                {/* Site Address */}
                <div className="relative group">
                  <MapPin className="absolute left-5 top-6 text-slate-300 group-focus-within:text-amber-600 transition-colors" size={16} />
                  <textarea
                    required
                    minLength="10"
                    value={formData.address}
                    placeholder="SITE LOCATION ADDRESS (MIN 10 CHARS)"
                    rows="3"
                    className="w-full bg-slate-50 border border-slate-100 py-5 pl-14 pr-6 rounded-2xl outline-none focus:bg-white focus:border-amber-500 focus:shadow-lg focus:shadow-amber-500/5 transition-all text-[11px] font-bold tracking-widest placeholder:text-slate-300 uppercase resize-none"
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  ></textarea>
                </div>

                {/* Preferred Date with min=today */}
                <div className="relative group">
                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-600 transition-colors" size={16} />
                  <input
                    required
                    type="date"
                    min={today}
                    value={formData.preferredDate}
                    className="w-full bg-slate-50 border border-slate-100 py-5 pl-14 pr-6 rounded-2xl outline-none focus:bg-white focus:border-amber-500 focus:shadow-lg focus:shadow-amber-500/5 transition-all text-[11px] font-bold tracking-widest text-slate-900 uppercase"
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  />
                </div>

                <button
                  disabled={loading}
                  className={`w-full py-6 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 transition-all shadow-2xl mt-4 group 
                    ${isFormValid 
                      ? "bg-slate-950 text-white hover:bg-amber-600 shadow-slate-900/20" 
                      : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                    }`}
                >
                  {loading ? (
                    "Syncing with Server..."
                  ) : (
                    <>
                      Confirm Technical Visit 
                      <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-[9px] text-slate-400 uppercase tracking-widest mt-8 font-medium">
                * Our engineering team typically responds within 24 business hours.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SurveyManager;