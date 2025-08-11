import { useState } from "react";
import SidebarMenu from "../sideBar/SideBarMenu";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <SidebarMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main
        className={`transition-all duration-300 flex-1 p-1 bg-gray-50 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } md:ml-64 md:pl-6`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
