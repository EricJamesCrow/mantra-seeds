import React, { useEffect, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from 'react-router-dom';

// styles
import './FilterSort.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSort, faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons'

// chakra ui
import { Select } from '@chakra-ui/react'

// components
import FilterSortBtn from './FilterSortBtn'
import FilterSortHeaders from './FilterSortHeaders'
import MobileFilter from './MobileFilter'
import MobileSort from './MobileSort'

export default function FilterSort( { results, setSearchTerm, currentPage, itemsPerPage, setItemsPerPage, onSort, setFilter, filter }) {
    const desktop = useMediaQuery('(min-width:980px)');
    const [clickedArrowId, setClickedArrowId] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [showMobileFilter, setShowMobileFilter ] = useState(false);
    const [showMobileSort, setShowMobileSort ] = useState(false);


    let customers = false;
    let orders = false;
    let products = false;

    const location = useLocation();

    const handleMobileFilter = () => {
      setShowMobileFilter(!showMobileFilter)
    }

    const handleMobileSort = () => {
      setShowMobileSort(!showMobileSort)
    }

    useEffect(() => {
      if (showMobileFilter || showMobileSort) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }, [showMobileFilter, showMobileSort])

    useEffect(() => {
      setShowMobileFilter(false)
      setShowMobileSort(false)
    }, [onSort, clickedArrowId])

    const buttonData = [
        { id: 1, title: 'Filter', icon: faFilter, function: handleMobileFilter },
        { id: 2, title: 'Sort', icon: faSort, function: handleMobileSort },
      ]
    const desktopOrdersData = [
      { id: 1, title: 'Payment Status'},
      { id: 2, title: 'Delivery Status'},
      { id: 3, title: 'Status'},
      { id: 4, title: 'More Filters'}
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
      setItemsPerPage(e.target.value);
    }
    
  return (
    <>
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
        <button className="admin-filter-sort-btn" onClick={item.function}>
        <div>{item.title}</div>
        <FontAwesomeIcon 
                icon={faChevronDown} 
                style={{
                    color: "#000000",
                    fontSize: "1.3rem",
                    cursor: "pointer",
                    paddingLeft: "1rem"}}
                />
        </button>
    ))}
    {desktop && orders && desktopOrdersData.map(item => (
      <FilterSortBtn
      item={item}
      page="orders"
      activeDropdown={activeDropdown}
      setActiveDropdown={setActiveDropdown}
      setFilter={setFilter}
      filter={filter}
      setClickedArrowId={setClickedArrowId}
      onSort={onSort}
      />
    ))
    }
    {desktop && customers && desktopCustomersData.map(item => (
      <FilterSortBtn
      item={item}
      page="customers"
      activeDropdown={activeDropdown}
      setActiveDropdown={setActiveDropdown}
      setFilter={setFilter}
      filter={filter}
      setClickedArrowId={setClickedArrowId}
      onSort={onSort}
      />
    ))
    }
    {desktop && products && desktopProductsData.map(item => (
      <FilterSortBtn
      item={item}
      page="products"
      activeDropdown={activeDropdown}
      setActiveDropdown={setActiveDropdown}
      setFilter={setFilter}
      filter={filter}
      setClickedArrowId={setClickedArrowId}
      onSort={onSort}
      />
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
      <FilterSortHeaders
        header={header}
        onSort={onSort}
        clickedArrowId={clickedArrowId}
        setClickedArrowId={setClickedArrowId}
        />))
      }
      {orders && ordersHeaders.map(header => ( 
        <FilterSortHeaders
          header={header}
          onSort={onSort}
          clickedArrowId={clickedArrowId}
          setClickedArrowId={setClickedArrowId}
        />))
      }
      {products && productsHeaders.map(header => ( 
        <FilterSortHeaders
          header={header}
          onSort={onSort}
          clickedArrowId={clickedArrowId}
          setClickedArrowId={setClickedArrowId}
        />))
      }
    </div>
    </div>
    {!desktop && showMobileFilter && <div className="mobile-filter-sort-container">
      <MobileFilter 
      handleClose={handleMobileFilter}
      activeDropdown={activeDropdown}
      setActiveDropdown={setActiveDropdown}
      setFilter={setFilter}
      filter={filter}
      setClickedArrowId={setClickedArrowId}
      onSort={onSort}
      page={customers ? 'customers' : orders ? 'orders' : products ? 'products' : null}
      />
      </div>}
    {!desktop && showMobileSort && <div className="mobile-filter-sort-container">
      <MobileSort handleClose={handleMobileSort}/>
      </div>}
    </>
  )
}
