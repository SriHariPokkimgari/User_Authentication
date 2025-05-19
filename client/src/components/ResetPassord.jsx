import { useState } from "react";
import axios from "../axios";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  //Get token from url
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/auth/reset-password", { password, token });
      setMessage("Password reset successful! You can now log in.");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
          "Failed to reset password. try again later"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Reset Password
        </h2>
        <form
          onSubmit={handleReset}
          className="w-full flex flex-col items-center"
        >
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            minLength={6}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Resetting" : "Reset Password"}
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center text-sm text-green-600 font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
