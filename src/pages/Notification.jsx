import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../components/Header";

const Notification = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [notifications, setNotifications] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // NEW: state for fullscreen image
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${apiUrl}cv_progress`, {
        params: { user_id: localStorage.getItem("user_id") },
      });

      console.log(response.data);

      setNotifications(response.data);
    } catch (error) {
      if (error.status === 400) {
        console.log("No notifications found for this user.");
      } else {
        toast.error("Failed to fetch notifications");
      }
    }
  };

  const downloadCompletedCv = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}download_processed_cv/${id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "processed_cv_hireai.pdf"); // fixed filename
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Filter notifications based on status
  const filteredNotifications = notifications.filter((notification) => {
    if (filterStatus === "all") return true;
    return notification.status === filterStatus;
  });

  // Sort notifications based on date
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
        <Header />
        <section className="px-6 py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-1xl font-bold mb-6">View Your Cv Status</h3>

            {notifications.length === 0 ? (
              <p className="max-w-3xl mx-auto text-lg font-medium text-gray-500 text-center py-12">
                You currently have no new notifications.
              </p>
            ) : (
              <>
                {/* Filters and Sorting */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="status-filter"
                      className="text-sm font-medium text-gray-700"
                    >
                      Filter by status:
                    </label>
                    <select
                      id="status-filter"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="sort-order"
                      className="text-sm font-medium text-gray-700"
                    >
                      Sort by:
                    </label>
                    <select
                      id="sort-order"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                  </div>
                </div>

                {/* Notifications Table */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Template
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Submitted At
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {sortedNotifications.map((notification) => (
                          <tr
                            key={notification.id}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-0 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500 shadow-lg hover:cursor-pointer">
                                <img
                                  src={`cv_templates/img/${notification.template_cv}.jpeg`}
                                  className="w-full sm:w-40 md:w-48 lg:w-56 xl:w-64 object-cover rounded-lg cursor-pointer"
                                  alt="Template Preview"
                                  onClick={() =>
                                    setSelectedImage(
                                      `cv_templates/img/${notification.template_cv}.jpeg`,
                                    )
                                  }
                                />
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="flex flex-col items-center justify-center gap-1">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                    notification.status,
                                  )}`}
                                >
                                  {notification.status.charAt(0).toUpperCase() +
                                    notification.status.slice(1)}
                                </span>

                                {notification.status.toLowerCase() ===
                                  "completed" && (
                                  <button
                                    className="mt-2 bg-blue-600 rounded-md px-3 py-1 text-xs text-white"
                                    onClick={() =>
                                      downloadCompletedCv(notification.id)
                                    }
                                  >
                                    Download CV
                                  </button>
                                )}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(notification.created_at)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-500 text-center">
                  Showing {filteredNotifications.length} of{" "}
                  {notifications.length} notifications
                </div>
              </>
            )}
          </div>
        </section>

        {/* Fullscreen Overlay for image */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              className="max-w-full max-h-full object-contain"
              alt="Full Preview"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
