import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    contact: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-6">
    
    <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

      <div className="relative z-10">
        {/* Heading */}
        <h2 className="text-3xl font-serif text-slate-900 mb-2">
          Create Account 🚀
        </h2>
        <p className="text-slate-500 text-sm mb-8">
          Join us and start your experience
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
          />

          {/* Contact */}
          <input
            type="text"
            name="contact"
            placeholder="Email or Phone"
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-3 rounded-xl font-bold tracking-wide hover:bg-amber-700 transition shadow-lg shadow-amber-200"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-amber-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);
}

export default Register;