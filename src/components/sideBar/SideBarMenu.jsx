import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUserAlt, FaCog, FaBars } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { toast } from "react-toastify";

const SidebarMenu = ({ isOpen, setIsOpen }) => {
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const navigate = useNavigate();

  // Read user type from localStorage (e.g., 'hr' or 'client')
  const userType = localStorage.getItem("userType");

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_type");
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile menu toggle */}
      <button
        className="md:hidden p-4 text-2xl z-50 fixed top-2 left-2 bg-white border rounded shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r shadow-sm z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
        } md:translate-x-0 md:w-64`}
      >
        <div className="p-4 text-2xl font-bold border-b text-red-500">
          HireAI
        </div>

        <nav className="flex flex-col p-4 gap-4 text-gray-700">
          {/* HR Routes */}
          {userType === "HR" && (
            <>
              <NavLink
                to="/uploadcvs"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition ${
                    isActive ? "bg-blue-200 text-blue-700 font-semibold" : ""
                  }`
                }
              >
                <FaHome />
                Upload CVs
              </NavLink>
              <NavLink
                to="/findmatch"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition ${
                    isActive ? "bg-blue-200 text-blue-700 font-semibold" : ""
                  }`
                }
              >
                <FaUserAlt />
                Find Best Matches
              </NavLink>
              <NavLink
                to="/matchhistory"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition ${
                    isActive ? "bg-blue-200 text-blue-700 font-semibold" : ""
                  }`
                }
              >
                <FaCog />
                Match History
              </NavLink>
            </>
          )}

          {/* Client Routes */}
          {userType === "USER" && (
            <>
              <NavLink
                to="/startcomparing"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition ${
                    isActive ? "bg-blue-200 text-blue-700 font-semibold" : ""
                  }`
                }
              >
                <FaHome />
                Compare CV
              </NavLink>
              <NavLink
                to="/generatecv"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition ${
                    isActive ? "bg-blue-200 text-blue-700 font-semibold" : ""
                  }`
                }
              >
                <FaUserAlt />
                Generate CV
              </NavLink>
              <NavLink
                to="/addunits"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition ${
                    isActive ? "bg-blue-200 text-blue-700 font-semibold" : ""
                  }`
                }
              >
                <FaUserAlt />
                Add Units
              </NavLink>
            </>
          )}
        </nav>

        {/* Logout button */}
        <div
          className=" p-4  gap-2 text-red-600 cursor-pointer mt-20"
          onClick={handleLogout}
        >
          <NavLink
            to=""
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition ${
                isActive ? "bg-blue-200 text-blue-700 font-semibold" : ""
              }`
            }
          >
            <MdLogout className="w-6 h-6" />
            Log Out
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
