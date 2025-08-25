import { useState } from "react";
import SidebarMenu from "../sideBar/SideBarMenu";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SidebarMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 flex-1 flex flex-col bg-gray-50 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } md:ml-64`}
      >
        {/* Page content */}
        <main className="flex-1 p-1 md:pl-6">
          <Outlet />
        </main>

        {/* Footer always at bottom */}
        <Footer className="mt-auto" />
      </div>
    </div>
  );
};

export default AppLayout;
