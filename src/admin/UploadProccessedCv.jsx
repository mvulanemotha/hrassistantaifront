import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const UploadProccessedCv = () => {
  const { user_id, user_name , file_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  // Connect the file input to state
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    if (!file) {
      toast.warning("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", user_id);
    formData.append("file_id", file_id);

    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}save_processed_cv`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("File uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Customer Name: <span className="font-bold">{user_name}</span>
          </label>
        </div>

        <div className="shadow-sm border border-gray-300 bg-gray-200 rounded-md p-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Processed CV:
          </label>
          <input
            type="file"
            className="mt-1 block w-full "
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {loading ? "Uploading..." : "Upload CV"}
        </button>
      </form>
    </div>
  );
};

export default UploadProccessedCv;
