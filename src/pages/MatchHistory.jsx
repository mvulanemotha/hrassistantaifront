import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MatchHistory() {
  // 👇 Dummy data – replace with API data
  const [history, setHistory] = useState([
    {
      id: 1,
      jobTitle: "Frontend Developer",
      jobDescription: "Looking for a React developer with UI/UX experience.",
      matches: [
        "Alice Johnson",
        "Bob Smith",
        "Carol Brown",
        "David Green",
        "Eve White",
        "Frank Miller",
        "Grace Lee",
      ],
    },
    {
      id: 2,
      jobTitle: "Data Analyst",
      jobDescription:
        "Strong in SQL and Python. Able to work with large datasets.",
      matches: ["Henry Adams", "Isabel Clark"],
    },
  ]);

  // ✨ Later you can fetch from backend:
  // useEffect(() => {
  //   fetch("http://localhost:8000/user/match-history")
  //     .then(res => res.json())
  //     .then(data => setHistory(data))
  //     .catch(console.error);
  // }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800 flex flex-col">
      {/* ✅ Header */}
      <nav className="flex justify-between items-center px-8 py-4 shadow">
        <h1 className="text-2xl font-bold text-gray-800">HR Assistant AI</h1>
        <div className="space-x-4">
          <a href="/findmatch" className="hover:text-blue-600 font-bold text-gray-600">
            Find Matches
          </a>

          <a href="/uploadcvs" className="hover:text-blue-600 font-bold text-gray-600">
            Upload CVs
          </a>
        </div>
      </nav>

      {/* ✅ Main Content */}
      <section className="flex-1 px-6 py-16 lg:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl lg:text-5xl font-extrabold mb-12 text-center"
        >
          Your Match History
        </motion.h2>

        {history.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No match history yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col"
              >
                <h3 className="text-2xl font-bold text-blue-600 mb-2">
                  {item.jobTitle}
                </h3>
                <p className="text-gray-600 mb-4">{item.jobDescription}</p>

                <h4 className="text-lg font-semibold mb-2">Matched Candidates:</h4>
                <div className="border rounded-xl bg-gray-50 p-4 max-h-40 overflow-y-auto">
                  {item.matches.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {item.matches.map((candidate, idx) => (
                        <li key={idx}>{candidate}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No matches found.</p>
                  )}
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
