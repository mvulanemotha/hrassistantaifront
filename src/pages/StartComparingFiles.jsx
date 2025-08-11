import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../components/Header";

const StartComparingFiles = () => {
  // State for text inputs
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [cvText, setCvText] = useState("");
  const [loading, setLoading] = useState(false);
  const [scoreText, setScoreText] = useState("");
  const [scoreFile, setScoreFile] = useState("");

  // State for file inputs
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  // Handler for form submission (you can expand with API calls)
  const handleCompareText = async () => {
    if (jobDescriptionText === "") {
      toast.warning("Job Description missing...");
      return;
    }

    if (cvText === "") {
      toast.warning("Cv content missing ...");
      return;
    }

    setLoading(true);

    await axios
      .get(`${apiUrl}compare_text_cv_job_description`, {
        params: {
          job_description: jobDescriptionText,
          cv_text: cvText,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(
          "Your Match Score Is: " +
            parseFloat(res.data.score).toFixed(2) * 100 +
            " %",
        );
        setScoreText(
          "Your Match Score Is: " +
            parseFloat(res.data.score).toFixed(2) * 100 +
            " %",
        );
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // Handler for form submission (you can expand with API calls)
  const handleCompareFile = async () => {
    // TODO: Implement API call logic here

    const formData = new FormData();
    formData.append("job_description_file", jobDescriptionFile);
    formData.append("cv_file", cvFile);

    try {
      if (jobDescriptionFile === null) {
        toast.warning(" Advert File is missing...");
        return;
      }

      if (cvFile === null) {
        toast.warning("CV File is missing ...");
        return;
      }

      await axios
        .post(`${apiUrl}compare_cv_advert_documents`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setScoreFile(
            "Your Match Score Is: " +
              parseFloat(res.data.score).toFixed(2) * 100 +
              " %",
          );
          setJobDescriptionFile(null);
          setCvFile(null);
        })
        .catch((err) => {
          console.log(err);
          setJobDescriptionFile(null);
          setCvFile(null);
        });
    } catch (error) {
      console.log(error);
      setJobDescriptionFile(null);
      setCvFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
      {/* Navigation */}
      <Header/>

      {/* Hero Section */}
      <header className="text-center px-6 py-12 lg:py-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl lg:text-6xl font-extrabold mb-6 text-gray-400"
        >
          Compare Your CV with a Job Advert
        </motion.h2>
        <p className="text-lg lg:text-xl max-w-2xl mx-auto mb-8">
          Upload your CV and a job advert to instantly see how well you align —
          all powered by smart AI insights.
        </p>
      </header>

      {/* Upload & Input Section */}
      <section className="px-6 py-12 bg-gray-100">
        <h3 className="text-3xl font-bold text-center mb-8">
          Paste Text or Upload Files
        </h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Text Inputs */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h4 className="text-xl underline font-semibold mb-8 text-blue-600">
              Paste & Compare
            </h4>
            <label className="block mb-2 font-medium">Job Description</label>
            <textarea
              rows="6"
              className="w-full border rounded-xl p-3 mb-6 focus:ring focus:outline-none"
              placeholder="Paste the job description here..."
              value={jobDescriptionText}
              onChange={(e) => setJobDescriptionText(e.target.value)}
            />
            <label className="block mb-2 font-medium">Candidate CV</label>
            <textarea
              rows="6"
              className="w-full border rounded-xl p-3 focus:ring focus:outline-none"
              placeholder="Paste the CV text here..."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
            />
            <button
              className="mt-4 py-2 px-4 bg-green-300 rounded-full"
              onClick={handleCompareText}
            >
              Start Comparing{" "}
            </button>
            <span className="pl-4 text-red-500 font-bold underline">
              {scoreText}
            </span>
            <span>
              
            </span>
          </div>

          {/* File Uploads */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h4 className="text-xl font-semibold underline text-blue-600 mb-8">
              Upload Files & Compare
            </h4>
            <label className="block mb-2 font-medium">Job Advert</label>
            <input
              type="file"
              accept=".pdf,.docx,.txt,.doc"
              className="w-full mb-6 border rounded-xl p-2"
              onChange={(e) => setJobDescriptionFile(e.target.files[0])}
            />
            <label className="block mb-2 font-medium">Your CV</label>
            <input
              type="file"
              accept=".pdf,.docx,.txt,.doc"
              className="w-full border rounded-xl p-2"
              onChange={(e) => setCvFile(e.target.files[0])}
            />
            <button
              onClick={handleCompareFile}
              className="mt-6  bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl font-medium"
            >
              Start Comparing
            </button>
            <span className="pl-4 text-red-500 font-bold underline">
              {scoreFile}
            </span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-16 bg-white text-center">
        <p className="text-3xl font-bold mb-6 text-gray-600">
          Have any questions, contact us{" "}
          <span className="text-blue-600 font-semibold cursor-pointer">
            <Link to="/contact">now! </Link>{" "}
          </span>
        </p>
      </section>

      {/* Footer */}
      <footer className="px-6 py-4 bg-gray-100 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HRAssistant AI. All rights reserved.
      </footer>
    </div>
  );
};

function FeatureCard({ title, description }) {
  return (
    <div className="p-6 rounded-2xl shadow hover:shadow-lg transition bg-gray-50">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p>{description}</p>
    </div>
  );
}

export default StartComparingFiles;
