// src/components/Header.jsx
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <>
      <nav className="flex justify-between items-center px-8 py-4 shadow">
        <h1 className="text-2xl font-bold text-gray-800">
          <Link to="/" className="hover:text-blue-600">
            HR Assistant AI
          </Link>
        </h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="hover:text-blue-600 font-bold text-gray-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="hover:text-blue-600 font-bold text-gray-600"
          >
            Register
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
