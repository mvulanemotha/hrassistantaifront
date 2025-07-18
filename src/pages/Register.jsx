import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { register } from "../services/authService";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function Register() {

  const [name , setName] = useState("")
  const [password , setPassword] = useState("")
  const [isloading , setIsloading] = useState(false)
  const [email , setEmail] = useState("")
  const [ confirmPassword , setConfirmpassword ] = useState("")

  const navigate = useNavigate()

  const handleRegister = async() => {
 
  if(name === "" || name === null){
    toast.warning("Name Required")
    return
  }

  if(email === "" || email === null){
    toast.warning("Email Required")
    return
  }

  if(password === ""){
    toast.warning("Password Required")
    return
  }

  if(confirmPassword === ""){
    toast.warning("Confirm Password Required")
    return
  }

  if(password !== confirmPassword){
    toast.warning("Password Missmatch")
    return
  }

  const response = await register({"name": name , "email" : email, "password" : password   })
  
  console.log(response)
  //New user created succesfully
  if(response.status_code === 201){
    toast.success("You have registered succesfully")
    setTimeout(()=> {
      navigate("/login")
    },3000)
  }

  // user already exists
  if(response.status_code === 400)
    toast.warning(response.message)
    return
  }  


  return (
    <div>
      <nav className="flex justify-between items-center px-8 py-4 shadow">
        <h1 className="text-2xl font-bold text-gray-600">
          <a href="/" className="hover:text-blue-600">
            HR Assistant AI
          </a>
        </h1>
      </nav>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full"
        >
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Create Your Account
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Join <span className="font-semibold">HRAssistant AI</span> and get
            started today!
          </p>

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Hr Ai Assistant"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="hrassistant@hr.co.sz"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********"
              />
            </div>

            {/* Register Button */}
            <button
              onClick={() => handleRegister()}
              className="w-full bg-blue-600 text-white py-2 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
            >
              Sign Up
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
