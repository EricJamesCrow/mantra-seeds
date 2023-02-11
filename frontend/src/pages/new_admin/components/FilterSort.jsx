import React from 'react'
import { useLocation } from 'react-router-dom';

// styles
import './FilterSort.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSort, faSearch } from '@fortawesome/free-solid-svg-icons'

export default function FilterSort( { results }) {
    const location = useLocation();
    const buttonData = [
        { id: 1, title: 'Filter', icon: faFilter },
        { id: 2, title: 'Sort', icon: faSort }
      ]

    let searchText = '';
    if (location.pathname === '/admin/orders') {
      searchText = 'Orders';
      } else if (location.pathname === '/admin/customers') {
        searchText = 'Customers';
      } else if (location.pathname === '/admin/products') {
        searchText = 'Products';
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
    <input type="search" id="searchInput" placeholder={`Search ${searchText}`} class="filter-sort-search-input"/>
    </div>
    </form>
    <div className="admin-filter-sort-btn-container">
    {buttonData.map(item => (
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
    </div>
    </div>
    <div className="admin-page-results-container">
      <div>{`1 - ${results} of ${results} Results`}</div>
      <div>Results per Page: </div>
    </div>
    </div>
  )
}
