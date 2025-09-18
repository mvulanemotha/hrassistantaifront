import { motion } from "framer-motion";
import { FiPhone, FiMail, FiLinkedin } from "react-icons/fi";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800 flex flex-col">
      {/* ✅ Header */}
      <nav className="flex justify-between items-center px-8 py-4 shadow border-b border-gray-400">
        <div className="text-2xl font-bold border-b text-red-500">HireAI</div>
      </nav>

      {/* ✅ Main Section */}
      <section className="flex-1 px-6 py-16 lg:py-24 flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl lg:text-5xl font-extrabold mb-4"
        >
          Get in Touch
        </motion.h2>
        <p className="text-lg max-w-2xl mb-12 text-gray-600">
          Feel free to reach out to me through any of the channels below. I’d
          love to hear from you!
        </p>

        {/* ✅ Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full">
          {/* Phone Card */}
          <ContactCard
            icon={<FiPhone className="text-4xl text-blue-600" />}
            title="Phone"
            value="+268 76431551"
            link="tel:+268 76431551"
          />

          {/* Email Card */}
          <ContactCard
            icon={<FiMail className="text-4xl text-blue-600" />}
            title="Email"
            value="boymotsa@gmail.com"
            link="mailto:boymotsa@gmail.com"
          />

          {/* LinkedIn Card */}
          <ContactCard
            icon={<FiLinkedin className="text-4xl text-blue-600" />}
            title="LinkedIn"
            value="https://www.linkedin.com/in/mkhululi-motha/"
            link="https://www.linkedin.com/in/mkhululi-motha/"
          />
        </div>

        {/* ✅ Email Button */}
        <div className="mt-12">
          <Link
            to="mailto:boymotsa@gmail.com"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition shadow-md hover:shadow-lg"
          >
            Send Email
          </Link>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="px-6 py-4 bg-gray-100 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HRAssistant AI. All rights reserved.
      </footer>
    </div>
    </>
  );
}

// Reusable ContactCard component
function ContactCard({ icon, title, value, link }) {
  return (
    <Link
      to={link}
      target={link.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="flex flex-col items-center bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition duration-300"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{value}</p>
    </Link>
  );
}
