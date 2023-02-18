import React, { useState } from 'react'

// components
import AdminHeader from '../components/AdminHeader'
import FilterSort from '../components/FilterSort'
import SideBar from '../components/SideBar'
import OrderCustomerCard from '../components/OrderCustomerCard'
import Pagination from '../../../components/Pagination'

//redux
import { useSelector } from 'react-redux'

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // pagination
  const [itemsPerPage, setItemsPerPage] = useState(10); // pagination
  const customers = useSelector(state => state.customers.customers);
  if (!customers) return null; // only render once redux is loaded

  const filteredCustomers = customers
  .filter(customer => customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
  
  const indexOfLastItem = currentPage * itemsPerPage; // pagination
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // pagination

  const customersData = filteredCustomers
  .slice(indexOfFirstItem, indexOfLastItem)
  .map(customer => ({
    id: "customer",
    cardId: customer._id,
    dateCreated: customer.createdAt,
    var1: customer.email,
    var2: "active",
    var3: "6",
    var4: "$386.99",
    var5: customer.order
  }));

  return (
    <>
    <div className='admin-side-bar-main-content-container'>
    <SideBar/>
    <div className="admin-main-content">
    <AdminHeader/>
    <FilterSort results={filteredCustomers.length} setSearchTerm={setSearchTerm} currentPage={currentPage} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage}/>
    <div className="display-admin-orders">
    {customersData.map(item => (
      <OrderCustomerCard 
      key={item.id}
      item={item}
      />
    ))
    }
    </div>
    <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredCustomers.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
    </div>
    </div>
    </>
  )
}
