import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../components/Header";
import chargeServise from "../services/chargeService";

const StartComparingFiles = () => {
  // State for text inputs
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [cvText, setCvText] = useState("");
  const [loading, setLoading] = useState(false);
  const [scoreText, setScoreText] = useState("");
  const [scoreFile, setScoreFile] = useState("");
  const [selectedButton, setSelectedButton] = useState("usetext");

  // State for file inputs
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);

  // State for explanation button
  
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [explanationError, setExplanationError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  // Handler for text comparison
  const handleCompareText = async () => {
    if (jobDescriptionText === "") {
      toast.warning("Job Description missing...");
      return;
    }

    if (cvText === "") {
      toast.warning("CV content missing...");
      return;
    }

    setLoading(true);
  
    console.log(localStorage.getItem("user_id"))

    try {
      const res = await axios.get(`${apiUrl}compare_text_cv_job_description`, {
        params: {
          job_description: jobDescriptionText,
          cv_text: cvText,
          user_id: localStorage.getItem("user_id"),
          required_units: chargeServise("compare_text"),
        },
      });

      setScoreText((parseFloat(res.data.score).toFixed(2) * 100).toFixed(2));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Handler for file comparison
  const handleCompareFile = async () => {
    if (jobDescriptionFile === null) {
      toast.warning("Advert File is missing...");
      return;
    }

    if (cvFile === null) {
      toast.warning("CV File is missing...");
      return;
    }

    setLoading(true);
    setExplanationError(null);

    const formData = new FormData();
    formData.append("job_description_file", jobDescriptionFile);
    formData.append("cv_file", cvFile);
    formData.append("required_units", chargeServise("compare_files"));
    formData.append("user_id", localStorage.getItem("user_id"));

    try {
      const res = await axios.post(
        `${apiUrl}compare_cv_advert_documents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setScoreFile((parseFloat(res.data.score).toFixed(2) * 100).toFixed(2));
    } catch (err) {
      console.log(err);
      toast.error("Failed to compare files.");
    } finally {
      setLoading(false);
    }
  };

  // Handler to get explanation for low score
  const handleGetExplanation = async () => {
    if (!jobDescriptionFile || !cvFile) {
      toast.warning("Please upload both files first.");
      return;
    }

    setLoadingExplanation(true);
    setExplanationError(null);
    
    const formData = new FormData();
    formData.append("job_description_file", jobDescriptionFile);
    formData.append("cv_file", cvFile);
    formData.append("required_units", chargeServise("get_file_reasoning"));
    formData.append("user_id", localStorage.getItem("user_id"));

    try {
      const res = await axios.post(`${apiUrl}low_score_explanation`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      localStorage.setItem("lowscoreexplanation", res.data.explanation);
      navigate("/lowscoreresult");
    } catch (error) {
      console.log(error)
      setLoadingExplanation(false)
    } finally {
      setLoadingExplanation(false);
    }
  };

  // get explanation for job descrption and cv text
  const getExplanation_for_low_score = async () => {
    try {
      setLoadingExplanation(true);
      setExplanationError(null);
      
      console.log(localStorage.getItem("user_id"))

      await axios
        .post(`${apiUrl}explain_low_score_in_text`, {
          job_description: jobDescriptionText,
          cv_text: cvText,
          user_id: localStorage.getItem("user_id"),
          required_units: Number(chargeServise("get_text_reasoning")),
        })
        .then((data) => {
          localStorage.setItem("lowscoreexplanation", data.data.explanation);
          navigate("/lowscoreresult");
        })
        .catch((err) => {
          setExplanationError(
            err.response?.data?.error || "Failed to fetch explanation.",
          );
        });
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingExplanation(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}

      {/*  section to have clickable button */}
      <div className="text-center p-8 bg-gray-100 rounded-lg gap-8">
        <p className="text-lg lg:text-xl max-w-2xl mx-auto mb-4">
        </p>
        <span>
          {" "}
          <button
            onClick={() => {
              setSelectedButton("usetext");
            }}
            className={` text-gray-800 cursor-pointer bg-green-200 p-1 px-8 py-2 rounded-full ${selectedButton === "usetext" ? "border-2 border-red-500" : ""}`}
          >
            Use Text
          </button>
        </span>
        <span>
          {" "}
          <button
            onClick={() => {
              setSelectedButton("usefile");
            }}
            className={`cursor-pointer bg-green-200 p-1 px-8 py-2 text-gray-800 rounded-full ${selectedButton === "usefile" ? "border-2 border-red-500" : ""}`}
          >
            Use Files{" "}
          </button>{" "}
        </span>
      </div>

      {/* Upload & Input Section */}
      <section className="px-6 py-2 bg-gray-100">
        <h3 className="text-3xl font-bold text-center mb-2">
          {selectedButton === "usetext" && (
            <span className=" text-2xl font-bold mb-8 text-gray-700">
              Paste & Compare
            </span>
          )}

          {selectedButton === "usefile" && (
            <span className=" text-2xl font-bold mb-8 text-gray-700">
              Upload Files & Compare
            </span>
          )}
        </h3>
        <div className="max-w-5xl mx-auto">
          {/* Text Inputs */}
          {selectedButton === "usetext" && (
            <div className="bg-white rounded-2xl shadow p-6">
              <label className="block mb-2 font-medium">
                Job Description Text
              </label>
              <textarea
                rows="3"
                className="w-full border rounded-xl p-3 mb-6 focus:ring focus:outline-none"
                placeholder="Paste the job description here..."
                value={jobDescriptionText}
                onChange={(e) => setJobDescriptionText(e.target.value)}
              />
              <label className="block mb-2 font-medium">
                Candidate CV Text
              </label>
              <textarea
                rows="3"
                className="w-full border rounded-xl p-3 focus:ring focus:outline-none"
                placeholder="Paste the CV text here..."
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
              />
              <button
                className="mt-4 py-2 px-4 bg-green-300 rounded-full"
                onClick={handleCompareText}
                disabled={loading}
              >
                { loading ? "Comparing ..." : "Start Comparing" }
              </button>
              <span className="pl-4 text-red-500 font-bold underline">
                {scoreText}
              </span>

              {/* want to display a button when there is a score  */}

              {scoreText && (
                <div>
                  <button
                    onClick={getExplanation_for_low_score}
                    disabled={loadingExplanation}
                    className="ml-1 mt-4 bg-blue-300 hover:bg-yellow-600  py-1 px-6 rounded-lg"
                  >
                    {loadingExplanation
                      ? "Loading explanation..."
                      : "Explain Score"}
                  </button>
                </div>
              )}
            </div>
          )}
          {/* File Uploads */}
          {selectedButton === "usefile" && (
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">
                    Job Advert
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt,.doc"
                    onChange={(e) => setJobDescriptionFile(e.target.files[0])}
                    className="w-full border border-gray-300 rounded-xl p-3 
                 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 transition duration-200 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">
                    Your CV
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt,.doc"
                    onChange={(e) => setCvFile(e.target.files[0])}
                    className="w-full border border-gray-300 rounded-xl p-3 
                 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 transition duration-200 shadow-sm"
                  />
                </div>
              </div>

              <button
                onClick={handleCompareFile}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl font-medium"
                disabled={loading}
              >
                
                { loading ? "Comparing your files ... " : "Start Comparing" }
              </button>
              <span className="pl-4 text-red-500 font-bold underline">
                {scoreFile}
              </span>

              {/* Show button if scoreFile exists and score < 70 */}
              {scoreFile &&
                parseFloat(scoreFile.match(/(\d+(\.\d+)?)/)?.[0]) < 70 && (
                  <button
                    onClick={handleGetExplanation}
                    disabled={loadingExplanation}
                    className="ml-4 mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                  >
                    {loadingExplanation
                      ? "Loading explanation..."
                      : "Why is my score low?"}
                  </button>
                )}
              {/* Show explanation error */}
              {explanationError && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded text-red-800">
                  Error: {explanationError}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-4 bg-gray-100 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HRAssistant AI. All rights reserved.
      </footer>
    </div>
  );
};

export default StartComparingFiles;
