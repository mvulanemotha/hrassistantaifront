// components/PaypalPayment.jsx
const PaypalPayment = ({ amount, setLoading, loading }) => {
  const handlePaypalSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}create_paypal_order?amount=${amount}`
      );
      const data = await res.json();

      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        alert("PayPal setup failed");
      }
    } catch (err) {
      alert("PayPal error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <p className="mb-4">You’ll be redirected to PayPal to complete the payment.</p>
      <button
        onClick={handlePaypalSubmit}
        disabled={loading}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
      >
        {loading ? "Redirecting..." : "Pay with PayPal"}
      </button>
    </div>
  );
};

export default PaypalPayment;
