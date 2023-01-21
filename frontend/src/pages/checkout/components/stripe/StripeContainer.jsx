import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./StripeContainer.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.

export default function StripeContainer( { cart, shipping } ) {
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] = useState(null)

  useEffect(() => {
    fetch("/config").then(async (r) => {
        const {publishableKey} = await r.json();

        setStripePromise(loadStripe(publishableKey))
    })
  }, []);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    // console.log(cart)
    fetch("/api/payments/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart, shipping: shipping}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="stripe-container">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm cart={cart} shipping={shipping}/>
        </Elements>
      )}
    </div>
  );
}