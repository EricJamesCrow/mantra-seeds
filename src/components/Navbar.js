// react
import { useState } from 'react';

// styles
import "./Navbar.css"

// images
import Cannabis from "../images/cannabis-leaf.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping} from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
    const [isActive, setActive] = useState(false)

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
    <nav>
    <div className="navbar-container">
        <div className="logo-container">
        <img src={Cannabis} className="cannabis"/>
        <div className="title">MantraSeeds</div>
        </div>
        <button href="#" className={"toggle-button"} onClick={displayMobileMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </button>
        <div className={"navbar-links"} 
        style={isActive ? {display: "flex"} : null}>
            <ul>
            <li><a>Home</a></li>
            <li><a>Shop</a></li>
            <li><a>Contact</a></li>
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
