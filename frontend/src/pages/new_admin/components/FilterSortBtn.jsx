import React, { useState } from 'react'

// styles
import './FilterSortBtn.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

export default function FilterSortBtn( { item, page } ) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

  return (
    <div className="filter-sort-btn-container">
        <button className="new-admin-filter-sort-btn desktop" onClick={toggleDropdown}>
        <div>{item.title}</div>
        <FontAwesomeIcon 
                icon={isOpen ? faChevronUp : faChevronDown} 
                style={{
                    color: "#000000",
                    fontSize: "1.3rem",
                    cursor: "pointer",
                    paddingLeft: "1rem"}}
                />
        </button>
        {isOpen && page === "customers" && item.title === "Status" &&
        <div className="admin-filter-sort-btn-dropdown">
            <div className="drop-down-payment-status-container">
                <button className='order-customer-card-btn paid'>Active</button>
            </div>
            <div className="drop-down-payment-status-container">
                <button className='order-customer-card-btn inactive'>Inactive</button>
            </div>
        </div>}
        {isOpen && page === "orders" && item.title === "Payment Status" &&
        <div className="admin-filter-sort-btn-dropdown">
            <div className="drop-down-payment-status-container">
                <div className='circle paid'></div>
                <div>Paid</div>
            </div>
            <div className="drop-down-payment-status-container">
                <div className='circle pending'></div>
                <div>Pending</div>
            </div>
        </div>}
        {isOpen && page === "orders" && item.title === "Delivery Status" &&
        <div className="admin-filter-sort-btn-dropdown">
            <div className="drop-down-payment-status-container">
                <div className='circle paid'></div>
                <div>Delivered</div>
            </div>
            <div className="drop-down-payment-status-container">
                <div className='circle pending'></div>
                <div>Shipped</div>
            </div>
            <div className="drop-down-payment-status-container">
                <div className='circle false'></div>
                <div>Not Shipped</div>
            </div>
        </div>}
        {isOpen && page === "orders" && item.title === "Status" &&
        <div className="admin-filter-sort-btn-dropdown">
            <div className="drop-down-payment-status-container">
                <button className='order-customer-card-btn paid'>Paid</button>
            </div>
            <div className="drop-down-payment-status-container">
                <button className='order-customer-card-btn pending'>Pending</button>
            </div>
            <div className="drop-down-payment-status-container">
                <button className='order-customer-card-btn inactive'>Canceled</button>
            </div>
        </div>}
        {isOpen && page === "products" && item.title === "Status" &&
        <div className="admin-filter-sort-btn-dropdown">
            <div className="drop-down-payment-status-container">
                <button className='order-customer-card-btn paid'>In Stock</button>
            </div>
            <div className="drop-down-payment-status-container">
                <button className='order-customer-card-btn inactive'>Out of Stock</button>
            </div>
        </div>}
    </div>  
  )
}
