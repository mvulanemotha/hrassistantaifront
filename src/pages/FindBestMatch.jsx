import { useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineCloudDownload } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import { toast } from "react-toastify";
import { getMatches, saveMatches } from "../services/matchesService";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
import { useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";

export default function FindBestMatch() {
  const [jobDescription, setJobDescription] = useState("");
  const [matchedCandidates, setMatchedCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitles] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;
  const user_id = localStorage.getItem("user_id");

  const navigate = useNavigate() 


  const handleLogout = () => {
  localStorage.removeItem("user_id");
  toast.success("Logged out successfully.");
  navigate("/login");
};

  const handleJobChange = (e) => {
    setSelectedJobTitle(e.target.value);
  };

  //using useeffect to get jobtitles on load
  useEffect(() => {
    getJobTitles();
  }, [user_id]);

  //select job titles
  const getJobTitles = async () => {
    const res = await axios.get(`${apiUrl}user_cvs/`, {
      params: { user_id },
    });

    setJobTitles(Object.keys(res.data));
  };

  // ✅ Fetch matches
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(selectedJobTitle);

    if (selectedJobTitle === "" || selectedJobTitle === "none") {
      toast.warning("Please select a job title.");
      return;
    }

    if (!jobDescription.trim()) {
      toast.warning("Please enter a job description.");
      return;
    }

    setLoading(true);
    setMatchedCandidates([]);

    try {
      const res = await getMatches(jobDescription);

      if (!res.matches || res.matches.length === 0) {
        toast.info("No matches found.");
        setLoading(false);
        return;
      }

      const scores = res.matches.map((m) => m.Score);
      const minScore = Math.min(...scores);
      const maxScore = Math.max(...scores);

      const processed = res.matches.map((m) => {
        const percentage =
          maxScore === minScore
            ? 100
            : ((maxScore - m.Score) / (maxScore - minScore)) * 100;
        return {
          file_name: m.file_name,
          percentage: percentage.toFixed(2),
          score: percentage.toFixed(2), //m.Score, // ✅ keep this for saving to DB
          matched_content: m.Matched_content,
        };
      });

      setMatchedCandidates(processed);
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while finding matches.");
    } finally {
      setLoading(false);
    }
  };

  //save matches
  const saveMatcheFound = async () => {
    if (matchedCandidates.length === 0) {
      toast.warning("No matches to save.");
      return;
    }

    const user_id = localStorage.getItem("user_id"); //user_id
    const res = await saveMatches({
      user_id,
      jobDescription,
      matchedCandidates,
      job_title: selectedJobTitle,
    });
    console.log(res);

    if (res) {
      toast.success("Matches saved successfully.");
    }
  };

  // ✅ Download to Excel
  const handleDownload = () => {
    if (matchedCandidates.length === 0) {
      toast.warning("No matches to download!");
      return;
    }

    // Create a worksheet from JSON
    const worksheet = XLSX.utils.json_to_sheet(
      matchedCandidates.map((c) => ({
        "File Name": c.file_name,
        "Match Score (%)": c.percentage,
      })),
    );

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Matches");

    // Generate a buffer and save using FileSaver
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "matched_candidates.xlsx");

    // ✅ Show success toast
    toast.success("Matches downloaded successfully, view your file in the download folder.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800 flex flex-col">
      {/* ✅ Header */}
      <nav className="flex justify-between items-center px-8 py-4 shadow">
        <h1 className="text-2xl font-bold text-blue-600">HRAssistant AI</h1>
        <div className="space-x-4">
          <Link to="/uploadcvs" className="hover:text-blue-600">
            Upload CVs
          </Link>
          <Link to="/matchhistory" className="hover:text-blue-600">
            Matches
          </Link>
          <span className="text-red-600 font-bold hover:text-red-700 cursor-pointer" onClick={handleLogout}>
            Log Out
          </span>
        </div>
      </nav>

      {/* ✅ Hero Section */}
      <section className="text-center px-6 py-10 lg:py-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl lg:text-5xl font-extrabold mb-6"
        >
          Find the Best Match for Your Job
        </motion.h2>
        <p className="text-lg max-w-3xl mx-auto mb-4">
          Paste your job description on the left, and see matched candidates on
          the right.
        </p>
      </section>

      {/* ✅ Two-column main content */}
      <main className="flex flex-col md:flex-row flex-1 px-6 py-6 gap-6 max-w-7xl mx-auto w-full">
        {/* Left column */}

        <div className="md:w-1/2 bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <div className="p-1 mb-3">
            <label className="block font-medium mb-2 text-blue-600 text-xl rounded-lg">
              Select Job Title:
            </label>
            <select
              value={selectedJobTitle}
              onChange={handleJobChange}
              className=" border-gray-300 border rounded-lg px-3 py-2 w-full"
            >
              <option value="none">-- Select --</option>
              {jobTitle.map((job, index) => (
                <option key={index} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>

          <h5 className="text-xl mb-4 text-blue-600">Job Description</h5>
          <form onSubmit={handleSubmit} className="flex flex-col flex-1">
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={10}
              className="w-full flex-1 rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 mb-4"
              placeholder="Paste the job description here..."
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Finding matches..." : "Find Matches"}
            </button>
          </form>
        </div>

        {/* Right column */}
        <div className="md:w-1/2 bg-gray-50 rounded-2xl shadow-inner p-6 flex flex-col">
          <h5 className="text-xl mb-4 text-blue-600">Matched Applications</h5>
          <div
            className="flex-1 overflow-y-auto space-y-4"
            style={{ maxHeight: "400px" }}
          >
            {loading && (
              <p className="text-gray-500">Searching for matches...</p>
            )}
            {!loading && matchedCandidates.length === 0 && (
              <p className="text-gray-500">No matches yet.</p>
            )}
            {!loading &&
              matchedCandidates.length > 0 &&
              matchedCandidates.map((candidate, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white shadow hover:shadow-md transition"
                >
                  <span className="font-bold">{index + 1}.</span>
                  <h4 className="text-lg font-semibold mb-1">
                    {candidate.file_name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Match Score:{" "}
                    <span className="font-bold text-green-600">
                      {candidate.percentage}%
                    </span>
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${candidate.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-3 pl-1 flex gap-3">
            <button
              onClick={saveMatcheFound}
              className="bg-green-500 rounded-lg px-4 py-2 text-white flex items-center gap-2 hover:bg-green-600"
            >
              Save Matches <CiSaveDown2 className="text-xl" />
            </button>
            <button
              onClick={handleDownload}
              className="bg-green-500 rounded-lg px-4 py-2 text-white flex items-center gap-2 hover:bg-green-600"
            >
              Download File
              <MdOutlineCloudDownload className="text-xl" />
            </button>
          </div>
        </div>
      </main>

      {/* ✅ Footer */}
      <footer className="px-6 py-4 bg-gray-100 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HRAssistant AI. All rights reserved.
      </footer>
    </div>
  );
}
