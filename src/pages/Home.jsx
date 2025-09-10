import { Link, useNavigate } from "react-router-dom";

export default function Home() {
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
    // Turn into flex column, full height
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 text-gray-800">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-4 shadow border-b border-gray-400">
        <div className="text-2xl font-bold border-b text-red-500">HireAI</div>
      </nav>

      {/* Main Content Wrapper */}
      <main className="flex-grow">
        {/* About Section */}
        <section id="about" className="px-6 py-16 bg-gray-50 text-center">
          <h3 className="text-3xl font-bold mb-6">
            About <span className="text-red-500">HireAI</span>{" "}
          </h3>
          <p className="max-w-3xl mx-auto text-lg font-medium text-gray-500">
            HireAI is built to empower job seekers with intelligent
            tools for career success. Users can upload their CVs and instantly
            compare them with job adverts to see how well they align. This helps
            identify strengths, gaps, and opportunities to tailor
            applications—boosting their chances of landing interviews and job
            offers.
          </p>
        </section>

        {/* Login Section */}
        <section id="login" className="px-6 py-4 bg-white">
          <div className="flex justify-center gap-12">
            {/* Job Seeker */}
            <div className="flex flex-col items-center">
              <span className="text-center text-lg font-bold text-green-600">
                Looking for your next opportunity?
              </span>
              <button
                onClick={() => hangleLogin("USER")}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white text-lg font-semibold rounded-2xl shadow-md hover:from-green-500 hover:to-green-600 transition-all duration-300 ease-in-out"
              >
                Compare Now
              </button>
            </div>

            {/* HR Recruiter */}
            {/*
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
            */}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="px-6 py-16 bg-white text-center">
          <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
          <p className="mb-4">Have questions ?</p>
          <Link
            to="/contact"
            className="inline-block bg-blue-600 text-white px-10 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition"
          >
            Contact Us
          </Link>
        </section>
      </main>

      {/* Footer always at bottom */}
      <footer className="px-6 py-4 bg-gray-100 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HireAI, All rights reserved.
      </footer>
    </div>
  );
}
