import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import Spinner from "../components/spinner/Spinner";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    try {
      if (email === "" || email === null) {
        toast.warning("Email Required");
        return;
      }

      if (password === "" || password === null) {
        toast.warning("Password Required");
        return;
      }

      setLoading(true);
      const response = await login({ email, password });

      console.log(response);

      setLoading(false);
      localStorage.setItem("user_id", response.user_id);
      localStorage.setItem("user_token", response.access_token);
      localStorage.setItem("name", response.name);
      localStorage.setItem("userType", response.user);

      if (response) {
        console.log("TESTING WE ARE IN");
        getUserCredits();
      }

      // redirect to matches
      if (response.status_code === 200) {
        if (response.user === "HR") {
          navigate("/matchhistory");
        }

        if (response.user === "USER") {
          navigate("/startcomparing");
        }
      }

      if (response.status_code === 400) {
        toast.warning(response.message);
        return;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to login.");
      return;
    }
  };

  // get credits of a user
  const getUserCredits = async () => {
    try {
      await axios
        .get(`${apiUrl}get_credits/${localStorage.getItem("user_id")}`)
        .then((res) => {
          const creditData = res.data;

          const total = creditData.reduce((sum, item) => sum + item.amount, 0);

          console.log(total);
          localStorage.setItem("credits", total);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
      <nav className="flex justify-between items-center px-8 py-4 shadow border-b border-gray-400">
        <div className="text-2xl font-bold border-b text-red-500">HireAI</div>
      </nav>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full"
        >
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Welcome Back
          </h1>
          <div className="text-center text-gray-500 mb-8">
            Sign in to continue with{" "}
            <div className="p-4 text-2xl font-bold border-b text-red-500">
              HireAI
            </div>
          </div>

          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>

            {/* Login Button */}
            <button
              onClick={() => handleLogin()}
              disabled={loading}
              className="text-white w-full bg-blue-600 py-2 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
            >
              {loading ? (
                <span className="flex justify-center items-center gap-2 text-white">
                  Signing In <Spinner width="5" height="5" />
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
