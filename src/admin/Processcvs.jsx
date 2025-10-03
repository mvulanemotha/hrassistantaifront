import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Processcvs = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [cvs, setCvs] = useState([]);
  const [downloadingId, setDownloadingId] = useState(null); // track which CV is downloading

  // navigate
  const navigate = useNavigate();

  // get list of cvs
  const getCvs = async () => {
    try {
      const response = await axios.get(`${apiUrl}get_cv_to_process`);
      console.log(response.data);
      setCvs(response.data);
    } catch (error) {
      console.error("Error fetching CVs:", error);
    }
  };

  //upload processed cv

  const upLoadProccessedCv = (user_id , name , file_id) => {
    navigate(`/admin/uploadprocessedcv/${user_id}/${name}/${file_id}`); // Navigate to the upload page with user_id as a parameter
  };

  // download the usercv from the server
  const downloadCv = async (cvId, cvFileName) => {
    try {
      setDownloadingId(cvId);

      const response = await axios.get(
        `${apiUrl}download_user_cv/${cvFileName}`,
        { responseType: "blob" },
      );

      // create a blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", cvFileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log("Error downloading CV:", error);
    } finally {
      setDownloadingId(null);
    }
  };

  // call getCvs on component mount
  useEffect(() => {
    getCvs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <h1 className="font-bold text-xl mb-4">CV List</h1>

      <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-1 py-2">Name</th>
            <th className="border border-gray-300 px-1 py-2">Email</th>
            <th className="border border-gray-300 px-1 py-2">Contact</th>
            <th className="border border-gray-300 px-1 py-2">Template CV</th>
            <th className="border border-gray-300 px-1 py-2">Status</th>
            <th className="border border-gray-300 px-1 py-2">Created Date</th>
            <th className="border border-gray-300 px-1 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {cvs.map((cv) => (
            <tr key={cv.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-1 py-2">
                {cv.user?.name}
              </td>
              <td className="border border-gray-300 px-1 py-2">
                {cv.user?.email}
              </td>
              <td className="border border-gray-300 px-1 py-2">
                {cv.user?.contact}
              </td>
              <td className="border border-gray-300 px-1 py-2">
                {cv.template_cv}
              </td>
                <td className="border border-gray-300 px-1 py-2">
                {cv.status}
              </td>
              <td className="border border-gray-300 px-1 py-2">
                {new Date(cv.created_at).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-1 py-2 text-center">
                <div className="flex justify-center gap-5">
                  <button
                    disabled={downloadingId === cv.id}
                    className={`px-2 py-1 rounded-full ${
                      downloadingId === cv.id
                        ? "cursor-not-allowed opacity-50 bg-red-400"
                        : "bg-green-400"
                    }`}
                    onClick={() => downloadCv(cv.id, cv.user_cv)}
                  >
                    {downloadingId === cv.id ? "Downloading..." : "Download"}
                  </button>

                  <button
                    className="text-blue-500 underline"
                    onClick={() => upLoadProccessedCv(cv.user.id , cv.user.name , cv.id)}
                  >
                    Upload Processed CV
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Processcvs;
