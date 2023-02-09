import React from 'react'
import { useLocation } from 'react-router-dom';

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

// styles
import './AdminHeader.css'

export default function AdminHeader() {
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
            <div>
        <span></span>
        </div>
    </div>
    </>
  )
}
