// react
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

// styles
import "./Navbar.css"

// images
import Cannabis from "../images/cannabis-leaf.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'

// components
import Sidebar from "./Sidebar"
import LoginModel from "./LoginModel"

export default function Navbar( { updateFilter } ) {
    const [isActive, setActive] = useState(false)
    const [showModal, setShowModal] = useState(false)
    
    const [isShopping, setIsShopping] = useState(false)
    const location = useLocation();

    const [showLogin, setShowLogin] = useState(true)

    const shopping = () => {
        if(location.pathname === "/shop") {
            setIsShopping(true)
        } else {
            setIsShopping(false)
        }
    }


    useEffect(() => {
        shopping()
    })

    const runShowModal = () => {
        setShowModal(!showModal)
    }

    const displayMobileMenu = () => {
        setActive(!isActive)
    }

  return (
    <nav className='sticky-nav'>
    <div className="navbar-container">
        <div className="logo-container">
        <img src={Cannabis} className="cannabis"/>
        <Link to="/" className="title">MantraSeeds</Link>
        </div>
        <button href="#" className={"toggle-button"} onClick={displayMobileMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </button>
        <div className={"navbar-links"} 
        style={isActive ? {display: "flex"} : null}>
            <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/shop">Shop</NavLink>
            </li>
            <li>
                <NavLink to="/contact">Contact</NavLink>
            </li>
            <li><FontAwesomeIcon 
            icon={faUser} 
            style={{
                color: "#FFF",
                fontSize: "1.6rem",
                padding: "15px 20px",
                cursor: "pointer"}}/></li>
            <li><FontAwesomeIcon 
            icon={faCartShopping} 
            style={{
                color: "#FFF",
                fontSize: "1.6rem",
                padding: "15px 20px",
                cursor: "pointer"}}/></li>
            </ul>
        </div>
    </div>
    {showLogin && <LoginModel/>}
    {isShopping && !isActive && !showLogin &&
        <div className="store-banner">
        <div className="store-header">Store</div>
        <button className="filter-products-mobile">
          <div onClick={runShowModal}>Filter Products</div>
        </button>
    </div>
    }
    {showModal && isShopping &&
    <div className="filter-products__modal">
    <Sidebar
    updateFilter={updateFilter}
    />
    </div>
    }
    </nav>
  )
}
