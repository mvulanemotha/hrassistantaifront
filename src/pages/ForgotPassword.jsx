import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/spinner/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  // send OTP
  const handleSendOtp = async () => {
    if (!email) return toast.info("Please enter your email");
    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}forgotpass/${email}`);
      setLoading(false);
      console.log(res);

      if (res.status === 200) {
        toast.success("OTP sent to your email");
        setOtpSent(true);
        setUserId(res.data.user_id); // Store userId for later use
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (err) {
      setLoading(false);
      console.log(err.status);
      if (err.status === 400) toast.info("Email not registered");
      else if (err.status === 500)
        toast.error("Server error. Please try again later.");
    }
  };

  // reset password
  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      toast.warning("Enter OTP and new password");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}reset_password`, {
        user_id: userId,
        otp: otp,
        password: newPassword,
      });
      setLoading(false);
      console.log(res);
      if (res.status === 200) {
        // Optionally redirect to login page
        
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        toast.success("Password reset successful. You can now login.");
        //setOtpSent(false);
        setOtp("");
        setNewPassword("");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to reset password");
      }
    } catch (err) {
      setLoading(false);
      console.log(err.status);
      toast.warning(err.response.data || "Error resetting password");
    }
  };

  return (
    <div>
      <nav className="flex justify-between items-center px-8 py-4 shadow border-b border-gray-400">
        <div className="text-2xl font-bold border-b text-red-500">HireAI</div>
      </nav>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full"
        >
          <h1 className="text-2xl text-center text-blue-600 mb-6">
            Forgot Password
          </h1>

          {!otpSent ? (
            <div className="space-y-6">
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="text-white w-full bg-blue-600 py-2 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
              >
                {loading ? <Spinner width="5" height="5" /> : "Send OTP"}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block mb-1 font-medium">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="4-digit code"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                />
              </div>
              <button
                onClick={handleResetPassword}
                disabled={loading}
                className="text-white w-full bg-blue-600 py-2 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
              >
                {loading ? <Spinner width="5" height="5" /> : "Reset Password"}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
