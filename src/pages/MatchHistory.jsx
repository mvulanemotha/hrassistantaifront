import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { handleMatchDownload } from "../services/downloadMatches";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdPersonSearch } from "react-icons/md";
import Header from "../components/Header";

export default function MatchHistory() {
  
  const [history, setHistory] = useState([]);

  const user_id = localStorage.getItem("user_id");
  const apiUrl = import.meta.env.VITE_API_URL;

  // ✨ Later you can fetch from backend:
  useEffect(() => {
    getPastMatches();
  }, [user_id]);

  //get history matches
  const getPastMatches = async () => {
    const res = await axios
      .get(`${apiUrl}match_history`, {
        params: {
          user_id,
        },
      })
      .then((data) => {
        console.log(data);

        const rawData = data.data;

        const formatted = rawData
          .map((item) => ({
            id: item.id,
            jobTitle: item.job_title,
            jobDescription: item.job_description,
            matched_date: item.created_at,
            matches: item.results.map((r) => ({
              name: r.file_name.replace(/\.[^/.]+$/, ""), // removes file extension correctly
              score: r.score,
            })),
          }))
          .sort((a, b) => new Date(b.matched_date) - new Date(a.matched_date)); // 🔥 Sort here

        setHistory(formatted);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800 flex flex-col">
      {/* ✅ Header */}
      <Header/>   

      {/* ✅ Main Content */}
      <section className="flex-1 px-6 py-16 lg:py-24">
        <motion.h4
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-1xl lg:text-3xl font-extrabold mb-12 text-center text-gray-400"
        >
          Your Match History
        </motion.h4>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-10 text-gray-600">
            <MdPersonSearch className="text-5xl text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold">
              You haven’t matched any candidates yet
            </h2>
            <p className="mt-2 max-w-md">
              Start uploading CVs to see matches appear here.
            </p>
            <Link to="/uploadcvs">
              <p className="mt-8 hover:cursor-pointer font-bold text-blue-500 text-2xl underline">
                Upload CV'S
              </p>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col"
              >
                <h3 className="text-2xl font-bold text-blue-600 mb-2">
                  <span>{item.jobTitle}</span>
                  <br />
                  <span className="text-xs">
                    {new Date(item.matched_date).toLocaleString()}
                  </span>
                </h3>
                <p className="text-gray-600 mb-4">{item.jobDescription}</p>

                <h4 className="text-lg font-semibold mb-2">
                  Matched Candidates:
                </h4>
                <div className="border rounded-xl bg-gray-50 p-4 max-h-40 overflow-y-auto">
                  {item.matches.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {item.matches.map((candidate, idx) => (
                        <li key={idx}>
                          {candidate.name} –{" "}
                          <span className="text-blue-600 font-semibold">
                            {candidate.score}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No matches found.</p>
                  )}
                </div>
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col"
                >
                  {/* existing content */}

                  <button
                    onClick={() =>
                      handleMatchDownload(apiUrl, item.id, item.jobTitle)
                    }
                    className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Download All File Matches
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ✅ Footer */}
      <footer className="px-6 py-4 bg-gray-100 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HRAssistant AI. All rights reserved.
      </footer>
    </div>
  );
}
