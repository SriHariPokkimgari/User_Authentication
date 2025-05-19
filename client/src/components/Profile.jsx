import { useEffect, useState } from "react";
import axios from "../axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [data, setData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    //Get token from query string if present
    const param = new URLSearchParams(location.search);
    const tokenFromQuery = param.get("token");
    if (tokenFromQuery) {
      localStorage.setItem("token", tokenFromQuery);
    }

    const token = tokenFromQuery || localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const res = await axios.get("/api/auth/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res?.data?.user);
      } catch (error) {
        console.log(error?.response?.data || error.message);
      }
    };
    if (token) fetchData();
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center w-full max-w-md">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Profile</h2>
        <div className="mb-6 text-lg text-gray-700">
          {`Welcome, ${data?.email || "Guest"}`}
        </div>
        <button
          onClick={handleLogout}
          className="mt-2 px-6 py-2 bg-red-500 text-white rounded font-medium hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
