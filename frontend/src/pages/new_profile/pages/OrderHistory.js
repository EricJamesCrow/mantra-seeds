import React, { useEffect, useState } from 'react'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { setOrders } from '../../../redux/slices/ordersSlice'

// styles
import './OrderHistory.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// components
import Order from './components/Order'
import Pagination from '../../../components/Pagination'

// loading
import Loading from '../../../components/loading/loading'

// chakra ui
import { Select } from '@chakra-ui/react'

const ORDERS_API_URL = '/api/orders/user'

export default function OrderHistory() {
    const user = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // pagination
    const [itemsPerPage, setItemsPerPage] = useState(10); // pagination

    const fetchOrders = async () => {
      const id = user.id
      const token = user.token;
      const headers = {
          'Authorization': token,
      };
      const response = await fetch(`${ORDERS_API_URL}/${id}`, { headers });
      const json = await response.json();
      if (response.ok) {
          dispatch(setOrders(json));
      }
  };
  
    useEffect(() => {
      fetchOrders()
    }, [])

    const orders = useSelector(state => state.orders.orders);
    if (!orders) return <Loading/>; // only render once redux is loaded
  
    const filteredOrders = orders.filter(order => 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

    let results = filteredOrders.length;

    const handleSelect = (e) => {
      setItemsPerPage(e.target.value)
    }

    function mapStatusToFriendlyStatus(status) {
      if (status === 'PAYMENT.CAPTURE.COMPLETED') {
        return 'Paid';
      }
      return status;
    }

    function toTitleCase(str) {
      return str.toLowerCase().split(' ').map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
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
      paymentStatus: mapStatusToFriendlyStatus(order.transaction.status),
      deliveryStatus: order.deliveryStatus
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
            className="filter-sort-search-input"
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
            key={order.id}
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
