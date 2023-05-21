// react
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';

// styles
import "./Navbar.css"

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons'

// components
import SearchModel from "./SearchModel"

export default function Navbar() {
    const location = useLocation()

    const [searchModelOpen, setSearchModelOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const user = useSelector(state => state.auth.user);

    const displayMobileMenu = () => {
        document.querySelector('.side-nav').classList.toggle('open')
        document.querySelector('.main-content').classList.toggle('push');
    }

    const showSearch = () => {
        setSearchModelOpen(true)
    }

    useEffect(() => {
        if (searchModelOpen) {
          setTimeout(() => {
            // timeout allows css transition to still display for SearchModel
            document.querySelector(".search-model").classList.toggle("open");
          }, 0);
        }
      }, [searchModelOpen]);

    const hideSearch = () => {
        setSearchModelOpen(false)
    };

    useEffect(() => {
        function handleScroll() {
          setIsScrolled(window.pageYOffset > 0);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

  return (
    <>
    {searchModelOpen && <SearchModel hideSearch={hideSearch}/>}
    <nav className='sticky-nav'>
    <div className={location.pathname === "/" && isScrolled ? 'navbar-container background' : location.pathname === "/" && !isScrolled ? 'navbar-container' : 'navbar-container background'}>
        <div className="logo-container">
        <Link to="/" className="title" aria-label="Home" onClick={hideSearch}>MANTRA SEEDS</Link>
        </div>
        <button href="#" className="toggle-button" aria-label="Main Menu" onClick={displayMobileMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </button>
        <div className="navbar-links">
            <ul>
            <li>
                <NavLink to="/" aria-label="Home" onClick={hideSearch}>Home</NavLink>
            </li>
            {user && user.role === 1 &&
            <li>
            <NavLink to="/admin/dashboard" aria-label="Admin" onClick={hideSearch}>Admin</NavLink>
            </li>
            }
            <li>
                <NavLink to="/shop" aria-label="Shop" onClick={hideSearch}>Shop</NavLink>
            </li>
            <li>
                <NavLink to="/contact" aria-label="Contact" onClick={hideSearch}>Contact</NavLink>
            </li>
            <li>
            <FontAwesomeIcon 
            icon={faSearch} 
            aria-label="Search" 
            style={{
                fontSize: "1.6rem",
                padding: "15px 20px",
                cursor: "pointer"}}
            onClick={showSearch}
            />
            </li>
            <li>
                <NavLink to="/profile" aria-label="Profile" onClick={hideSearch}> 
                <FontAwesomeIcon 
            icon={faUser} 
            style={{
                fontSize: "1.6rem",
                padding: "15px 20px",
                cursor: "pointer"}}/>
                </NavLink>
                </li>
            <li>
                <NavLink to="/cart" aria-label="Cart" onClick={hideSearch}>
                <FontAwesomeIcon 
            icon={faCartShopping} 
            style={{
                fontSize: "1.6rem",
                padding: "15px 20px",
                cursor: "pointer"}}/>
                </NavLink>
                </li>
            </ul>
        </div>
    </div>
    </nav>
    </>
  )
}


