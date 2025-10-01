import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect , useState } from "react";


const HomeAdmin = () => {

  const navigate = useNavigate();
  const [pendingCvs, setPendingCvs] = useState(0);

  //get number of pending cvs from the backend
  const apiUrl = import.meta.env.VITE_API_URL;

  const getPendingCvs = async () => {
    try {
      const response = await axios.get(`${apiUrl}cv_to_process_count`);

      console.log("Pending CVs count:", response.data["pending_count"]);

      setPendingCvs(response.data["pending_count"]);

    } catch (error) {
      console.error("Error fetching pending CVs:", error);
    }
  };

  useEffect(() => {
    getPendingCvs();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <main className="p-6">
          {/* Your admin content here */}
          <h1 className="text-1xl underline">Dashboard</h1>
          <div className="flex mt-6">
            <div className=" flex flex-col items-center cursor-pointer">
              <button className="bg-green-300 text-red-600 text-2xl font-bold p-2 rounded-full w-14 h-14" onClick={ () => navigate("/admin/processcvs") }>
                {pendingCvs || 0}
              </button>
              <span className="font-bold mt-2">Pending CVs</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeAdmin;
