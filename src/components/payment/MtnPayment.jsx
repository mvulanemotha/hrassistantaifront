// components/MtnPayment.jsx
import { useState } from "react";

const MtnPayment = ({ amount, setLoading, setPaymentSuccess, loading }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleMtnSubmit = async () => {
    if (!phoneNumber) return alert("Enter phone number");

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}pay_mtn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, phone: phoneNumber }),
      });
      const data = await res.json();

      if (data.success) {
        setPaymentSuccess(true);
      } else {
        alert("MTN Payment failed.");
      }
    } catch (err) {
      alert("MTN error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="tel"
        placeholder="Enter MTN Number (e.g. 2687xxxxxxx)"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />
      <button
        onClick={handleMtnSubmit}
        disabled={loading}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        {loading ? "Sending Request..." : "Pay with MTN MoMo"}
      </button>
    </div>
  );
};

export default MtnPayment;
