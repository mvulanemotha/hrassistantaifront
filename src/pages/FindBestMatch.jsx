import { useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineCloudDownload } from "react-icons/md";

export default function FindBestMatch() {
  const [jobDescription, setJobDescription] = useState("");
  const [matchedCandidates, setMatchedCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    setLoading(true);
    setMatchedCandidates([]);

    try {
      // 👉 Replace with backend call
      setTimeout(() => {
        setMatchedCandidates([
          { name: "Jane Doe", score: 92, email: "jane@example.com" },
          { name: "John Smith", score: 87, email: "john@example.com" },
          { name: "Mary Johnson", score: 81, email: "mary@example.com" },
          { name: "Peter Brown", score: 79, email: "peter@example.com" },
          { name: "Lina Adams", score: 78, email: "lina@example.com" },
          { name: "Zoe Chan", score: 77, email: "zoe@example.com" },
          { name: "Ahmed Khan", score: 75, email: "ahmed@example.com" },
          { name: "Fatima Ali", score: 74, email: "fatima@example.com" },
          { name: "Chris Lee", score: 73, email: "chris@example.com" },
          { name: "Tom Hardy", score: 70, email: "tom@example.com" },
          { name: "John Smith", score: 87, email: "john@example.com" },
          { name: "Mary Johnson", score: 81, email: "mary@example.com" },
          { name: "Peter Brown", score: 79, email: "peter@example.com" },
          { name: "Lina Adams", score: 78, email: "lina@example.com" },
          { name: "Zoe Chan", score: 77, email: "zoe@example.com" },
          { name: "Ahmed Khan", score: 75, email: "ahmed@example.com" },
          { name: "Fatima Ali", score: 74, email: "fatima@example.com" },
          { name: "Chris Lee", score: 73, email: "chris@example.com" },
          { name: "Tom Hardy", score: 70, email: "tom@example.com" },
        ]);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      alert("An error occurred while finding matches.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800 flex flex-col">
      {/* ✅ Header */}
      <nav className="flex justify-between items-center px-8 py-4 shadow">
        <h1 className="text-2xl font-bold text-blue-600">HRAssistant AI</h1>
        <div className="space-x-4">
          <a href="/uploadcvs" className="hover:text-blue-600">
            Upload CVs
          </a>
          <a href="/matchhistory" className="hover:text-blue-600">
            Matches
          </a>
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
          <h3 className="text-2xl font-bold mb-4 text-blue-600">
            Job Description
          </h3>
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

        {/* Right column (scrollable list) */}
        <div className="md:w-1/2 bg-gray-50 rounded-2xl shadow-inner p-6 flex flex-col">
          <h3 className="text-2xl font-bold mb-4 text-blue-600">
            Matched Applications
          </h3>
          <div
            className="flex-1 overflow-y-auto"
            style={{ maxHeight: "300px" }}
          >
            {loading && (
              <p className="text-gray-500">Searching for matches...</p>
            )}
            {!loading && matchedCandidates.length === 0 && (
              <p className="text-gray-500">No matches yet.</p>
            )}
            {!loading && matchedCandidates.length > 0 && (
              <div className="space-y-4">
                {matchedCandidates.map((candidate, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white shadow hover:shadow-md transition"
                  >
                    <span className="text-bold font-bold">{index + 1}</span>
                    <h4 className="text-lg font-semibold mb-1">
                      {candidate.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Match Score: {candidate.score}%
                    </p>
                    <p className="text-sm text-gray-600">
                      Email: {candidate.email}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-3 pl-1">
            <button className="bg-green-500 rounded-lg px-4 py-2 text-white flex items-center gap-2">
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
