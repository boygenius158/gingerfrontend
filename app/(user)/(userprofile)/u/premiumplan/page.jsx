"use client";

import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";



const stripePromise = loadStripe(
  "pk_test_51PirppRr9XEd7LoYO63o5eLQqYHIYD9V5K0yDPvpShgNikCcdTiUNPBGhaSldf37lr1GCD3ULS1LHJrs4BogN6ph00DleHSh9S"
);
export default function page() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
