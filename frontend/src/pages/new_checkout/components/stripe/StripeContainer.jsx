import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./StripeContainer.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.

const STRIPE_API_URL = '/api/payment/stripe'

export default function StripeContainer( { cart, shipping, user } ) {
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
    fetch(STRIPE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: cart.user,
        items: cart,
        shipping: {
          delivery: shipping.shippingName,
          price: shipping.shippingPrice,
          // expected: shipping.shippingPrice // fix this, need expected delivery date
        },
        payment: 'Stripe'
      }),
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
          <CheckoutForm cart={cart} shipping={shipping} user={user}/>
        </Elements>
      )}
    </div>
  );
}