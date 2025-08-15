import { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { toast } from "react-toastify";

const Settings = () => {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSave = async () => {
    if (!password.trim() || !email.trim() || !confirmPassword.trim()) {
      toast.info("Please fill out all fields ...");
      return;
    }

    if (confirmPassword !== password) {
      toast.info("Password mismatch");
      return;
    }

    try {
      setLoading(true);
      const user_id = localStorage.getItem("user_id");
      await axios
        .put(`${apiUrl}changepass/${user_id}`, {
          password,
        })
        .then((res) => {
          toast.success("Password updated successfully");
          setConfirmPass("");
          setPassword("");
        });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 w-full max-w-xl mx-auto mt-10">
        <h2 className="text-lg font-bold mb-6 text-center text-blue-700 border-b">
          ACCOUNT SETTINGS
        </h2>
        <div className="p-4">
          <span className="text-gray-600 font-bold">Change Password</span>
        </div>
        <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              disabled={true}
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPass(e.target.value)}
              type="password"
              placeholder="confirm passsword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-500 px-6 py-2 rounded-full text-white font-bold"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
