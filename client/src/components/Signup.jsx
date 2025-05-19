import axios from "../axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/signup", formData);
      setMessage("Singnup successful! now you can login");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setMessage(
        error?.response?.data?.error?.message ||
          error?.response?.data?.error ||
          "Signup failed."
      );
    } finally {
      setFormData({ email: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-2xl font-medium mb-4 text-gray-800">Signup</h2>

        <form onSubmit={handleSignup}>
          <input
            placeholder="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:cursor-pointer hover:bg-blue-700 transition"
          >
            SignUp
          </button>
        </form>
        {message && message === "Singnup successful! now you can login" ? (
          <div className="mt-4 text-center text-sm text-green-600 font-medium">
            {message}
          </div>
        ) : (
          <div className="mt-4 text-center text-sm text-red-600 font-medium">
            {message}
          </div>
        )}
        <div className="flex justify-between w-full mt-4 text-sm">
          <a href="/" className="text-blue-600 hover:underline">
            Already have a account
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
