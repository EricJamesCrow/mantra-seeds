import React from 'react'

// styles
import './AdminOrders.css'

// components
import AdminHeader from '../components/AdminHeader'
import FilterSort from '../components/FilterSort'
import OrderCustomerCard from '../components/OrderCustomerCard'

export default function AdminOrders() {
  const orders = [
    { id: "order", orderNumber: 'MS23021708', dateCreated: "15 Jul 2020, 16:00", email: 'EricCrow@pm.me', paymentStatus: 'pending', total: 20211, shippingStatus: 'false' },
    { id: "order", orderNumber: 'MS23021708', dateCreated: "15 Jul 2020, 16:00", email: 'EricCrow@pm.me', paymentStatus: 'paid', total: 20211, shippingStatus: 'true' },
    { id: "order", orderNumber: 'MS23021708', dateCreated: "15 Jul 2020, 16:00", email: 'EricCrow@pm.me', paymentStatus: 'paid', total: 20211, shippingStatus: 'true' },
    { id: "order", orderNumber: 'MS23021708', dateCreated: "15 Jul 2020, 16:00", email: 'EricCrow@pm.me', paymentStatus: 'pending', total: 20211, shippingStatus: 'false' },
    { id: "order", orderNumber: 'MS23021708', dateCreated: "15 Jul 2020, 16:00", email: 'EricCrow@pm.me', paymentStatus: 'paid', total: 20211, shippingStatus: 'true' },
    { id: "order", orderNumber: 'MS23021708', dateCreated: "15 Jul 2020, 16:00", email: 'EricCrow@pm.me', paymentStatus: 'pending', total: 20211, shippingStatus: 'false' },
    { id: "order", orderNumber: 'MS23021708', dateCreated: "15 Jul 2020, 16:00", email: 'EricCrow@pm.me', paymentStatus: 'pending', total: 20211, shippingStatus: 'false' },
  ]
  return (
    <>
    <AdminHeader/>
    <FilterSort/>
    <div className="display-admin-orders">
    {orders.map(item => (
      <OrderCustomerCard 
      key={item.id}
      item={item}
      />
    ))
    }
    </div>
    </>
  )
}
