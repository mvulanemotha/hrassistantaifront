import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../components/Header";
import chargeServise from "../services/chargeService";

const StartComparingFiles = () => {
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [cvText, setCvText] = useState("");
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [scoreText, setScoreText] = useState(null);
  const [scoreFile, setScoreFile] = useState(null);
  const [selectedButton, setSelectedButton] = useState("usefile");
  const [explanationError, setExplanationError] = useState(null);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  // ---------------------------
  // Text Comparison
  // ---------------------------
  const handleCompareText = async () => {
    if (!jobDescriptionText.trim()) {
      toast.warning("Job Description missing...");
      return;
    }
    if (!cvText.trim()) {
      toast.warning("CV content missing...");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}compare_text_cv_job_description`, {
        params: {
          job_description: jobDescriptionText,
          cv_text: cvText,
          user_id: localStorage.getItem("user_id"),
          required_units: chargeServise("compare_text"),
        },
      });

      const score = parseFloat(res.data.score) * 100;
      setScoreText(score.toFixed(2));
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to compare texts.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // File Comparison
  // ---------------------------
  const handleCompareFile = async () => {
    if (!jobDescriptionFile) {
      toast.warning("Job Advert File is missing...");
      return;
    }
    if (!cvFile) {
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
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      const score = parseFloat(res.data.score) * 100;
      setScoreFile(score.toFixed(2));
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to compare files.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // Explanation for low score (files)
  // ---------------------------
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
    } catch (err) {
      setExplanationError(
        err.response?.data?.error || "Failed to fetch explanation.",
      );
      console.log(err);
    } finally {
      setLoadingExplanation(false);
    }
  };

  // ---------------------------
  // Explanation for low score (text)
  // ---------------------------
  const handleGetTextExplanation = async () => {
    if (!jobDescriptionText || !cvText) {
      toast.warning("Please enter both text fields first.");
      return;
    }

    setLoadingExplanation(true);
    setExplanationError(null);

    try {
      const { data } = await axios.post(`${apiUrl}explain_low_score_in_text`, {
        job_description: jobDescriptionText,
        cv_text: cvText,
        user_id: localStorage.getItem("user_id"),
        required_units: Number(chargeServise("get_text_reasoning")),
      });

      localStorage.setItem("lowscoreexplanation", data.explanation);
      navigate("/lowscoreresult");
    } catch (err) {
      setExplanationError(
        err.response?.data?.error || "Failed to fetch explanation.",
      );
      console.log(err);
    } finally {
      setLoadingExplanation(false);
    }
  };

  // ---------------------------
  // Type of score description
  // ---------------------------
  const type_of_score = (score) => {
    if (!score) return <span></span>;
    const s = parseFloat(score);

    if (s < 40)
      return (
        <span className="text-red-600 font-semibold">
          Your CV doesn’t closely match this job. Tailor your experience to
          align with requirements.
        </span>
      );
    else if (s < 60)
      return (
        <span className="text-orange-500 font-semibold">
          Partial match. Adding more relevant skills or experience could improve
          your fit.
        </span>
      );
    else if (s < 75)
      return (
        <span className="text-yellow-600 font-semibold">
          Good alignment. Few tweaks could make your CV stronger.
        </span>
      );
    else if (s < 90)
      return (
        <span className="text-green-500 font-semibold">
          Strong match. You’re well-suited for this position.
        </span>
      );
    else
      return (
        <span className="text-blue-600 font-semibold">
          Excellent match! Your CV is highly aligned with this job.
        </span>
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
      <Header />

      {/* Hero Section */}
      <div className="text-center p-8 bg-gray-50 rounded-lg gap-8">
        <p className="text-sm font-mono lg:text-xl max-w-2xl mx-auto mb-8">
          <span className="text-red-400 font-bold">Hire</span>
          <span className="font-bond">AI</span> doesn’t just compare. It helps
          the user align their CV to mirror the language of the job advert.
        </p>
      </div>

      {/* Upload & Input Section */}
      <section className="px-6 py-2 bg-gray-50">
        <h3 className="text-3xl font-bold text-center mb-2">
          {selectedButton === "usetext" ? (
            <span className="text-sm font-bold mb-8 text-gray-700">
              Paste & Compare
            </span>
          ) : (
            <span className="text-xl font-bold mb-8 text-gray-500">
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
                rows="4"
                className="w-full border rounded-xl p-3 mb-6 focus:ring focus:outline-none"
                placeholder="Paste the job description here..."
                value={jobDescriptionText}
                onChange={(e) => setJobDescriptionText(e.target.value)}
              />

              <label className="block mb-2 font-medium">
                Candidate CV Text
              </label>
              <textarea
                rows="4"
                className="w-full border rounded-xl p-3 focus:ring focus:outline-none"
                placeholder="Paste the CV text here..."
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
              />

              <button
                className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                onClick={handleCompareText}
                disabled={loading}
              >
                {loading ? "Comparing ..." : "Start Comparing"}
              </button>

              {scoreText && (
                <div className="mt-2">
                  <span className="text-red-500 font-bold underline">
                    {scoreText}%
                  </span>
                  <div>{type_of_score(scoreText)}</div>
                  <button
                    onClick={handleGetTextExplanation}
                    disabled={loadingExplanation}
                    className="mt-2 bg-blue-300 hover:bg-yellow-600 py-1 px-6 rounded-lg"
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
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <div>
                <label className="block mb-2 text-green-700 font-semibold">
                  Job Advert
                </label>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt,.doc"
                  onChange={(e) => setJobDescriptionFile(e.target.files[0])}
                  className="w-full border border-gray-300 rounded-xl p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-green-700 font-semibold">
                  Your CV
                </label>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt,.doc"
                  onChange={(e) => setCvFile(e.target.files[0])}
                  className="w-full border border-gray-300 rounded-xl p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleCompareFile}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl font-medium"
                disabled={loading}
              >
                {loading ? "Comparing your files..." : "Start Comparing"}
              </button>

              {scoreFile && (
                <div className="mt-2">
                  <span className="text-red-500 font-bold">{scoreFile}%</span>
                  <div>{type_of_score(scoreFile)}</div>

                  {scoreFile < 70 && (
                    <button
                      onClick={handleGetExplanation}
                      disabled={loadingExplanation}
                      className="mt-2 bg-green-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-xl"
                    >
                      {loadingExplanation
                        ? "Loading explanation..."
                        : "View Explanation"}
                    </button>
                  )}

                  {explanationError && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded text-red-800">
                      Error: {explanationError}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default StartComparingFiles;
