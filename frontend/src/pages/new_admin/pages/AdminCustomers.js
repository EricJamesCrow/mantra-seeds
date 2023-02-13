import React from 'react'

// components
import AdminHeader from '../components/AdminHeader'
import FilterSort from '../components/FilterSort'
import SideBar from '../components/SideBar'
import OrderCustomerCard from '../components/OrderCustomerCard'

export default function AdminCustomers() {
  const customers = [
    { id: "customer", cardId: '63ca0d44e163669ecb545709', dateCreated: "15 Jul 2020, 16:00", var1: 'EricCrow@pm.me', var2: 'active', var3: 6, var4: '$1029.99', var5: '63ddd4cf21d92eac0603e82f' },
    { id: "customer", cardId: '63ca0d44e163669ecb545709', dateCreated: "15 Jul 2020, 16:00", var1: 'EricCrow@pm.me', var2: 'inactive', var3: 6, var4: '$1029.99', var5: '63ddd4cf21d92eac0603e82f' },
    { id: "customer", cardId: '63ca0d44e163669ecb545709', dateCreated: "15 Jul 2020, 16:00", var1: 'EricCrow@pm.me', var2: 'inactive', var3: 6, var4: '$1029.99', var5: '63ddd4cf21d92eac0603e82f' },
    { id: "customer", cardId: '63ca0d44e163669ecb545709', dateCreated: "15 Jul 2020, 16:00", var1: 'EricCrow@pm.me', var2: 'active', var3: 6, var4: '$1029.99', var5: '63ddd4cf21d92eac0603e82f' },
    { id: "customer", cardId: '63ca0d44e163669ecb545709', dateCreated: "15 Jul 2020, 16:00", var1: 'EricCrow@pm.me', var2: 'active', var3: 6, var4: '$1029.99', var5: '63ddd4cf21d92eac0603e82f' },
  ]

  return (
    <>
    <div className='admin-side-bar-main-content-container'>
    <SideBar/>
    <div className="admin-main-content">
    <AdminHeader/>
    <FilterSort results={customers.length}/>
    <div className="display-admin-orders">
    {customers.map(item => (
      <OrderCustomerCard 
      key={item.id}
      item={item}
      />
    ))
    }
    </div>
    </div>
    </div>
    </>
  )
}
