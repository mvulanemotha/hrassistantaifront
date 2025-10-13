import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";

const templates = Array.from({ length: 16 }, (_, i) => ({
  name: (i + 1).toString(),
}));

const GenerateCv = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [cvName, setCvName] = useState("");
  const [generatedDocxUrl, setGeneratedDocxUrl] = useState(null);
  const [loading, setIsloading] = useState(false);
  

  const itemsPerPage = 3;
  const totalPages = Math.ceil(templates.length / itemsPerPage);
  const paginatedTemplates = templates.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage,
  );

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.info("Please select a file first.");
      return;
    }
    if (!cvName) {
      setUploadStatus("Please select a CV template.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("user_cv", selectedFile);
      formData.append("template_file", cvName);
      formData.append("user_id", localStorage.getItem("user_id"));

      setIsloading(true);
      const res = await fetch(`${apiUrl}save_cv_to_process`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      setIsloading(false);
      const data = await res.json();
      if (data.status_code === 201) toast.success("CV uploaded successfully!");
    } catch (err) {
      setIsloading(false);
      toast.warning("Upload failed ❌");
    }
  };

  useEffect(() => {
    return () => {
      if (generatedDocxUrl) window.URL.revokeObjectURL(generatedDocxUrl);
    };
  }, [generatedDocxUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800 flex flex-col">
      <Header />
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <div className="text-center mb-8 text-green-600 font-bold text-lg">
          Select a cv template that can be used to generate your new cv
        </div>

        <div className="mb-4 text-gray-600 italic sm:text-center text-center">
          Select the template by clicking the cv image.
        </div>

        {/* Template Gallery */}
        <div className="flex sm:grid sm:grid-cols-3 sm:gap-6 overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
          {paginatedTemplates.map((tpl) => {
            const imagePath = `cv_templates/img/${tpl.name}.jpeg`;
            const isSelected = selectedImage === imagePath;

            return (
              <div
                key={tpl.name}
                className={`
          cursor-pointer border rounded-lg overflow-hidden hover:shadow-lg transition
          flex-shrink-0 
          w-full sm:w-64 snap-center border-b border-gray-800
          ${isSelected ? "border-blue-500 shadow-lg" : "border-gray-300"}
        `}
                onClick={() => {
                  setSelectedImage(imagePath);
                  setCvName(tpl.name);
                }}
              >
                <img
                  src={imagePath}
                  alt={tpl.name}
                  className="w-full h-120 object-contain bg-gray-50"
                />
              </div>
            );
          })}
        </div>
        {/* Pagination */}
        <div className="sm:items-center mb-4 gap-2 mt-4">
          {/* Buttons container */}
          <div className="flex  sm:flex-row gap-2 sm:w-full">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
              className="w-32 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 text-center"
            >
              ◀ Previous
            </button>

            <button
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={page === totalPages - 1}
              className="w-32 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 text-center"
            >
              Next ▶
            </button>
          </div>

          {/* Page indicator */}
          <div className="mt-2">
            <span className="text-gray-700 sm:text-left mt-8 sm:mt-0 underline">
              page {page + 1} of {totalPages}
            </span>
          </div>
        </div>

        {/* Selected Template */}
        {cvName && (
          <div className="mt-4 text-center font-mono text-sm sm:text-base">
            You have selected{" "}
            <span className="underline font-bold">{cvName}</span>
          </div>
        )}

        {/* Upload Section */}
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-sm font-bold mb-4 text-gray-600 sm:text-center text-center">
            Please upload your existing CV to be processed
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center w-full">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="border p-2 rounded w-full sm:w-72 text-sm bg-gray-300"
            />
            <button
              onClick={handleUpload}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {loading ? "Uploading ...." : "Send for processing"}
            </button>
          </div>
          {uploadStatus && (
            <p className="mt-4 font-semibold sm:text-center text-sm text-gray-600">
              {uploadStatus}
            </p>
          )}
        </div>

        {/* Template Preview Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
            <div className="relative max-w-full sm:max-w-4xl w-full">
              <button
                className="absolute top-4 right-4 text-red-500 bg-red-200 p-2 border rounded text-3xl font-bold focus:outline-none"
                onClick={() => setSelectedImage(null)}
                aria-label="Close preview"
              >
                &times;
              </button>
              <img
                src={selectedImage}
                alt="Template Preview"
                className="w-full max-h-[90vh] object-contain rounded"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateCv;
