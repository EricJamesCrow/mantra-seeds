import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//redux
import { useSelector } from 'react-redux'

// styles
import './OrderHistory.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faSearch } from '@fortawesome/free-solid-svg-icons'

// components
import Order from './components/Order'
import Pagination from '../../../components/Pagination'

// chakra ui
import { Select } from '@chakra-ui/react'

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

    let results = filteredOrders.length;

    const handleSelect = (e) => {
      setItemsPerPage(e.target.value)
    }
  
    const indexOfLastItem = currentPage * itemsPerPage; // pagination
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // pagination
    const ordersData = filteredOrders
    .slice(indexOfFirstItem, indexOfLastItem)
    .map(order => ({
      id: order._id,
      orderNumber: order.orderNumber,
      dateCreated: order.createdAt,
      orderTotal: order.total,
      paymentStatus: "pending",
      deliveryStatus: "Not Shipped",
      var4: "false",
      var5: "Pending"
    }));
    
  return (
        <div className="order-history-wrapper">
            <div>
            <h1>Order History</h1>
            <form>
          <div className="filter-sort-search-container">
            <FontAwesomeIcon 
              icon={faSearch} 
              style={{
                  color: "#36454F",
                  fontSize: "1.3rem"
                }}
              />
            <input type="text" 
            id="searchInput" 
            placeholder={`Search Orders`} 
            class="filter-sort-search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
        </div>
            <div className="admin-page-results-container">
              <div>{results === 0 ? `0 - ${results} of ${results} Results` :
                  `${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, results)} of ${results} Results`}</div>
              <div>
                <div>Results per Page:</div>
                <Select size='xs' onChange={handleSelect}>
                  <option value='10'>10</option>
                  <option value='20'>20</option>
                  <option value='30'>30</option>
                  <option value='40'>40</option>
                </Select>
              </div>
            </div>
            <div className="customer-orders-wrapper">
            {ordersData.map(order => (
            <Order
            key={order}
            id={order.id}
            orderNumber={order.orderNumber}
            date={order.dateCreated}
            orderTotal={order.orderTotal}
            paymentStatus={order.paymentStatus}
            deliveryStatus={order.deliveryStatus}
            />
              ))
              }
          </div>
    <div className="pagination-container">
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
