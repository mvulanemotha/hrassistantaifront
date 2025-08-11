import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const StripePayment = ({ loading, setLoading, setPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const hangleStripeSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required",
    });

    console.log(result)

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      //save payment details to the database  
      setPaymentSuccess(true);
    }
    setLoading(false);
  };

  return (
     <form onSubmit={hangleStripeSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default StripePayment;
