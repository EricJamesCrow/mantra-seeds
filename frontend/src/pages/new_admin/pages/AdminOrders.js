import React from 'react'

// styles
import './AdminOrders.css'

// components
import AdminHeader from '../components/AdminHeader'
import FilterSort from '../components/FilterSort'
import OrderCustomerCard from '../components/OrderCustomerCard'

export default function AdminOrders() {
  const orders = [
    { id: "order", cardId: '#MS23021708', dateCreated: "15 Jul 2020, 16:00", var1: 'EricCrow@pm.me', var2: 'pending', var3: 20211, var4: 'false', var5: 'Pending' },
    { id: "order", cardId: '#MS23021708', dateCreated: "15 Jul 2020, 16:00", var1: 'EricCrow@pm.me', var2: 'paid', var3: 20211, var4: 'true', var5: 'Paid' },
    { id: "order", cardId: '#MS23021708', dateCreated: "15 Jul 2020, 16:00", var1: 'EricCrow@pm.me', var2: 'paid', var3: 20211, var4: 'true', var5: 'Paid' },
    { id: "order", cardId: '#MS23021708', dateCreated: "15 Jul 2020, 16:00", var1: 'EricCrow@pm.me', var2: 'pending', var3: 20211, var4: 'false', var5: 'Pending' },
    { id: "order", cardId: '#MS23021708', dateCreated: "15 Jul 2020, 16:00", var1: 'EricCrow@pm.me', var2: 'paid', var3: 20211, var4: 'true', var5: 'Paid' },
    { id: "order", cardId: '#MS23021708', dateCreated: "15 Jul 2020, 16:00", var1: 'EricCrow@pm.me', var2: 'pending', var3: 20211, var4: 'false', var5: 'Pending' },
    { id: "order", cardId: '#MS23021708', dateCreated: "15 Jul 2020, 16:00", var1: 'EricCrow@pm.me', var2: 'pending', var3: 20211, var4: 'false', var5: 'Pending' },
  ]
  
  return (
    <>
    <AdminHeader/>
    <FilterSort results={orders.length}/>
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
