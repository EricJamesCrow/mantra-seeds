import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

// styles
import './AdminNav.css'

export default function AdminNav() {
    const toggleOpen = () => {
        document.querySelector('.main-content').classList.toggle('open');
        document.querySelector('.admin-nav').classList.toggle('open')
    };

  return (
    <div className='admin-nav'>
    <FontAwesomeIcon
    onClick={toggleOpen}
    icon={faXmark} 
    style={{
    color: "#000000",
    fontSize: "1.4rem",
    float: "right",
    marginTop: "1rem",
    marginRight: "1.5rem",
    cursor: "pointer"}}/>
    <div>
    <div>MantraSeeds</div>
    <div>ADMIN</div>
    </div>
    <ul className='side-nav-links'>
        <li>
    <NavLink to="/admin/dashboard" onClick={toggleOpen}>View Dashboard</NavLink>
    </li>
    <li>
    <NavLink to="/admin/orders" onClick={toggleOpen}>Orders</NavLink>
    </li>
    <li>
    <NavLink to="/admin/customers" onClick={toggleOpen}>Customers</NavLink>
    </li>
    <li>
    <NavLink to="/admin/products" onClick={toggleOpen}>Products</NavLink>
    </li>
    </ul>
  </div>
  )
}
