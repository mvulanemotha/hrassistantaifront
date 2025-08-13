import { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { toast } from "react-toastify";

const AddUnits = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState("");
  const [contact, setContact] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  //process payment

  const hanglePayment = async () => {
    try {
      if (amount === "" || amount === 0) {
        toast.warning("Amount value is missing");
        return;
      }

      if (contact === "" || contact === null) {
        toast.warning("Contact value is missing");
      }

      setLoading(true);

      await axios
        .post(`${apiUrl}request_to_pay`, {
          msisdn: `268${contact}`,
          amount: amount,
          user_id : localStorage.getItem("user_id")
        })
        .then((data) => {
          console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 w-full max-w-xl mx-auto mt-10">
        <h2 className="text-lg font-bold mb-6 text-center text-blue-700 border-b">
          SELECT A PAYMENT METHOD
        </h2>
        {/* buttons to be selected */}
        <div className="pt-4">
          <button className="bg-yellow-500 p-3 px-6 py-2 rounded-full text-gray-600 font-bold">
            Mobile Money
          </button>
        </div>
        {/* Display areas */}
        <div>
          <div className="bg-gray-100 p-6 mt-4 rounded-2xl shadow-md">
            <div>
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contact Number
              </label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="76431551"
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Amount
              </label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="tel"
                placeholder="0.0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mt-3">
              <button
                onClick={hanglePayment}
                disabled={loading}
                className="bg-green-500 p-3 px-4 py-2 rounded-full text-white font-bold"
              >
                {loading ? "Processing Payment ..." : "Process Payment"}
              </button>
            </div>
          </div>
        </div>

        {paymentSuccess && (
          <div className="text-green-600 mt-4 text-center">
            ✅ Payment successful!
          </div>
        )}
      </div>
    </>
  );
};

export default AddUnits;
