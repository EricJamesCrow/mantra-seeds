import React from 'react'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

// components
import FilterSortBtn from './FilterSortBtn'

// styles
import './MobileFilter.css'

export default function MobileFilter( { handleClose, activeDropdown, setActiveDropdown, setFilter, filter, setClickedArrowId, onSort, page } ) {
    const desktopOrdersData = [
        { id: 1, title: 'Payment Status'},
        { id: 2, title: 'Delivery Status'},
        { id: 3, title: 'Status'},
      ]
      const desktopCustomersData = [
        { id: 1, title: 'Status'},
      ]
      const desktopProductsData = [
        { id: 1, title: 'Status'},
      ]

     const data = page === "orders" ? desktopOrdersData : page === "customers" ? desktopCustomersData : desktopProductsData

     const handleClear = () => {
        setFilter(null);
        setClickedArrowId(null);
        setActiveDropdown(null);
        onSort(null);
     }

      
  return (
    <div className="add-product-container mobile-filter-sort">
    <div className="admin-container-add-product">
    <div>
        <div>Filter</div>
        <FontAwesomeIcon 
            icon={faX} 
            style={{
                color: "#000000",
                fontSize: "1.6rem",
                cursor: "pointer"}}
            onClick={handleClose}
            />
        </div>
        <div>
    <span></span>
    </div>
</div>
<div className="mobile-filter-sort-data-container">
    {data.map(item => (
        <FilterSortBtn
        item={item}
        page={page}
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
<div className="mobile-filter-sort-clear-wrapper">
    <button className="new-admin-filter-sort-btn desktop" onClick={handleClear}>Clear</button>
</div>
</div>
  )
}
