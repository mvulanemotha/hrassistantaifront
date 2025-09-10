import { useState } from "react";

const Header = () => {
  const [credits, setCredits] = useState(localStorage.getItem("credits"));
  //check after 3 seconds if the credit variable has not been updated, then update it
  setTimeout(() => {
    console.log("Checking credits update...", credits);
    if (credits !== localStorage.getItem("credits")) {
      setCredits(localStorage.getItem("credits"));
    }
  }, 3000);

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow">
      {/* Welcome/Name hidden on small screens */}
      <h3 className="text-1xl text-blue-600 hidden sm:flex">
        <span className="">Welcome</span>
        <span className="text-sm text-gray-800 p-1">
          {" "}
          ( {localStorage.getItem("name")} )
        </span>
      </h3>

      {/* Credits always visible, aligned to the right */}
      <div className="ml-auto space-x-4 flex items-center">
        <span className="text-red-300 font-mono">
          Credits:{" "}
          <span className="rounded-lg text-green-500 font-extrabold underline">
            {credits ? credits : 0}
          </span>
        </span>
      </div>
    </nav>
  );
};

export default Header;
