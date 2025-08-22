import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Header from "../components/Header";

const LowScoreExplanation = () => {
  const navigate = useNavigate();
  const [explanation, setExplanation] = useState();

  useEffect(() => {
    setExplanation(localStorage.getItem("lowscoreexplanation"));
    return;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
      {/* Header */}
      <Header />

      {/* Content */}
      <section className="px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-2">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-400 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Score Explanation
          </motion.h2>

          {/* Explanation */}
          {explanation && (
            <motion.div
              className="p-4 bg-green-50 border border-yellow-400 rounded-lg text-yellow-900 whitespace-pre-wrap leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="mt-2">{explanation}</p>
            </motion.div>
          )}

          {/* Back button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate(-1)}
              className="px-10 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow"
            >
              Back
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LowScoreExplanation;
