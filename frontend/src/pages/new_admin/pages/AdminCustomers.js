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
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const handleSort = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
  };
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // pagination
  const [itemsPerPage, setItemsPerPage] = useState(10); // pagination
  const customers = useSelector(state => state.customers.customers);
  if (!customers) return null; // only render once redux is loaded

  const filteredCustomers = customers
  .filter(customer => customer.email.toLowerCase().includes(searchTerm.toLowerCase()))

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
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

  function isActive(lastLoggedIn) {
    const lastLoggedInDate = new Date(lastLoggedIn);
    const currentDate = new Date();
    const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000; // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  
    return (currentDate - lastLoggedInDate) <= oneMonthInMilliseconds;
  }
  
  
  const indexOfLastItem = currentPage * itemsPerPage; // pagination
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // pagination

  const customersData = sortedCustomers
  .slice(indexOfFirstItem, indexOfLastItem)
  .map(customer => ({
    id: "customer",
    cardId: customer._id,
    dateCreated: customer.createdAt,
    var1: customer.email,
    var2: isActive(customer.lastLoggedIn) ? 'Active' : 'Inactive',
    var3: customer.orderCount,
    var4: `$${(customer.totalSpent / 100).toFixed(2)}`,
    var5: customer.mostRecentOrder
  }));

  return (
    <>
    <div className='admin-side-bar-main-content-container'>
    <SideBar/>
    <div className="admin-main-content">
    <AdminHeader/>
    <FilterSort results={filteredCustomers.length} setSearchTerm={setSearchTerm} currentPage={currentPage} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} onSort={handleSort}/>
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
