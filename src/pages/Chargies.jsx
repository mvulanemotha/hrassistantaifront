import { useState, useEffect } from "react";
import Header from "../components/Header";
import chargeService from "../services/chargeService";

const ChargeTable = () => {
  const [chargies, setChargies] = useState({});

  // Load charges from localStorage
  useEffect(() => {
    const localCharges = JSON.parse(localStorage.getItem("chargies") || "{}");
    setChargies(localCharges);
  }, []);

  return (
    <>
      <Header />
      <div className="p-6 w-full max-w-3xl mx-auto mt-10">
        <h2 className="text-lg font-bold mb-6 text-center text-blue-700 border-b">
          SERVICE UNITS
        </h2>

        <div className="overflow-y-auto">
          <table className="min-w-full bg-gray-100 rounded-2xl shadow-md">
            <thead className="text-xs">
              <tr className="bg-blue-400 text-white">
                <th className="text-left py-3 px-4">Description</th>
                <th className="text-left py-3 px-4 rounded-tr-2xl">Units</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {Object.keys(chargies).map((key, index) => (
                <tr
                  key={key}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                >
                 
                  <td className="py-3 px-4">{chargies[key].description}</td>
                  <td className="py-3 px-4 font-bold">
                    {chargies[key].price.toFixed(2)}
                  </td>
                </tr>
              ))}
              {Object.keys(chargies).length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    No services available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ChargeTable;
