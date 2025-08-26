import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  //assing a userType to allow which type of user is to login or register

  const navigate = useNavigate();
  const hangleLogin = (user_type) => {
    if (user_type === "HR") {
      localStorage.setItem("userType", "HR");
      navigate("/login");
    } else {
      localStorage.setItem("userType", "USER");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-4 shadow border-b border-gray-400">
        <div className="text-2xl font-bold border-b text-red-500">HireAI</div>
      </nav>

      {/* Hero Section */}
      <header className="text-center px-6 py-12 lg:py-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl lg:text-6xl font-extrabold mb-6 text-gray-400"
        >
          Your AI-Powered HR Assistant Tool
        </motion.h2>
        <p className="text-lg lg:text-xl max-w-2xl mx-auto mb-8">
          Streamline recruitment, manage applicants, and get insights with the
          power of AI.
        </p>
      </header>

      {/* About Section */}
      <section id="about" className="px-6 py-16 bg-gray-50 text-center">
        <h3 className="text-3xl font-bold mb-6">
          About <span className="text-red-500">HireAI</span>{" "}
        </h3>
        <p className="max-w-3xl mx-auto text-lg">
          HireAI Assistant is built to empower users actively seeking employment
          and HR teams with intelligent tools for recruitment and management.
          Job seekers can compare their CVs with job adverts to see how well
          they align, while HR teams can save time, reduce manual tasks, and
          focus on what matters: finding the right talent.
        </p>
      </section>

      {/* Contact Section */}
      <section id="login" className="px-6 py-4 bg-white">
        <div className="flex justify-center gap-12">
          {/* Job Seeker */}
          <div className="flex flex-col items-center">
            <span className="text-center font-bold text-gray-500">
              Looking for your next opportunity?
            </span>
            <span
              onClick={() => hangleLogin("USER")}
              className="mt-2 text-red-800 underline text-lg font-medium cursor-pointer hover:text-green-500"
            >
              Compare Now
            </span>
          </div>

          {/* HR Recruiter */}
          <div className="flex flex-col items-center">
            <span className="text-center font-bold text-gray-500">
              Start shortlisting candidates
            </span>
            <span
              onClick={() => hangleLogin("HR")}
              className="mt-2 text-red-800 underline text-lg font-medium cursor-pointer hover:text-green-500"
            >
              HR Recruiter
            </span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-16 bg-white text-center">
        <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
        <p className="mb-4">Have questions ?</p>
        <Link
          to="/contact"
          className="inline-block bg-blue-600 text-white px-10 py-2 rounded-full text-lg font-medium hover:bg-blue-700 transition"
        >
          Contact Us
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-6 py-4 bg-gray-100 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HireAI, All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="p-6 rounded-2xl shadow hover:shadow-lg transition bg-gray-50">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p>{description}</p>
    </div>
  );
}
