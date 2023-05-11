import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

// components
import Order from '../new_profile/pages/components/Order'
import Loading from '../../components/loading/loading'

import './OrderSuccess.css'

export default function OrderSuccess() {
  const user = useSelector(state => state.auth.user);
  const order = useSelector(state => state.orders.order);

  function mapStatusToFriendlyStatus(status) {
    if (status === 'PAYMENT.CAPTURE.COMPLETED') {
      return 'Paid';
    }
    return status;
  }

    if(!user || !order) return <Loading/>

  return (
    <>
    <div className="order-success-container">
      <h1>Order Success!</h1>
      <h2>Thank you for your order!</h2>
      <h3>Order Number: #{order.orderNumber}</h3>
      <div>A confirmation email has been sent to {order.email}</div>
      <div>Click below to view your order details</div>
      <Order
      id={order._id}
      orderNumber={order.orderNumber}
      date={order.createdAt}
      orderTotal={order.total}
      paymentStatus={mapStatusToFriendlyStatus(order.transaction.status)}
      deliveryStatus={order.deliveryStatus}
      />
    </div>
    </>
  )
}
