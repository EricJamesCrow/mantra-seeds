import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { setOrder } from '../../../../redux/slices/ordersSlice';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PAYPAL_API_URL = '/api/payment/paypal/'

export default function PayPal( {cart, shipping, user, dispatch, clearCart, checkInventory}) {
    const [sandbox, setSandbox] = useState(null)
    const [total, setTotal] = useState(null)
    const navigate = useNavigate()

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
            createOrder={async (data, actions) => {
                try {
                  // Call the checkInventory function before creating the order
                  await checkInventory();
              
                  // If everything is fine, proceed with order creation
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: total,
                        },
                        custom_id: cart._id,
                      },
                    ],
                  });
                } catch (error) {
                  console.log("Inventory check failed:", error);
                  // Show an error message or handle it accordingly
                  // Here, you can use a state variable to display an error message, for example
                }
              }}
        onApprove={async (data, actions) => {
          try {
            const capture = await actions.order.capture();
            const transactionId = capture.purchase_units[0].payments.captures[0].id;
            const requestBody = {
              id: cart._id,
              shippingPrice: shipping.shippingPrice,
              transactionId: transactionId, // Pass the payment ID from the details object
              user: user,
            };
        
            const response = await fetch(PAYPAL_API_URL + "create_order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestBody),
            });
        
            if (response.ok) {
              const responseData = await response.json();
              dispatch(clearCart());
              dispatch(setOrder(responseData.order));
              navigate("/cart/checkout/order-success");
            }
          } catch (error) {
            console.error("Error creating order:", error);
          }
        }}     
       /> 
    </PayPalScriptProvider>
    }
    </>
  )
}
