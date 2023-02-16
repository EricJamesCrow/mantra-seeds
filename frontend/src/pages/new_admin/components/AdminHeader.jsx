import React from 'react'
import { useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons'

// styles
import './AdminHeader.css'

export default function AdminHeader() {
    const desktop = useMediaQuery('(min-width:980px)');
    const location = useLocation();
    
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
            <div className="admin-filter-sort-btn-container admin-header">
            <button className="admin-filter-sort-btn desktop admin-header">
            <div style={{ paddingRight: "8px" }}>EXPORT</div>
          <FontAwesomeIcon 
                  icon={faChevronDown}
                  style={{
                      color: "#000000",
                      fontSize: "1.3rem",
                      cursor: "pointer"}}
                  />
          </button>
          {headerText === 'Products' &&
          <button className="admin-filter-sort-btn desktop admin-header">
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
          </div>
            <div>
        <span></span>
        </div>
    </div>
    {desktop && <div className="admin-header-desktop-span"><span></span></div>}
    </>
  )
}
