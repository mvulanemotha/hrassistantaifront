import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../components/Header";

const Notification = () => {
 
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [notifications, setNotifications] = useState([]);

  // function to fetch notifications can be added here
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${apiUrl}cv_progress`, {
        params: { user_id: 2 },
      });

      //localStorage.getItem("user_id")
      console.log(response.data);
      setNotifications(response.data.notifications);
    } catch (error) {
      toast.error("Failed to fetch notifications");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
      {/* Navigation */}
      <Header />
        {/* Main Content Wrapper */}
      <section className="px-6 py-16 bg-gray-50 text-center">
        <h3 className="text-3xl font-bold mb-6">
          Notifications
        </h3>
        <p className="max-w-3xl mx-auto text-lg font-medium text-gray-500">
          You currently have no new notifications.
        </p>
      </section>
    </div>
  );
};

export default Notification;
