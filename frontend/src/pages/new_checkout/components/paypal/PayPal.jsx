import React, { useEffect, useState } from 'react'

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PAYPAL_API_URL = '/api/payment/paypal/'

export default function PayPal( {cart, shipping}) {
    const [sandbox, setSandbox] = useState(null)
    const [total, setTotal] = useState(null)

    useEffect(() => {
        const addPayPal = async () => {
            const response = await fetch(PAYPAL_API_URL+'config');
            const clientId = await response.text();
            setSandbox(clientId)
        }
        const calculateOrderAmount = async () => {
            try {
            fetch(PAYPAL_API_URL+"calculate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: cart._id,
                  shippingPrice: shipping.shippingPrice,
                }),
              }).then((res) => res.json())
              .then((data) => {
                setTotal(data.total)});
            } catch(e) {
                console.log(e)
            }
        }
        if(sandbox === null) {
            calculateOrderAmount()
            addPayPal()
        }
    }, [])

  return (
    <>
    {sandbox !== null && total !== null &&
    <PayPalScriptProvider options={{
        "client-id": sandbox
    }}>
       <PayPalButtons
            createOrder={(data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: total,
                        },
                        custom_id: cart._id
                    },
                ],
            });
        }}
        onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
                console.log(details)
                fetch(PAYPAL_API_URL+'create_order', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: cart._id, shippingPrice: shipping.shippingPrice})
                  }).then((response) => {
                    if(response.ok) {
                      window.location.assign('/cart/checkout/order-success');
                    }
                  })
                  .catch(error => {
                    console.error('Error creating order:', error);
                  });
            });
        }}
       /> 
    </PayPalScriptProvider>
    }
    </>
  )
}
