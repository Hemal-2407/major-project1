import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );

      alert(res.data.message);
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-6">

      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 relative overflow-hidden">
        
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-serif text-slate-900 mb-2">
            Reset Password
          </h2>

          <p className="text-slate-500 text-sm mb-8">
            Enter your new password
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            />

            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-3 rounded-xl font-bold tracking-wide hover:bg-amber-700 transition shadow-lg shadow-amber-200"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;