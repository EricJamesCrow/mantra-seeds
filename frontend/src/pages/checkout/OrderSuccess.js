import React, { useEffect } from 'react'

// hooks
import { useAuthContext } from '../../hooks/useAuthContext';

import './OrderSuccess.css'

export default function OrderSuccess() {
  const { user } = useAuthContext()
    const orderDetails = [
        { title: "Order Total", value: "$420" },
        { title: "Order Date", value: "1/18/2023" },
        { title: "Payment Method", value: "Stripe" },
        { title: "Email", value: "test@yahoo.com" },
        { title: "Expected Delivery", value: "1/20/2023" },
        { title: "Delivery Option", value: "USPS Priority" }
      ];

    useEffect(() => {
      const fetchOrder = async () => {
        const headers = {
          'Authorization': user.token
      }
        const response = await fetch('/api/orders/'+user.order, { headers })
        const json = await response.json()

        if(response.ok) {
          console.log(json)
        }
      }
      if(user) {
        fetchOrder()
      }
    }, [user])

  return (
    <>
    <div className="order-success-container">
    <div>Thank you for your order!</div>
    <div>Order Details - #0001357</div>
    <div className="order-details">
      {orderDetails.map((detail) => (
        <div>
          {detail.title} {detail.value}
        </div>
      ))}
      </div>
    </div>
    </>
  )
}
