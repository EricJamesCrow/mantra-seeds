import React from 'react'

// styles
import './FilterSortBtn.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

export default function FilterSortBtn( { item, page, activeDropdown, setActiveDropdown, filter, setFilter, setClickedArrowId, onSort } ) {
    const isOpen = activeDropdown === item.id;

    const toggleDropdown = () => {
        if (isOpen) {
          setActiveDropdown(null);
        } else {
          setActiveDropdown(item.id);
        }
      };

    const handleClick = (filter) => {
        if (filter === 'clearFilters') {
            setFilter(null);
            setClickedArrowId(null);
            setActiveDropdown(null);
            onSort(null);
            return;
        }
        setFilter(filter);
        setActiveDropdown(null);
    }

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
        {isOpen && item.title === "More Filters" &&
        <div className="admin-filter-sort-btn-dropdown">
            <div className="drop-down-payment-status-container" onClick={() => handleClick('clearFilters')}>
                <button className='order-customer-card-btn'>Clear Filters</button>
            </div>
            </div>}
        {isOpen && page === "customers" && item.title === "Status" &&
        <div className="admin-filter-sort-btn-dropdown">
            <div className={filter === 'active' ? "drop-down-payment-status-container selected" : "drop-down-payment-status-container"} onClick={() => handleClick('active')}>
                <button className='order-customer-card-btn paid'>Active</button>
            </div>
            <div className={filter === 'inactive' ? "drop-down-payment-status-container selected" : "drop-down-payment-status-container"} onClick={() => handleClick('inactive')}>
                <button className='order-customer-card-btn inactive'>Inactive</button>
            </div>
        </div>}
        {isOpen && page === "orders" && item.title === "Payment Status" &&
        <div className="admin-filter-sort-btn-dropdown">
            <div className={filter === 'paymentPaid' ? "drop-down-payment-status-container selected" : "drop-down-payment-status-container"} onClick={() => handleClick('paymentPaid')}>
                <div className='circle paid'></div>
                <div>Paid</div>
            </div>
            <div className={filter === 'paymentPending' ? "drop-down-payment-status-container selected" : "drop-down-payment-status-container"} onClick={() => handleClick('paymentPending')}>
                <div className='circle pending'></div>
                <div>Pending</div>
            </div>
        </div>}
        {isOpen && page === "orders" && item.title === "Delivery Status" &&
        <div className="admin-filter-sort-btn-dropdown">
            <div className={filter === 'delivered' ? "drop-down-payment-status-container selected" : "drop-down-payment-status-container"} onClick={() => handleClick('delivered')}>
                <div className='circle paid'></div>
                <div>Delivered</div>
            </div>
            <div className={filter === 'shipped' ? "drop-down-payment-status-container selected" : "drop-down-payment-status-container"} onClick={() => handleClick('shipped')}>
                <div className='circle pending'></div>
                <div>Shipped</div>
            </div>
            <div className={filter === 'notShipped' ? "drop-down-payment-status-container selected" : "drop-down-payment-status-container"} onClick={() => handleClick('notShipped')}>
                <div className='circle false'></div>
                <div>Not Shipped</div>
            </div>
        </div>}
        {isOpen && page === "orders" && item.title === "Status" &&
        <div className="admin-filter-sort-btn-dropdown">
            <div className={filter === 'statusPaid' ? "drop-down-payment-status-container selected" : "drop-down-payment-status-container"} onClick={() => handleClick('statusPaid')}>
                <button className='order-customer-card-btn paid'>Paid</button>
            </div>
            <div className={filter === 'statusPending' ? "drop-down-payment-status-container selected" : "drop-down-payment-status-container"} onClick={() => handleClick('statusPending')}>
                <button className='order-customer-card-btn pending'>Pending</button>
            </div>
            <div className={filter === 'statusCanceled' ? "drop-down-payment-status-container selected" : "drop-down-payment-status-container"} onClick={() => handleClick('statusCanceled')}>
                <button className='order-customer-card-btn inactive'>Canceled</button>
            </div>
        </div>}
        {isOpen && page === "products" && item.title === "Status" &&
        <div className="admin-filter-sort-btn-dropdown">
            <div className={filter === 'inStock' ? "drop-down-payment-status-container selected" : "drop-down-payment-status-container"} onClick={() => handleClick('inStock')}>
                <button className='order-customer-card-btn paid'>In Stock</button>
            </div>
            <div className={filter === 'outOfStock' ? "drop-down-payment-status-container selected" : "drop-down-payment-status-container"} onClick={() => handleClick('outOfStock')}>
                <button className='order-customer-card-btn inactive'>Out of Stock</button>
            </div>
        </div>}
    </div>  
  )
}
