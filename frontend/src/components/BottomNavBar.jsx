import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';

// styles
import "./BottomNavBar.css"

// redux
import { useSelector } from 'react-redux';

export default function BottomNavBar({ hideLogin }) {
    const location = useLocation();
    const cartItems = useSelector(state => state.cart.cartItems);

    const handleClick = () => {
        hideLogin();
        document.querySelector('.main-content').classList.toggle('push');
        document.querySelector('.side-nav').classList.toggle('open')
    }

  return (
    <nav className="bottom-nav">
        <NavLink to="/" onClick={hideLogin}>
            <FontAwesomeIcon
                icon={faHouse}
                style={{
                    color: location.pathname === "/" ? "#d4d4cf" : "#FFF",
                    fontSize: "1.6rem",
                    padding: "15px 20px",
                    cursor: "pointer"
                }}
            />
        </NavLink>
        <NavLink to="/profile">
            <FontAwesomeIcon
                icon={faUser}
                style={{
                    color: location.pathname === "/profile" ? "#d4d4cf" : "#FFF",
                    fontSize: "1.6rem",
                    padding: "15px 20px",
                    cursor: "pointer"
                }}
            />
        </NavLink>
        <NavLink to="/cart" onClick={hideLogin}>
        <div style={{ position: 'relative'}}>
            <FontAwesomeIcon
                icon={faCartShopping}
                style={{
                    color: location.pathname === "/cart" ? "#d4d4cf" : "#FFF",
                    fontSize: "1.6rem",
                    padding: "15px 20px",
                    cursor: "pointer"
                }}
            />
            { cartItems && cartItems.length > 0 && 
            <div style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                backgroundColor: 'red',
                color: 'white',
                fontSize: '0.8rem',
                padding: '2px 5px',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                textAlign: 'center',
                lineHeight: '15px',
            }}>{cartItems.length}</div>
            }
        </div>
        </NavLink>
        <NavLink onClick={handleClick}>
            <FontAwesomeIcon
                icon={faBars}
                style={{
                    color: location.pathname === "/menu" ? "#d4d4cf" : "#FFF",
                    fontSize: "1.6rem",
                    padding: "15px 20px",
                    cursor: "pointer"
                }}
            />
        </NavLink>
    </nav>
  )
}
