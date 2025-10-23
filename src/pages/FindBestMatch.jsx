import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdOutlineCloudDownload } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import { toast } from "react-toastify";
import { getMatches, saveMatches } from "../services/matchesService";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
import Header from "../components/Header";

export default function FindBestMatch() {
  const [jobDescription, setJobDescription] = useState("");
  const [matchedCandidates, setMatchedCandidates] = useState([]); // ✅ stored in backend format
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitles] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [summary, setSummary] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;
  const user_id = localStorage.getItem("user_id");

  const handleJobChange = (e) => setSelectedJobTitle(e.target.value);

  useEffect(() => {
    getJobTitles();
  }, [user_id]);

  const getJobTitles = async () => {
    try {
      const res = await axios.get(`${apiUrl}user_cvs/`, { params: { user_id } });
      setJobTitles(Object.keys(res.data));
    } catch (err) {
      toast.error("Failed to load job titles.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    setSummary(null);

    try {
      const res = await getMatches(jobDescription, user_id, selectedJobTitle);
      console.log("Backend response:", res);

      if (!res.top_matches || res.top_matches.length === 0) {
        toast.info("No matches found.");
        return;
      }

      // Decode preview
      const decodedJobPreview = decodeURIComponent(res.job_description_preview || "");

      // Transform matches to backend schema
      const processedMatches = res.top_matches.map((m) => ({
        file_name: m.file_name,
        score: Number(m.similarity_score), // backend expects number
        matched_content: m.matched_content || "", // default to empty string
        percentage: (m.similarity_score * 100).toFixed(2), // for display
      }));

      setMatchedCandidates(processedMatches);

      setSummary({
        total_cvs: res.total_cvs_searched,
        matches_found: res.matches_found,
        method: res.matching_method,
        job_preview: decodedJobPreview,
      });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while finding matches.");
    } finally {
      setLoading(false);
    }
  };

  const saveMatcheFound = async () => {
    if (matchedCandidates.length === 0) {
      toast.warning("No matches to save.");
      return;
    }

    // Transform to match backend schema (remove percentage)
    const transformedCandidates = matchedCandidates.map((c) => ({
      file_name: c.file_name,
      score: c.score,
      matched_content: c.matched_content || "",
    }));

    const res = await saveMatches({
      user_id: Number(user_id), // ensure number
      jobDescription,
      job_title: selectedJobTitle,
      matchedCandidates: transformedCandidates,
    });

    if (res) toast.success("Matches saved successfully.");
  };

  const handleDownload = () => {
    if (matchedCandidates.length === 0) {
      toast.warning("No matches to download!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      matchedCandidates.map((c) => ({
        "File Name": c.file_name,
        "Match Score (%)": c.percentage,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Matches");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "matched_candidates.xlsx");

    toast.success("Matches downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800 flex flex-col">
      <Header />

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
          Paste your job description on the left, and see matched candidates on the right.
        </p>
      </section>

      <main className="flex flex-col md:flex-row flex-1 px-6 py-6 gap-6 max-w-7xl mx-auto w-full">
        {/* Left: Job description */}
        <div className="md:w-1/2 bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <div className="p-1 mb-3">
            <label className="block font-medium mb-2 text-blue-600 text-xl">
              Select Job Title:
            </label>
            <select
              value={selectedJobTitle}
              onChange={handleJobChange}
              className="border-gray-300 border rounded-lg px-3 py-2 w-full"
            >
              <option value="none">-- Select --</option>
              {jobTitle.map((job, i) => (
                <option key={i} value={job}>{job}</option>
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

        {/* Right: Match results */}
        <div className="md:w-1/2 bg-gray-50 rounded-2xl shadow-inner p-6 flex flex-col">
          <h5 className="text-xl mb-4 text-blue-600">Matched Applications</h5>

          {/* Summary */}
          {summary && (
            <div className="bg-white p-4 rounded-lg shadow mb-4">
              <p><strong>Job Description:</strong> {summary.job_preview}</p>
              <p><strong>Total CVs Searched:</strong> {summary.total_cvs}</p>
              <p><strong>Matches Found:</strong> {summary.matches_found}</p>
              <p><strong>Matching Method:</strong> {summary.method}</p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto space-y-4" style={{ maxHeight: "400px" }}>
            {loading && <p className="text-gray-500">Searching for matches...</p>}
            {!loading && matchedCandidates.length === 0 && (
              <p className="text-gray-500">No matches yet.</p>
            )}
            {!loading &&
              matchedCandidates.map((candidate, index) => (
                <div key={index} className="p-4 rounded-xl bg-white shadow hover:shadow-md transition">
                  <span className="font-bold">{index + 1}.</span>
                  <h4 className="text-lg font-semibold mb-1">{candidate.file_name}</h4>
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

          {/* Buttons */}
          <div className="mt-3 flex gap-3">
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
              Download File <MdOutlineCloudDownload className="text-xl" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
