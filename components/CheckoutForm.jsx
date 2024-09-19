import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useSession } from "next-auth/react";
import instance from "@/axiosInstance";

function CheckoutForm() {
  const { data: session, status } = useSession();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  console.log(session);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL; // Access API URL from environment variable

      const {
        data: { clientSecret },
      } = await axios.post(`${apiUrl}/api/create-payment-intent`, {
        amount: 1000, // amount in cents
        userId: session?.id,
      });

      console.log("Client Secret:", clientSecret);

      const cardElement = elements.getElement(CardElement);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        const response = await instance.post("/api/user/premium-payment", {
          userId: session?.id,
        });
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold mb-4">Complete Your Payment</h2>
      <div className="mb-4">
        <CardElement
          className="p-3 border border-gray-300 rounded-md"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || processing || succeeded}
        className={`w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300 ${
          processing ? "cursor-not-allowed" : ""
        }`}
      >
        {processing ? "Processing..." : "Pay"}
      </button>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      {succeeded && (
        <div className="text-green-500 text-sm mt-2">Payment succeeded!</div>
      )}
    </form>
  );
}

export default CheckoutForm;
