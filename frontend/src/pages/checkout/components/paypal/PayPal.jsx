import React, { useEffect, useState } from 'react'

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPal( {cart, shipping, user}) {
    const [sandbox, setSandbox] = useState(null)
    const [total, setTotal] = useState(null)

    useEffect(() => {
        const addPayPal = async () => {
            const response = await fetch('/api/paypal/config');
            const clientId = await response.text();
            setSandbox(clientId)
        }
        const calculateOrderAmount = async () => {
            try {
            fetch("/api/paypal/calculate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: cart.user,
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
    {/* {sdkReady && 
    <>
    <PayPalButton 
    amount={2209} 
    />
    </>
    } */}
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
            });
        }}
       /> 
    </PayPalScriptProvider>
    }
    </>
  )
}
