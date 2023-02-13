import React from 'react'

//redux
import { useSelector } from 'react-redux'

// styles
import './AdminOrders.css'

// components
import AdminHeader from '../components/AdminHeader'
import FilterSort from '../components/FilterSort'
import SideBar from '../components/SideBar'
import OrderCustomerCard from '../components/OrderCustomerCard'


export default function AdminOrders() {
  const orders = useSelector(state => state.orders.orders);
  if (!orders) return null; // only render once redux is loaded

  const ordersData = orders.map(order => ({
    id: "order",
    cardId: order._id,
    dateCreated: order.createdAt,
    var1: order.email,
    var2: "pending",
    var3: order.total,
    var4: "false",
    var5: "Pending"
  }));
  
  return (
    <>
    <div className='admin-side-bar-main-content-container'>
    <SideBar/>
    <div className="admin-main-content">
    <AdminHeader/>
    <FilterSort results={ordersData.length}/>
    <div className="display-admin-orders">
    {ordersData.map(item => (
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
