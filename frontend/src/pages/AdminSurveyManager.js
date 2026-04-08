import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Calendar, 
  User, 
  Phone, 
  MapPin, 
  Package, 
  Trash2, 
  CheckCircle,
  Clock,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminSurveyManager = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All"); // All, Pending, Done

  const fetchSurveys = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/surveys");
      setSurveys(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching surveys:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  // NEW: Update Status Function
  const toggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "Pending" ? "Done" : "Pending";
    try {
      const { data } = await axios.put(`http://localhost:5000/api/surveys/${id}`, { 
        status: nextStatus 
      });
      // Update the local state so the UI changes immediately
      setSurveys(surveys.map(s => s._id === id ? { ...s, status: data.status } : s));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const deleteSurvey = async (id) => {
    if (window.confirm("Are you sure you want to remove this request?")) {
      try {
        await axios.delete(`http://localhost:5000/api/surveys/${id}`);
        setSurveys(surveys.filter((s) => s._id !== id));
      } catch (err) {
        alert("Error deleting record");
      }
    }
  };

  const filteredSurveys = surveys.filter(s => filter === "All" || s.status === filter);

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
    </div>
  );

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header Section */}
      <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.3em] mb-2 block">
            Operations Portal
          </span>
          <h1 className="text-5xl font-serif text-slate-900">
            Site <span className="italic text-slate-400 font-light">Surveys</span>
          </h1>
        </div>

        {/* Filter Controls */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
          {["All", "Pending", "Done"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === type ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="text-right hidden md:block">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Results</p>
          <p className="text-4xl font-light text-slate-900">{filteredSurveys.length}</p>
        </div>
      </header>

      {/* Survey Grid */}
      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {filteredSurveys.map((survey, index) => (
            <motion.div
              key={survey._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group relative bg-slate-50 border border-slate-100 rounded-[2rem] p-8 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                
                {/* Product & User Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
                      <Package size={16} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-tighter text-slate-900">
                      {survey.productName}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                      survey.status === "Pending" 
                        ? "bg-white border border-amber-200 text-amber-600" 
                        : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {survey.status === "Pending" ? "New Request" : "Completed"}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-slate-600">
                    <User size={14} className="text-slate-400" />
                    <span className="text-sm font-serif italic text-slate-900">{survey.name}</span>
                    <span className="h-1 w-1 bg-slate-300 rounded-full" />
                    <Phone size={14} className="text-slate-400" />
                    <span className="text-xs font-bold tracking-widest">{survey.phone}</span>
                  </div>
                </div>

                {/* Logistics */}
                <div className="flex-1 border-l border-slate-200 pl-8 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin size={14} className="mt-1 text-amber-600" />
                    <p className="text-[11px] font-medium leading-relaxed text-slate-500 uppercase tracking-wide max-w-xs">
                      {survey.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={14} className="text-slate-400" />
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                      {new Date(survey.preferredDate).toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => toggleStatus(survey._id, survey.status)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                      survey.status === "Done"
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                        : "bg-slate-900 text-white hover:bg-amber-600 shadow-lg shadow-slate-200"
                    }`}
                  >
                    <CheckCircle size={14} /> 
                    {survey.status === "Done" ? "Completed" : "Mark Done"}
                  </button>
                  <button 
                    onClick={() => deleteSurvey(survey._id)}
                    className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-100 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredSurveys.length === 0 && (
          <div className="text-center py-40 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <Clock size={40} className="mx-auto text-slate-200 mb-4" />
            <p className="font-serif italic text-slate-400">No {filter.toLowerCase()} survey requests found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSurveyManager;