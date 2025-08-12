import { useState } from "react";
import StripePayment from "../components/payment/Stripe";
import MtnPayment from "../components/payment/MtnPayment";
import PaypalPayment from "../components/payment/PaypalPayment";

const AddUnits = ({ amount, paymentType }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="p-6 w-full max-w-xl mx-auto mt-10">
        <h2 className="text-lg font-bold mb-6 text-center text-blue-700 border-b">
          Pay R{(amount / 100).toFixed(2)} via {paymentType.toUpperCase()}
        </h2>

        {paymentType === "card" && (
          <StripePayment
            loading={loading}
            setLoading={setLoading}
            setPaymentSuccess={setPaymentSuccess}
          />
        )}

        {paymentType === "paypal" && (
          <PaypalPayment
            amount={amount}
            loading={loading}
            setLoading={setLoading}
            setPaymentSuccess={setPaymentSuccess}
          />
        )}

        {paymentType === "mtn" && (
          <MtnPayment
            amount={amount}
            loading={loading}
            setLoading={setLoading}
          />
        )}

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
