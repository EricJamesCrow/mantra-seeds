// react
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom'

// styles
import "./Navbar.css"

// images
import Cannabis from "../images/cannabis-leaf.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping} from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
    const [isActive, setActive] = useState(false)
    const [stickyClass, setStickyClass] = useState('');

    useEffect(() => {
        window.addEventListener('scroll', stickNavbar);
    
        return () => {
          window.removeEventListener('scroll', stickNavbar);
        };
      }, []);

    const stickNavbar = () => {
    if (window !== undefined) {
        let windowHeight = window.scrollY;
        windowHeight > 150 ? setStickyClass('sticky-nav') : setStickyClass('');
    }
    };

    const shoppingCart = () => {
        console.log("Shopping cart works")
    }

    const userProfile = () => {
        console.log("User profile works")
    }

    const displayMobileMenu = () => {
        setActive(!isActive)
    }

  return (
    <nav className={`${stickyClass}`}>
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
                <NavLink to="/shop" style={({ isActive }) => isActive ? {backgroundColor: "#82A7D6"} : null }>Shop</NavLink>
            </li>
            <li>
                <NavLink to="/contact" style={({ isActive }) => isActive ? {backgroundColor: "#82A7D6"} : null }>Contact</NavLink>
            </li>
            <li><FontAwesomeIcon 
            icon={faUser} 
            style={{
                color: "#FFF",
                fontSize: "1.6rem",
                padding: "15px 20px",
                cursor: "pointer"}}
                onClick={userProfile}/></li>
            <li><FontAwesomeIcon 
            icon={faCartShopping} 
            style={{
                color: "#FFF",
                fontSize: "1.6rem",
                padding: "15px 20px",
                cursor: "pointer"}} 
                onClick={shoppingCart}/></li>
            </ul>
        </div>
    </div>
    </nav>
  )
}
