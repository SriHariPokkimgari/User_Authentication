import { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    // if (!formData.email || !formData.password) {
    //   return null;
    // }

    setIsLoading(true);

    try {
      const res = await axios.post("/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (error) {
      setMessage(error?.response?.data?.error || "login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-2xl font-medium mb-2 text-gray-800">Login</h2>

        <a
          href="https://user-authentication-xjk8.onrender.com/api/auth/google"
          className="w-full  bg-white border border-gray-300 text-gray-700 py-2 my-4 rounded font-medium flex items-center justify-center  hover:bg-gray-50"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </a>

        <h2 className="text-xl font-light ">or</h2>
        <form onSubmit={handleLogin}>
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
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 hover:cursor-pointer transition"
          >
            {isLoading ? "Login..." : "Login"}
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm text-red-600 font-medium">
            {message}
          </div>
        )}
        <div className="flex justify-between w-full mt-4 text-sm">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Forget password?
          </a>
          <a href="/signup" className="text-blue-600 hover:underline">
            Create account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
