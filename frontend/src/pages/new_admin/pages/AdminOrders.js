import React, { useState } from 'react'

//redux
import { useSelector } from 'react-redux'

// styles
import './AdminOrders.css'

// components
import AdminHeader from '../components/AdminHeader'
import FilterSort from '../components/FilterSort'
import SideBar from '../components/SideBar'
import OrderCustomerCard from '../components/OrderCustomerCard'
import Pagination from '../../../components/Pagination'


export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // pagination
  const [itemsPerPage, setItemsPerPage] = useState(10); // pagination
  const orders = useSelector(state => state.orders.orders);
  if (!orders) return null; // only render once redux is loaded

  const filteredOrders = orders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const indexOfLastItem = currentPage * itemsPerPage; // pagination
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // pagination
  const ordersData = filteredOrders
  .slice(indexOfFirstItem, indexOfLastItem)
  .map(order => ({
    id: "order",
    cardId: order._id,
    orderNumber: order.orderNumber,
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
    <FilterSort results={filteredOrders.length} setSearchTerm={setSearchTerm} currentPage={currentPage} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage}/>
    <div className="display-admin-orders">
    {ordersData.map(item => (
      <OrderCustomerCard 
      key={item.id}
      item={item}
      />
    ))
    }
    </div>
    <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredOrders.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
    </div>
    </div>
    </>
  )
}
