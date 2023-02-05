import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

// styles
import './SideNav.css'

export default function SideNav() {
    const user = useSelector(state => state.auth.user);

    const toggleOpen = () => {
        document.querySelector('.main-content').classList.toggle('push');
        document.querySelector('.side-nav').classList.toggle('open')
    };

  return (
    <div className={`side-nav`}>
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
    <form>
  <input type="text" id="searchInput" placeholder="Search" class="search-input"/>
    </form>
    <ul className='side-nav-links'>
        {user && user.role === 1 &&
    <li>
    <NavLink to="/admin" onClick={toggleOpen}>Admin Dashboard</NavLink>
    </li>
        }
        <li>
    <NavLink to="/shop" onClick={toggleOpen}>Shop Products</NavLink>
    </li>
    <li>
    <NavLink to="/cart" onClick={toggleOpen}>View Cart</NavLink>
    </li>
    <li>
    <NavLink to="/contact" onClick={toggleOpen}>Contact Us</NavLink>
    </li>
    </ul>
  </div>
  )
}
