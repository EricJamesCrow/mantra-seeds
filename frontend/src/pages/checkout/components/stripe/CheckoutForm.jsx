import React, { useEffect, useState } from "react";

import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm( { cart, shipping, user } ) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = user.token;

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const createOrder = async () => {
    const response = await fetch("/api/orders/", {
      method: "POST",
      body: JSON.stringify({
        user: cart.user,
        address: { 
          firstName: shipping.firstName,
          lastName: shipping.lastName,
          street: shipping.address,
          city: shipping.city,
          state: shipping.state,
          zip: shipping.zip
        },
        items: cart.cartItems,
        shipping: {
          delivery: shipping.shippingName,
          price: shipping.shippingPrice,
          expected: shipping.shippingPrice // fix this, need expected delivery date
        },
        email: shipping.email,
        payment: 'Stripe'
      }),
      headers: { 
        "Authorization": token,
        "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Order created successfully!");
    } else {
      console.log("Failed to create order: " + data.error);
    }
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/cart/checkout/order-success",
        receipt_email: email,
        redirect: 'if_required'
      },
    }).then(async () => {
      createOrder()
    }).catch((error) => {
      console.log("Error: " + error);
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    supportedPaymentMethods: ['card', 'googlePay', 'ideal', 'giropay', 'sepa_debit', 'bancontact', 'eps', 'p24', 'alipay', 'wechat'],
    layout: "tabs"
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}