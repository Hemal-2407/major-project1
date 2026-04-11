import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    contact: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      alert(res.data.message);
      navigate("/product");
    } catch (err) {
      alert(err.response.data.message||"Error");
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
          Welcome Back 👋
        </h2>
        <p className="text-slate-500 text-sm mb-8">
          Login to continue your experience
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
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
            Login
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-slate-500">
            New user?{" "}
            <Link
              to="/register"
              className="text-amber-600 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>

          <Link
            to="/forgot-password"
            className="text-sm text-slate-400 hover:text-amber-600 transition"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  </div>
);
}
 export default Login;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();

//   const [step, setStep] = useState(1);
//   const [contact, setContact] = useState("");
//   const [otp, setOtp] = useState("");
//   const [timer, setTimer] = useState(30);

//   // ⏱ Timer
//   useEffect(() => {
//     if (step === 2 && timer > 0) {
//       const interval = setInterval(() => {
//         setTimer(prev => prev - 1);
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [step, timer]);

//   // 🔹 Send OTP
//   const sendOtp = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/send-otp",
//         { contact }
//       );

//       alert(res.data.message);
//       setStep(2);
//       setTimer(30);

//     } catch (err) {
//       alert(err.response?.data?.message || "Error");
//     }
//   };

//   // 🔹 Verify OTP
//   const verifyOtp = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/verify-otp",
//         { contact, otp }
//       );

//       localStorage.setItem("token", res.data.token);

//       alert("Login Successful");
//       navigate("/products");

//     } catch (err) {
//       alert(err.response?.data?.message || "Error");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-6">
      
//       <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10">
        
//         <h2 className="text-3xl font-serif mb-6 text-slate-900">
//           OTP Login
//         </h2>

//         {step === 1 && (
//           <>
//             <input
//               type="text"
//               placeholder="Enter Phone Number"
//               value={contact}
//               onChange={(e) => setContact(e.target.value)}
//               className="w-full px-5 py-3 border rounded-xl mb-4 focus:ring-2 focus:ring-amber-500"
//             />

//             <button
//               onClick={sendOtp}
//               className="w-full bg-amber-600 text-white py-3 rounded-xl"
//             >
//               Send OTP
//             </button>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full px-5 py-3 border rounded-xl mb-4 focus:ring-2 focus:ring-amber-500"
//             />

//             <button
//               onClick={verifyOtp}
//               className="w-full bg-amber-600 text-white py-3 rounded-xl"
//             >
//               Verify OTP
//             </button>

//             <button
//               disabled={timer > 0}
//               onClick={sendOtp}
//               className="text-sm text-amber-600 mt-3"
//             >
//               {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Login;