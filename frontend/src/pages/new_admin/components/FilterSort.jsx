import React, { useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from 'react-router-dom';

// styles
import './FilterSort.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSort, faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons'

// chakra ui icons
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'

// chakra ui
import { Select } from '@chakra-ui/react'

export default function FilterSort( { results, setSearchTerm, currentPage, itemsPerPage, setItemsPerPage, onSort }) {
    const desktop = useMediaQuery('(min-width:980px)');
    const [clickedArrowId, setClickedArrowId] = useState(null);

    let customers = false;
    let orders = false;
    let products = false;

    const location = useLocation();
    const buttonData = [
        { id: 1, title: 'Filter', icon: faFilter },
        { id: 2, title: 'Sort', icon: faSort }
      ]
    const desktopOrdersData = [
      { id: 1, title: 'Payment Status'},
      { id: 2, title: 'Delivery Status'},
      { id: 3, title: 'Status'},
      { id: 4, title: 'More Filters'},
    ]
    const desktopCustomersData = [
      { id: 1, title: 'Status'},
      { id: 2, title: 'More Filters'}
    ]
    const desktopProductsData = [
      { id: 1, title: 'Status'},
      { id: 2, title: 'More Filters'}
    ]


    const customersHeaders = [
        { id: 1, name: 'REF.', field: '_id'},
        { id: 2, name: 'CREATED', field: 'createdAt'},
        { id: 3, name: 'EMAIL', field: 'email'},
        { id: 4, name: 'RECENT ORDER', field: 'mostRecentOrder'},
        { id: 5, name: 'TOTAL ORDERS', field: 'orderCount'},
        { id: 6, name: 'TOTAL SPENT', field: 'totalSpent'},
        { id: 7, name: 'STATUS', field: 'lastLoggedIn'},
      ]
    
    const ordersHeaders = [
      { id: 1, name: 'REF.', field: '_id'},
      { id: 2, name: 'CREATED', field: 'createdAt'},
      { id: 3, name: 'CUSTOMER', field: 'email'},
      { id: 4, name: 'PAYMENT STATUS', field: 'transaction.status'},
      { id: 5, name: 'ORDER TOTAL', field: 'total'},
      { id: 6, name: 'DELIVERY STATUS', field: 'deliveryStatus'},
      { id: 7, name: 'STATUS', field: 'transaction.status'},
    ]

    const productsHeaders = [
      { id: 1, name: 'REF.', field: '_id'},
      { id: 2, name: 'CREATED', field: 'createdAt'},
      { id: 3, name: 'NAME', field: 'name'},
      { id: 4, name: 'PRICE', field: 'price'},
      { id: 5, name: 'QUANTITY', field: 'quantity'},
      { id: 6, name: 'PRODUCT IMAGE', field: 'image'},
      { id: 7, name: 'STATUS', field: 'quantity'},
    ]

    let searchText = '';
    if (location.pathname === '/admin/orders') {
      searchText = 'Orders';
      orders = true
      } else if (location.pathname === '/admin/customers') {
        searchText = 'Customers';
        customers = true
      } else if (location.pathname === '/admin/products') {
        searchText = 'Products';
        products = true
      }

    const handleSelect = (e) => {
      setItemsPerPage(e.target.value)
    }
    
  return (
    <div className="admin-filter-sort-component-container">
      <div className="search-and-buttons-container">
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
    placeholder={`Search ${searchText}`} 
    class="filter-sort-search-input"
    onChange={(e) => setSearchTerm(e.target.value)}
    />
    </div>
    </form>
    <div className="admin-filter-sort-btn-container">
    {!desktop && buttonData.map(item => (
          <button className="admin-filter-sort-btn">
          <FontAwesomeIcon 
                  key={item.id}
                  icon={item.icon} 
                  style={{
                      color: "#000000",
                      fontSize: "1.3rem",
                      cursor: "pointer"}}
                  />
          <div>{item.title}</div>
          </button>
    ))}
    {desktop && orders && desktopOrdersData.map(item => (
      <button className="admin-filter-sort-btn desktop">
      <div>{item.title}</div>
      <FontAwesomeIcon 
              key={item.id}
              icon={faChevronDown} 
              style={{
                  color: "#000000",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  paddingLeft: "1rem"}}
              />
      </button>
    ))
    }
    {desktop && customers && desktopCustomersData.map(item => (
      <button className="admin-filter-sort-btn desktop">
      <div>{item.title}</div>
      <FontAwesomeIcon 
              key={item.id}
              icon={faChevronDown} 
              style={{
                  color: "#000000",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  paddingLeft: "1rem"}}
              />
      </button>
    ))
    }
    {desktop && products && desktopProductsData.map(item => (
      <button className="admin-filter-sort-btn desktop">
      <div>{item.title}</div>
      <FontAwesomeIcon 
              key={item.id}
              icon={faChevronDown} 
              style={{
                  color: "#000000",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  paddingLeft: "1rem"}}
              />
      </button>
    ))
    }
    </div>
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

    <div className="admin-desktop-sort">
    {customers && customersHeaders.map(header => ( 
      <div key={header.id}>
      <div>{header.name}</div>
      <div className="sort-icons-container-headers">
        <ChevronUpIcon
          onClick={() => {
            setClickedArrowId(`${header.id}-up`);
            onSort(header.field, "asc");
          }}
        color={clickedArrowId === `${header.id}-up` ? "#36454F" : "#ccc"}
        cursor="pointer"
        _hover={{
          color: "#2C2C2C",
        }}
        />
        <ChevronDownIcon
          onClick={() => {
            setClickedArrowId(`${header.id}-down`);
            onSort(header.field, "desc");
          }}
        color={clickedArrowId === `${header.id}-down` ? "#36454F" : "#ccc"}
        cursor="pointer"
        _hover={{
          color: "#2C2C2C",
        }}
        />
      </div>
      </div>))
      }
      {orders && ordersHeaders.map(header => ( 
      <div key={header.id}>
      <div>{header.name}</div>
      <div className="sort-icons-container-headers">
        <ChevronUpIcon
          onClick={() => {
            setClickedArrowId(`${header.id}-up`);
            onSort(header.field, "asc");
          }}
        color={clickedArrowId === `${header.id}-up` ? "#36454F" : "#ccc"}
        cursor="pointer"
        _hover={{
          color: "#2C2C2C",
        }}
        />
        <ChevronDownIcon
          onClick={() => {
            setClickedArrowId(`${header.id}-down`);
            onSort(header.field, "desc");
          }}
        color={clickedArrowId === `${header.id}-down` ? "#36454F" : "#ccc"}
        cursor="pointer"
        _hover={{
          color: "#2C2C2C",
        }}
        />
      </div>
      </div>))
      }
      {products && productsHeaders.map(header => ( 
      <div key={header.id}>
      <div>{header.name}</div>
      <div className="sort-icons-container-headers">
        <ChevronUpIcon
          onClick={() => {
            setClickedArrowId(`${header.id}-up`);
            onSort(header.field, "asc");
          }}
        color={clickedArrowId === `${header.id}-up` ? "#36454F" : "#ccc"}
        cursor="pointer"
        _hover={{
          color: "#2C2C2C",
        }}
        />
        <ChevronDownIcon
          onClick={() => {
            setClickedArrowId(`${header.id}-down`);
            onSort(header.field, "desc");
          }}
        color={clickedArrowId === `${header.id}-down` ? "#36454F" : "#ccc"}
        cursor="pointer"
        _hover={{
          color: "#2C2C2C",
        }}
        />
      </div>

      </div>))
      }
    </div>
    </div>
  )
}
