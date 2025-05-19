import { useState } from "react";
import axios from "../axios";

const ForgotPassword = () => {
  const [forgotEmail, setForgotEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/auth/forgot-password", { email: forgotEmail });
      setMessage("Password reset link sent! Please check your email.");
      setForgotEmail("");
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to send reset link. Try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 transition-all duration-300">
      <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center w-full max-w-sm animate-fadeIn">
        <h3 className="mb-2 text-2xl font-semibold text-blue-700">
          Reset Password
        </h3>
        <p className="mb-4 text-gray-500 text-center text-sm">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        <form
          onSubmit={handleForgotPassword}
          className="flex flex-col items-center w-full"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            className="mb-4 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex gap-2 w-full">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-4 py-2 hover:cursor-pointer rounded hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Link"}
            </button>
            <a
              href="/"
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded text-center hover:bg-gray-400 transition"
            >
              Cancel
            </a>
          </div>
        </form>
        {message && (
          <div className="mt-4 text-center text-sm text-green-600 font-medium">
            {message}
          </div>
        )}
      </div>
      {/* Optional: Add fade-in animation */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.3s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default ForgotPassword;
