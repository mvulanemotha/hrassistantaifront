import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

      const response = await login({ email, password });
      console.log(response);
      localStorage.setItem(response.user_id);
      // redirect to matches
      if (response.status_code === 200) {
        navigate("/matchhistory");
      }

      if (response.status_code === 400) {
        toast.warning(response.message);
        return;
      }
    } catch (error) {
      toast.error("Server Error Occured");
      return;
    }
  };

  return (
    <div>
      <nav className="flex justify-between items-center px-8 py-4 shadow">
        <h1 className="text-2xl font-bold text-gray-600">
          <a href="/" className="hover:text-blue-600">
            HR Assistant AI
          </a>
        </h1>
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
          <p className="text-center text-gray-500 mb-8">
            Sign in to continue to{" "}
            <span className="font-semibold">HRAssistant AI</span>
          </p>

          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="hr@ia.com"
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
                placeholder="********"
              />
            </div>

            {/* Login Button */}
            <button
              onClick={() => handleLogin()}
              className="w-full bg-blue-600 text-white py-2 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
            >
              Log In
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
