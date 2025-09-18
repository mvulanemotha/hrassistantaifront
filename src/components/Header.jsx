import { useState, useEffect } from "react";

const Header = () => {
  const [credits, setCredits] = useState(localStorage.getItem("credits"));

  // Update credits every 500ms to ensure freshness
  useEffect(() => {
    const interval = setInterval(() => {
      const currentCredits = localStorage.getItem("credits");
      setCredits(currentCredits);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow">
      <h3 className="text-1xl text-blue-600 hidden sm:flex">
        <span className="">Welcome</span>
        <span className="text-sm text-gray-800 p-1">
          ( {localStorage.getItem("name")} )
        </span>
      </h3>

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