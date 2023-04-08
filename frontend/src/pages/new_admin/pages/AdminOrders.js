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
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [filter, setFilter] = useState(null);

  const handleSort = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // pagination
  const [itemsPerPage, setItemsPerPage] = useState(10); // pagination
  const orders = useSelector(state => state.orders.orders);
  if (!orders) return null; // only render once redux is loaded

  const isOrderMatchingFilter = (order) => {
    if (!filter) {
      return true;
    }
  
    switch (filter) {
      case 'statusPaid':
        return order.transaction.status === 'PAYMENT.CAPTURE.COMPLETED';
      case 'statusPending':
        return order.transaction.status === 'Pending';
      case 'statusCancelled':
        return false;
      case 'paymentPaid':
        return order.transaction.status === 'PAYMENT.CAPTURE.COMPLETED';
      case 'paymentPending':
        return order.transaction.status === 'Pending';
      case 'delivered':
        return order.deliveryStatus === 'Delivered';
      case 'shipped':
        return order.deliveryStatus === 'Shipped';
      case 'notShipped':
        return order.deliveryStatus === 'Not Shipped';
      default:
        return true;
    }
  };

  const filteredOrders = orders.filter(order => 
    (order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase()) ) && isOrderMatchingFilter(order)
    );

    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (!sortField) return 0;
      const aValue = sortField.split('.').reduce((obj, key) => obj && obj[key], a);
      const bValue = sortField.split('.').reduce((obj, key) => obj && obj[key], b);
      if (typeof aValue === "string") {
        if (sortDirection === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      } else {
        if (sortDirection === "asc") {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      }
    });

  const indexOfLastItem = currentPage * itemsPerPage; // pagination
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // pagination
  const ordersData = sortedOrders
  .slice(indexOfFirstItem, indexOfLastItem)
  .map(order => ({
    id: "order",
    cardId: order._id,
    orderNumber: order.orderNumber,
    dateCreated: order.createdAt,
    var1: order.email,
    var2: mapStatusToFriendlyStatus(order.transaction.status),
    var3: order.total,
    var4: order.deliveryStatus,
    var5: mapStatusToFriendlyStatus(order.transaction.status)
  }));

  function mapStatusToFriendlyStatus(status) {
    if (status === 'PAYMENT.CAPTURE.COMPLETED') {
      return 'Paid';
    }
    return status;
  }
  
  return (
    <>
    <div className='admin-side-bar-main-content-container'>
    <SideBar/>
    <div className="admin-main-content">
    <AdminHeader/>
    <FilterSort results={filteredOrders.length} setSearchTerm={setSearchTerm} currentPage={currentPage} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} onSort={handleSort} setFilter={setFilter} filter={filter}/>
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
