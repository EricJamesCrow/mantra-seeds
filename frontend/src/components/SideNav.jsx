import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

// styles
import './SideNav.css'

export default function SideNav() {
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
  
    const handleSearch = (e) => {
      e.preventDefault();
      if (search) {
        navigate(`/search/${search}`);
        setSearch("");
        toggleOpen();
      }
    }
  

    const toggleOpen = () => {
        document.querySelector('.main-content').classList.toggle('push');
        document.querySelector('.side-nav').classList.toggle('open')
    };

  return (
    <div className={`side-nav`}>
    <FontAwesomeIcon
    onClick={toggleOpen}
    aria-label="Close Side Nav"
    icon={faXmark} 
    style={{
    color: "#000000",
    fontSize: "1.4rem",
    float: "right",
    marginTop: "1rem",
    marginRight: "1.5rem",
    cursor: "pointer"}}/>
    <form onSubmit={handleSearch}>
  <input 
  onChange={(e) => {
    setSearch(e.target.value)
    }}
  type="text" 
  id="searchInput" 
  aria-label="Search"
  placeholder="Search"
  value={search} 
  className="search-input"/>
    </form>
    <ul className='side-nav-links'>
        {user && user.role === 1 &&
    <li>
    <NavLink to="/admin/dashboard" onClick={toggleOpen} aria-label="Admin Dashboard">Admin Dashboard</NavLink>
    </li>
        }
    {!user && <li>
    <NavLink to="/login" onClick={toggleOpen} aria-label="Log In">Log In</NavLink>
    </li>}
    {!user && <li>
    <NavLink to="/signup" onClick={toggleOpen} aria-label="Sign Up">Sign Up</NavLink>
    </li>}
    <li>
    <NavLink to="/shop" onClick={toggleOpen} aria-label="Shop Products">Shop Products</NavLink>
    </li>
    <li>
    <NavLink to="/cart" onClick={toggleOpen} aria-label="View Cart">View Cart</NavLink>
    </li>
    <li>
    <NavLink to="/contact" onClick={toggleOpen} aria-label="Contact Us">Contact Us</NavLink>
    </li>
    </ul>
  </div>
  )
}
