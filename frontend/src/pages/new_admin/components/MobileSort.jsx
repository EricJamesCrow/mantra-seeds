import React from 'react'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

// components
import FilterSortHeaders from './FilterSortHeaders'

export default function MobileSort( { handleClose, onSort, clickedArrowId, setClickedArrowId, page } ) {
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

const data = page === "orders" ? ordersHeaders : page === "customers" ? customersHeaders : productsHeaders
  
  const handleClear = () => {
    setClickedArrowId(null);
    onSort(null);
  }

  return (
    <div className="add-product-container mobile-filter-sort">
    <div className="admin-container-add-product">
    <div>
        <div>Sort</div>
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
<div className="mobile-sort-data-container admin-desktop-sort">
{data.map(header => (
  <div className="filter-sort-header"> 
        <FilterSortHeaders
          header={header}
          onSort={onSort}
          clickedArrowId={clickedArrowId}
          setClickedArrowId={setClickedArrowId}
        />
          </div>))
      }            
</div>
<div className="mobile-filter-sort-clear-wrapper">
    <button className="new-admin-filter-sort-btn desktop" onClick={handleClear}>Clear</button>
</div>
</div>
  )
}
