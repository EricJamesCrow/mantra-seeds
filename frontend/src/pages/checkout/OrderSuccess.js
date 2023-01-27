import React, { useEffect, useState } from 'react'

// library for intuitive date formatting
import moment from 'moment'

// hooks
import { useAuthContext } from '../../hooks/useAuthContext';

import './OrderSuccess.css'

export default function OrderSuccess() {
  const { user } = useAuthContext()

  // order details
  const [orderNumber, setOrderNumber] = useState("#0001357")
  const [orderTotal, setOrderTotal] = useState("$420")
  const [orderDate, setOrderDate] = useState("1/18/2023")
  const [paymentMethod, setPaymentMethod] = useState("Stripe")
  const [email, setEmail] = useState("test@yahoo.com")
  const [expectedDelivery, setExpectedDelivery] = useState("1/20/2023")
  const [deliveryOption, setDeliveryOption] = useState("USPS Priority")


  const orderDetails = [
      { title: "Order Total", value: orderTotal },
      { title: "Order Date", value: orderDate },
      { title: "Payment Method", value: paymentMethod },
      { title: "Email", value: email },
      { title: "Expected Delivery", value: expectedDelivery },
      { title: "Delivery Option", value: deliveryOption }
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
          setOrderNumber(json.orderNumber)
          setOrderTotal(`$${(json.total/100).toFixed(2)}`)
          const date = moment(json.createdAt).format('MM/DD/YYYY');
          setOrderDate(date)
          // setPaymentMethod(json.payment)
          setEmail(json.email)
          setDeliveryOption(json.shipping.delivery)
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
    <div>{`Order Details - ${orderNumber}`}</div>
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
