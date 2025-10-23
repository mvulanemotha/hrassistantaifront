import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Header from "../components/Header";

export default function UploadCvs() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [jobTitle, setJobTitle] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;
  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      toast.warning("Please select at least one CV.");
      return;
    }

    const user_id = localStorage.getItem("user_id");

    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("job_title", jobTitle);
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(`${apiUrl}upload_cv_embed`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("CV(s) uploaded successfully!");
        setSelectedFiles([]);
      } else {
        toast.warning("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while uploading.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
      {/* ✅ Header (same as landing page) */}
      <Header />

      {/* ✅ Hero Section */}
      <section className="text-center px-6 py-16 lg:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl lg:text-5xl font-extrabold mb-6 text-gray-400"
        >
          Upload Your CVs with Ease
        </motion.h2>
        <p className="text-lg max-w-2xl mx-auto mb-4">
          <span className="text-red-400 font-bold">Hire</span>AI streamlines recruitment by letting you upload multiple CVs at
          once.
        </p>
      </section>

      {/* ✅ Upload Form Section */}
      <section className="px-6 py-8 mb-16 bg-gray-50">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Upload CVs
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-blue-600">
                Job Title
              </label>
              <input
                type="text"
                onChange={(e) => setJobTitle(e.target.value)}
                value={jobTitle}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Data Scientist"
              />
            </div>

            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />

            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium">Selected Files:</h4>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
            >
              Upload Now
            </button>
          </form>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="px-6 py-6 bg-gray-100 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HRAssistant AI. All rights reserved.
      </footer>
    </div>
  );
}
