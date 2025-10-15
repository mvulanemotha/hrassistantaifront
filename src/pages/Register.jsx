import { motion } from "framer-motion";
import { register } from "../services/authService";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsloading] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [contact, setContact] = useState("");
  const [country, setCountry] = useState("Eswatini");
  const [userType, setUserType] = useState("USER");
  const [referal_code, setReferalCode] = useState("");

  const [countries, setCountries] = useState([
    { name: "Eswatini", code: "SZ", phone_code: "+268" },
    { name: "Angola", code: "AO", phone_code: "+244" },
    { name: "Botswana", code: "BW", phone_code: "+267" },
    { name: "Comoros", code: "KM", phone_code: "+269" },
    {
      name: "Democratic Republic of the Congo",
      code: "CD",
      phone_code: "+243",
    },
    { name: "Lesotho", code: "LS", phone_code: "+266" },
    { name: "Madagascar", code: "MG", phone_code: "+261" },
    { name: "Malawi", code: "MW", phone_code: "+265" },
    { name: "Mauritius", code: "MU", phone_code: "+230" },
    { name: "Mozambique", code: "MZ", phone_code: "+258" },
    { name: "Namibia", code: "NA", phone_code: "+264" },
    { name: "Seychelles", code: "SC", phone_code: "+248" },
    { name: "South Africa", code: "ZA", phone_code: "+27" },
    { name: "Tanzania", code: "TZ", phone_code: "+255" },
    { name: "Zambia", code: "ZM", phone_code: "+260" },
    { name: "Zimbabwe", code: "ZW", phone_code: "+263" },
  ]);

  const navigate = useNavigate();

  const handleRegister = async () => {
    // Validate required fields
    if (!name) {
      toast.warning("Name Required");
      return;
    }

    if (!email) {
      toast.warning("Email Required");
      return;
    }

    if (!country) {
      toast.warning("Country Required");
      return;
    }

    if (!contact) {
      toast.warning("Contact Needed");
      return;
    }

    if (!password) {
      toast.warning("Password Required");
      return;
    }

    if (!confirmPassword) {
      toast.warning("Confirm Password Required");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Password Missmatch");
      return;
    }

    if (!isValidEmail(email)) {
      toast.warning("Invalid email format");
      return;
    }

    // Validate contact length
    if (contact.length < 6 || contact.length > 14) {
      toast.warning("Contact number should be 6-14 digits");
      return;
    }

    // Get selected country
    const selectedCountry = countries.find((c) => c.name === country);
    if (!selectedCountry) {
      toast.warning("Invalid country selected");
      return;
    }

    // Prepend country code to contact number
    const fullContact = selectedCountry.phone_code + contact;

    // Validate phone number format
    const phoneRegex = /^\+\d{1,4}\d{6,14}$/;
    if (!phoneRegex.test(fullContact)) {
      toast.warning("Invalid phone number format");
      return;
    }

    console.log(userType + "Testing");

    setIsloading(true);

    try {
      const response = await register({
        name: name,
        email: email,
        user: userType,
        password: password,
        contact: fullContact,
        country: country,
        referral_code: referal_code,
      });

      // Handle response
      if (response.status_code === 201) {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else if (response.status_code === 400) {
        toast.warning(response.message);
      } else {
        toast.error(
          "Unexpected response: " + (response.message || "Please try again"),
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed: " + (error.message || "Network error"));
    } finally {
      setIsloading(false);
    }
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div>
      <nav className="flex justify-between items-center px-8 py-4 shadow border-b border-gray-400">
        <Link to="/">
          <div className="text-2xl font-bold border-b text-red-500">HireAI</div>
        </Link>
      </nav>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full"
        >
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Create Account
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Join{" "}
            <span className="font-semibold">
              <span className="p-1 text-2xl font-bold border-b text-red-500">
                HireAI
              </span>
            </span>
            and get started today!
          </p>

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block mb-1 font-medium">
                Full Name<span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">
                Email<span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>
            {/* Countries */}
            <div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country <span className="text-red-400">*</span>
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countries.map((country) => {
                    return (
                      <option key={country.name} value={country.name}>
                        {country.name} ( {country.phone_code} )
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Contact Number */}

            {/* Contact Number */}
            <div>
              <label className="block mb-1 font-medium">
                Contact<span className="text-red-400">*</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 rounded-l-lg bg-gray-50 text-gray-500">
                  {countries.find((c) => c.name === country)?.phone_code}
                </span>
                <input
                  type="tel"
                  value={contact}
                  onChange={(e) =>
                    setContact(e.target.value.replace(/\D/g, ""))
                  }
                  className="w-full border rounded-r-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12345678"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Referal Code
              </label>
              <input
                type="text"
                value={referal_code}
                onChange={(e) => setReferalCode(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="XVSGFE"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium">
                Password <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 font-medium">
                Confirm Password<span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>

            {/* Register Button */}
            <button
              onClick={() => handleRegister()}
              className="w-full bg-blue-600 text-white py-2 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
            >
              {loading ? (
                <span className="flex justify-center items-center gap-2 text-white">
                  Signing Up <Spinner width="5" height="5" />
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
