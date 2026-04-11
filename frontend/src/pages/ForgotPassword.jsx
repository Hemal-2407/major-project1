import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [contact, setContact] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { contact }
      );

      setLink(res.data.link); // 🔥 store link

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-6">
      
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full border px-4 py-3 rounded-xl mb-4"
          />

          <button className="w-full bg-amber-600 text-white py-3 rounded-xl">
            Generate Reset Link
          </button>
        </form>

        {/* 🔥 SHOW LINK */}
        {link && (
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-2">
              Click link to reset password:
            </p>

            <a
              href={link}
              className="text-blue-600 underline break-all"
            >
              {link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;