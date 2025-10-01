import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import SidebarMenu from "../../components/sideBar/SideBarMenu";
import { useState } from "react";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // sidebar open by default

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md h-screen transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        } flex-shrink-0`}
      >
        <SidebarMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Top menu / welcome */}
        <div className="flex items-center justify-between p-4 shadow bg-gray-100">
          <nav className="ml-auto text-right">
            Welcome,{" "}
            <span className="text-red-600 font-bold">
              {localStorage.getItem("name")}
            </span>
          </nav>
        </div>

        {/* Page content */}
        <main className="p-6 flex-1 overflow-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="p-4 bg-gray-200 text-center">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
