import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../components/Header";

const Referrals = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [referredUsers, setReferredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReferralData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiUrl}referrals/${localStorage.getItem("user_id")}`,
      );

      console.log("Referral Response:", response);

      if (response.data) {
        setReferredUsers(response.data || []);
      } else {
        setReferredUsers([]);
      }
    } catch (err) {
      console.error("Failed to fetch referral data:", err);
      toast.error("Failed to fetch referral data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferralData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
      <Header />
      <section className="px-6 py-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h4 className="text-xl font-semibold mb-4">Referred Users</h4>

            {loading ? (
              <p className="text-gray-500 text-center">Loading...</p>
            ) : referredUsers.length === 0 ? (
              <p className="text-gray-500 text-center">
                You haven't referred any users yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Country
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {referredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {user.name || "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {user.email || "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {user.country || "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {user.contact || "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.created_at
                            ? new Date(user.created_at).toLocaleDateString()
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4 text-sm text-gray-500 text-center">
              Showing {referredUsers.length} of {referredUsers.length} users
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Referrals;
