import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronDown, faChevronUp, faPlus } from '@fortawesome/free-solid-svg-icons'

// styles
import './AdminHeader.css'

export default function AdminHeader( { setShowAddProduct }) {
    const desktop = useMediaQuery('(min-width:980px)');
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    
    const handleClick = () => {
        document.querySelector('.admin-nav').classList.toggle('open')
        document.querySelector('.main-content').classList.toggle('open');
    }

    let headerText = '';
    if (location.pathname === '/admin/dashboard') {
        headerText = 'Dashboard';
      } else if (location.pathname === '/admin/orders') {
        headerText = 'Orders';
      } else if (location.pathname === '/admin/customers') {
        headerText = 'Customers';
      } else if (location.pathname === '/admin/products') {
        headerText = 'Products';
      }

    const handleCreateProduct = () => {
      setShowAddProduct(true);
    }

    const handleExportClick = () => {
      setIsOpen(!isOpen)
    }

  return (
    <>
    <div className="admin-container">
        <div>
            <FontAwesomeIcon 
            icon={faBars} 
            style={{
                color: "#000000",
                fontSize: "1.6rem",
                cursor: "pointer"}}
            onClick={handleClick}
            />
            <div>{headerText}</div>
        </div>
            {headerText !== "Dashboard" && <div className={headerText === 'Products' ? `admin-filter-sort-btn-container admin-header` : `admin-filter-sort-btn-container admin-header not-products`}>
          <div className="admin-filter-sort-btn-wrapper">
              <button className="export-btn" onClick={() => handleExportClick()}>
              <div style={{ paddingRight: "8px" }}>EXPORT</div>
            <FontAwesomeIcon 
                    icon={isOpen ? faChevronUp : faChevronDown}
                    style={{
                        color: "#000000",
                        fontSize: "1.3rem",
                        cursor: "pointer"}}
                    />
            </button>
            {isOpen &&
              <div className="admin-filter-sort-export-dropdown">
                  <div className="drop-down-export-container">
                      <button className='order-customer-card-btn'>Save as CSV</button>
                  </div>
                  </div>}
          </div>
          {headerText === 'Products' &&
          <button className="admin-filter-sort-btn desktop admin-header" onClick={handleCreateProduct}>
          <FontAwesomeIcon 
            icon={faPlus}
            style={{
                color: "#000000",
                fontSize: "1.3rem",
                cursor: "pointer"}}
            />
            <div>CREATE PRODUCT</div>
          </button>
          }
          </div>}
            <div>
        <span></span>
        </div>
    </div>
    {desktop && <div className="admin-header-desktop-span"><span></span></div>}
    </>
  )
}
