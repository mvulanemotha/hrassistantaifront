import { Link, useNavigate } from "react-router-dom";
import frontImg from "../assets/mergedcvandadvertjob.png";

export default function HomeHr() {
  const navigate = useNavigate();
  localStorage.setItem("userType", "HR");

  const handleLogin = () => {
    navigate("/login");
  };

  console.log(localStorage.getItem("userType"));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 text-gray-800">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-4 shadow border-b border-gray-400">
        <div className="text-2xl font-bold text-red-500">HireAI</div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {/* About Section */}
        <section id="about" className="px-6 py-16 text-center">
          <h3 className="text-3xl font-bold mb-6">
            About <span className="text-red-500">HireAI</span>
          </h3>
          <p className="max-w-3xl mx-auto text-lg font-medium text-blue-900">
            HireAI empowers HR professionals to efficiently find the best
            candidates. Upload job adverts and instantly get a shortlist of job
            seekers whose CVs match the requirements. Streamline recruitment,
            identify top talent faster, and make informed hiring decisions with
            AI-powered insights.
          </p>
        </section>

        {/* Hero / Login Section */}
        <div
          className="w-full h-60 lg:h-80 bg-cover bg-center rounded-lg text-center flex items-center justify-center"
          style={{ backgroundImage: `url(${frontImg})` }}
        >
          <div className="flex justify-center gap-12">
            {/* HR Recruiter */}
            <div className="flex flex-col items-center">
              <span className="text-center text-2xl font-bold text-red-600">
                Start shortlisting candidates now
              </span>
              <button
                onClick={handleLogin}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white text-lg font-semibold rounded-2xl shadow-md hover:from-green-500 hover:to-green-600 transition-all duration-300 ease-in-out"
              >
                Find Candidates
              </button>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <section id="contact" className="px-6 py-16 bg-white text-center">
          <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
          <p className="mb-4">Have questions?</p>
          <Link
            to="/contact"
            className="inline-block bg-blue-600 text-white px-10 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition"
          >
            Contact Us
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 bg-gray-100 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HireAI, All rights reserved.
      </footer>
    </div>
  );
}
