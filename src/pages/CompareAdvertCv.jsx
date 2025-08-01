import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const CompareAdvertCv = () => {
  // State for text inputs
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [cvText, setCvText] = useState("");

  // State for file inputs
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const navigate = useNavigate();

  // Handler for form submission (you can expand with API calls)
  const handleCompare = () => {
    // Example: Log inputs or prepare FormData for API call
    console.log("Job Description Text:", jobDescriptionText);
    console.log("CV Text:", cvText);
    console.log("Job Description File:", jobDescriptionFile);
    console.log("CV File:", cvFile);

    // TODO: Implement API call logic here
  };

  // assign who to register navigate to registration
  const loginUser = () => {
    localStorage.setItem("userType", "USER");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-4 shadow border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-500 cursor-pointer hover:text-blue-400">
          Your AI-Powered Tool
        </h1>
      </nav>

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

      {/* About Section */}
      <section id="about" className="px-6 py-10 bg-gray-50 text-center">
        <h3 className="text-3xl font-bold mb-6">About This Tool</h3>
        <p className="max-w-3xl mx-auto text-lg">
          This platform is designed for anyone looking to improve their job
          application process. With the help of AI, you can easily compare your
          CV against any job advert to better understand how well you match,
          identify gaps, and refine your resume with confidence.
        </p>
      </section>

      <section id="contact" className="px-6 py-16 bg-white text-center">
        <span
          onClick={loginUser}
          className="cursor-pointer inline-block text-blue-600 text-5xl font-medium hover:text-gray-400 transition underline"
        >
          Get Started
        </span>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-16 bg-white text-center">
        <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
        <p className="mb-4">Have questions or need a demo?</p>
        <Link
          to="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
        >
          Contact Us
        </Link>
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

export default CompareAdvertCv;
