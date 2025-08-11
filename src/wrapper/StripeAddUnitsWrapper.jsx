import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AddUnits from "../pages/AddUnits";
import Header from "../components/Header";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const apiUrl = import.meta.env.VITE_API_URL;

export default function StripeAddUnitsWrapper() {
  const [amount, setAmount] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentType, setPaymentType] = useState("card");
  const [step, setStep] = useState("select"); // "select" | "payment"

  const handleAmountSubmit = async (e) => {
    e.preventDefault();

    if (paymentType === "card") {
      try {
        const response = await fetch(
          `${apiUrl}create_payment_intent?amount=${parseInt(amount)}`
        );
        const data = await response.json();
        setClientSecret(data.clientSecret);
        setStep("payment");
      } catch (error) {
        alert("Failed to initialize Stripe payment");
      }
    } else {
      setStep("payment");
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentType(e.target.value);
    setClientSecret(null);
  };

  const handleBack = () => {
    setStep("select");
    setClientSecret(null);
  };

  return (
    <>
      <Header />

      {step === "select" ? (
        <div className="p-4 max-w-xl mx-auto mt-10">
          <h2 className="text-lg font-bold mb-4 text-center">
            Choose Payment Method
          </h2>

          <div className="flex justify-center space-x-4 mb-6">
            {["card", "mtn", "paypal"].map((type) => (
              <label key={type} className="flex items-center gap-2 capitalize">
                <input
                  type="radio"
                  name="payment"
                  value={type}
                  checked={paymentType === type}
                  onChange={handlePaymentMethodChange}
                  className="accent-blue-600"
                />
                {type}
              </label>
            ))}
          </div>

          <form onSubmit={handleAmountSubmit} className="space-y-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount in cents (e.g. 5000 = R50.00)"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
              min={100}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Continue
            </button>
          </form>
        </div>
      ) : (
        <div className="max-w-xl mx-auto p-4 mt-10">
          <button
            onClick={handleBack}
            className="mb-4 text-sm text-blue-600 hover:underline"
          >
            ← Back to payment selection
          </button>

          {paymentType === "card" && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <AddUnits amount={amount} paymentType="card" />
            </Elements>
          )}

          {paymentType === "mtn" && (
            <AddUnits amount={amount} paymentType="mtn" />
          )}

          {paymentType === "paypal" && (
            <AddUnits amount={amount} paymentType="paypal" />
          )}
        </div>
      )}
    </>
  );
}
