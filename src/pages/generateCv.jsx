import { useState, useEffect } from "react";
import chargeServise from "../services/chargeService";

const templates = [
  { name: "ATS basic HR resume" },
  { name: "ATS classic HR resume" },
  { name: "Attorney resume" },
  { name: "Basic sales resume" },
];

const GenerateCv = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [cvName, setCvName] = useState("");
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState(null);
  const [generatedDocxUrl, setGeneratedDocxUrl] = useState(null);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(templates.length / itemsPerPage);

  const paginatedTemplates = templates.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage,
  );

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file first.");
      return;
    }
    if (!cvName) {
      setUploadStatus("Please select a CV template.");
      return;
    }

    try {
      const templatePath = `cv_templates/word/${cvName}.docx`;
      const templateResponse = await fetch(templatePath);

      if (!templateResponse.ok) {
        setUploadStatus("Failed to load template word.");
        return;
      }
      const docxBlob = await templateResponse.blob();

      const templateFile = new File([docxBlob], `${cvName}.docx`, {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const formData = new FormData();
      formData.append("user_cv", selectedFile);
      formData.append("template_file", templateFile);
      formData.append("required_units", chargeServise("generate_cv"));
      formData.append("user_id", localStorage.getItem("user_id"))

      const res = await fetch(`${apiUrl}generate_cv`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      // Backend returns JSON with base64 encoded 'pdf' and 'docx'
      const data = await res.json();

      // Convert base64 PDF to Blob URL
      const pdfBlob = new Blob(
        [Uint8Array.from(atob(data.pdf), (c) => c.charCodeAt(0))],
        { type: "application/pdf" },
      );
      const pdfUrl = window.URL.createObjectURL(pdfBlob);

      // Convert base64 DOCX to Blob URL
      const docxBlob2 = new Blob(
        [Uint8Array.from(atob(data.docx), (c) => c.charCodeAt(0))],
        {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
      );
      const docxUrl = window.URL.createObjectURL(docxBlob2);

      // Set URLs for preview and download
      setGeneratedPdfUrl(pdfUrl);
      setGeneratedDocxUrl(docxUrl);

      setUploadStatus("Upload successful! ✅");
    } catch (err) {
      console.error(err);
      setUploadStatus("Upload failed ❌");
    }
  };

  // Clean up blob URLs on unmount or update to avoid memory leaks
  useEffect(() => {
    return () => {
      if (generatedPdfUrl) {
        window.URL.revokeObjectURL(generatedPdfUrl);
      }
      if (generatedDocxUrl) {
        window.URL.revokeObjectURL(generatedDocxUrl);
      }
    };
  }, [generatedPdfUrl, generatedDocxUrl]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Select a CV Template
      </h2>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          ◀ Previous
        </button>

        <span className="text-gray-700">
          Page {page + 1} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page === totalPages - 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next ▶
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {paginatedTemplates.map((tpl) => {
          const imagePath = `cv_templates/img/${tpl.name}.png`;
          const isSelected = selectedImage === imagePath;

          return (
            <div
              key={tpl.name}
              className={`cursor-pointer border rounded-lg overflow-hidden hover:shadow-lg transition ${
                isSelected ? "border-blue-500 shadow-lg" : "border-gray-300"
              }`}
              onClick={() => {
                setSelectedImage(imagePath);
                setCvName(tpl.name);
              }}
            >
              <img
                src={imagePath}
                alt={tpl.name}
                className="w-full h-64 object-contain bg-gray-50"
              />
              <div className="p-4 text-center text-xs">{tpl.name}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 font-mono">
        {cvName && (
          <span className="text-xs">
            You have selected this{" "}
            <span className="underline font-bold">{cvName}</span>
          </span>
        )}
      </div>

      {/* Upload Section */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Upload Your CV
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="border p-2 rounded w-full sm:w-auto"
          />
          <button
            onClick={handleUpload}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Upload
          </button>
        </div>
        {uploadStatus && (
          <p className="mt-3 text-center text-sm text-gray-600">
            {uploadStatus}
          </p>
        )}

        {/* PDF Preview & Download */}
        {generatedPdfUrl && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-center">
              Generated CV PDF Preview
            </h3>
            <iframe
              src={generatedPdfUrl}
              title="Generated CV PDF Preview"
              width="100%"
              height="600px"
              className="border"
            />
            <div className="text-center mt-2">
              <a
                href={generatedPdfUrl}
                download={`${cvName}_generated_cv.pdf`}
                className="inline-block mt-2 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
              >
                Download PDF
              </a>
            </div>
          </div>
        )}

        {/* DOCX Download (no preview) */}
        {generatedDocxUrl && (
          <div className="mt-2 text-center">
            <a
              href={generatedDocxUrl}
              download={`${cvName}_generated_cv.docx`}
              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              Download DOCX
            </a>
          </div>
        )}
      </div>

      {/* Template Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none"
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
  );
};

export default GenerateCv;
