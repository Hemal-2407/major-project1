import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { LogIn, Lock, Mail } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Authenticating...");

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", { email, password });
      
      // Store the JWT token
      localStorage.setItem("adminToken", res.data.token);
      
      toast.dismiss(loadingToast);
      toast.success("Welcome, Administrator!");
      
      // Redirect to Admin Panel
      setTimeout(() => navigate("/admin"), 1500);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">
      <Toaster position="top-center" />
      <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-slate-900">TasauPVC</h1>
          <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mt-2">Control Portal Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                type="email" 
                required
                className="w-full pl-10 pr-4 py-3 border-b border-slate-200 outline-none focus:border-amber-600 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                type="password" 
                required
                className="w-full pl-10 pr-4 py-3 border-b border-slate-200 outline-none focus:border-amber-600 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-amber-600 transition-all">
            Access Portal <LogIn size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;