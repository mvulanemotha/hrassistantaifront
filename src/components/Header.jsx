import { useState, useEffect } from "react";

const Header = () => {
  const [credits, setCredits] = useState(localStorage.getItem("credits") || 0);
  const [referralCode, setReferralCode] = useState(
    localStorage.getItem("referral_code") || 0,
  );

  // Update credits and referral code every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      setCredits(localStorage.getItem("credits") || 0);
      setReferralCode(localStorage.getItem("referral_code") || 0);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow">
      <h3 className="text-1xl text-blue-600 hidden sm:flex">
        <span></span>
        <span className="text-sm text-gray-800 p-1 font-semibold">
          {localStorage.getItem("name")}
        </span>
      </h3>

      <div className="ml-auto space-x-6 flex items-center">
        <span className="text-gray-500 font-mono text-sm font-bold">
          R Code:{" "}
          <span className="rounded-lg text-green-500 font-extrabold underline">
            {referralCode || 0}
          </span>
        </span>

        <span className="text-gray-500 font-mono text-sm">
          Credits:{" "}
          <span className="rounded-lg text-green-500 font-extrabold underline">
            {credits || 0}
          </span>
        </span>
      </div>
    </nav>
  );
};

export default Header;
