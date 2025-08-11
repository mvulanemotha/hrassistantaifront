// src/components/Header.jsx
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  return (
    <>
      <nav className="flex justify-between items-center px-8 py-4 shadow">
        <h3 className="text-1xl text-blue-400">
          Welcome
          <span className="text-xs text-gray-800">
            {" "}
            ( {localStorage.getItem("name")} )
          </span>
        </h3>
        <div className="space-x-4">
          <span
            className="font-bold text-red-400 hover:text-red-600 cursor-pointer"
            onClick={handleLogout}
          ></span>
          <span className="text-red-300 font-mono">
            {" "}
            Credits:{" "}
            <span className="text-green-600 font-bold underline">
              {" "}
              {localStorage.getItem("credits")}
            </span>
          </span>
        </div>
      </nav>
    </>
  );
};

export default Header;
