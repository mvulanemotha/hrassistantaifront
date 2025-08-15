import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  //assing a userType to allow which type of user is to login or register
  localStorage.setItem("userType", "HR");

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
        <Link
          to="/login"
          className="inline-block bg-blue-600 text-white px-10 py-2 rounded-full text-lg font-medium hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </header>

      <section id="features" className="px-6 py-6 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            title="Resume Parsing"
            description="Upload and parse resumes with AI-powered extraction."
          />
          <FeatureCard
            title="Smart Screening"
            description="Rank applicants automatically based on your criteria."
          />
          <FeatureCard
            title="Insights Dashboard"
            description="Track hiring progress with visual analytics."
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-16 bg-gray-50 text-center">
        <h3 className="text-3xl font-bold mb-6">About HRAssistant AI</h3>
        <p className="max-w-3xl mx-auto text-lg">
          HRAssistant AI is built to empower HR teams with intelligent tools for
          recruitment and management. Save time, reduce manual tasks, and focus
          on what matters: finding the right talent.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-16 bg-white text-center">
        <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
        <p className="mb-4">Have questions or need a demo?</p>
        <Link
          to="/contact"
          className="inline-block bg-blue-600 text-white px-10 py-2 rounded-full text-lg font-medium hover:bg-blue-700 transition"
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
}

function FeatureCard({ title, description }) {
  return (
    <div className="p-6 rounded-2xl shadow hover:shadow-lg transition bg-gray-50">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p>{description}</p>
    </div>
  );
}
