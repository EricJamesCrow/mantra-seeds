import React from 'react'

import './OrderSuccess.css'

export default function OrderSuccess() {
    const orderDetails = [
        { title: "Order Total", value: "$420" },
        { title: "Order Date", value: "1/18/2023" },
        { title: "Payment Method", value: "Stripe" },
        { title: "Email", value: "test@yahoo.com" },
        { title: "Expected Delivery", value: "1/20/2023" },
        { title: "Delivery Option", value: "USPS Priority" }
      ];

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
