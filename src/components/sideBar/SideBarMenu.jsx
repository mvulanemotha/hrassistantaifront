import { NavLink, useNavigate } from "react-router-dom";
import { FaUserAlt, FaBars, FaCloudDownloadAlt } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { GrCompare ,GrSearchAdvanced } from "react-icons/gr";
import { ImHistory } from "react-icons/im";
import { BsCreditCard2Back } from "react-icons/bs";
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
                  `flex items-center gap-3  py-2 rounded-lg hover:bg-blue-100 transition ${
                    isActive ? "bg-blue-200 text-blue-700 font-semibold" : ""
                  }`
                }
              >
                <IoCloudUploadOutline className="h-6 w-12" />
                Upload CVs
              </NavLink>
              <NavLink
                to="/findmatch"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3  py-2 rounded-lg hover:bg-blue-100 transition ${
                    isActive ? "bg-blue-200 text-blue-700 font-semibold" : ""
                  }`
                }
              >
                <GrSearchAdvanced className="h-6 w-12" />
                Find Best Matches
              </NavLink>
                   <NavLink
                to="/startcomparing"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3  py-2 rounded-lg hover:bg-blue-100 transition ${
                    isActive ? "bg-blue-200 text-blue-700 font-semibold" : ""
                  }`
                }
              >
                <GrCompare className="h-6 w-12" />
                Compare Cv
              </NavLink>
              <NavLink
                to="/matchhistory"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 rounded-lg hover:bg-blue-100 transition ${
                    isActive ? "bg-blue-200 text-blue-700 font-semibold" : ""
                  }`
                }
              >
                <ImHistory className="h-6 w-12" />
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
                  `flex items-center gap-3 py-2 rounded-lg hover:bg-blue-100 transition ${
                    isActive ? "bg-blue-200 text-blue-700 font-semibold" : ""
                  }`
                }
              >
                <GrCompare className="h-6 w-12" />
                Compare CV
              </NavLink>
              <NavLink
                to="/generatecv"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 rounded-lg hover:bg-blue-100 transition ${
                    isActive ? "bg-blue-200 text-blue-700 font-semibold" : ""
                  }`
                }
              >
                <FaCloudDownloadAlt className="h-6 w-12 text-gray-500" />
                Generate CV
              </NavLink>
              <NavLink
                to="/addunits"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 rounded-lg hover:bg-blue-100 transition ${
                    isActive ? "bg-blue-200 text-blue-700 font-semibold" : ""
                  }`
                }
              >
                <BsCreditCard2Back className="h-6 w-12 text-orange-500" />
                Add Credits
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
