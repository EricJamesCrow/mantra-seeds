import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//redux
import { useSelector } from 'react-redux'

// styles
import './OrderHistory.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

// components
// import Order from './components/Order'
import OrderCustomerCard from '../../new_admin/components/OrderCustomerCard'
import Pagination from '../../../components/Pagination'

export default function OrderHistory() {
    const navigate = useNavigate();
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
    <div className="login-container admin-orders-details-page-container">
        <button className="details-page-btn" onClick={() => navigate(-1)}>
        <FontAwesomeIcon 
            icon={faChevronLeft} 
            style={{
                color: "#BCBDBC",
                fontSize: "1.15rem",
                cursor: "pointer"}}
            />
        </button>
        <div className="order-history-wrapper">
            <h1>Order History</h1>
            {ordersData.map(item => (
      <OrderCustomerCard 
      key={item.id}
      item={item}
      />
    ))
    }
            <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredOrders.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
    </div>
  )
}
