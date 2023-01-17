import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../hooks/useCartContext';
import "./BottomNavBar.css"

export default function BottomNavBar({ hideLogin }) {
    const location = useLocation();
    const { cartItems } = useCartContext();

  return (
    <nav className="bottom-nav">
        <NavLink to="/" onClick={hideLogin}>
            <FontAwesomeIcon
                icon={faHouse}
                style={{
                    color: location.pathname === "/" ? "#AECAED" : "#FFF",
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
                    color: location.pathname === "/profile" ? "#AECAED" : "#FFF",
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
                    color: location.pathname === "/cart" ? "#AECAED" : "#FFF",
                    fontSize: "1.6rem",
                    padding: "15px 20px",
                    cursor: "pointer"
                }}
            />
            { cartItems && cartItems.cartItems.length > 0 && 
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
            }}>{cartItems.cartItems.length}</div>
            }
        </div>
        </NavLink>
        <NavLink to="/menu" onClick={hideLogin}>
            <FontAwesomeIcon
                icon={faBars}
                style={{
                    color: location.pathname === "/menu" ? "#AECAED" : "#FFF",
                    fontSize: "1.6rem",
                    padding: "15px 20px",
                    cursor: "pointer"
                }}
            />
        </NavLink>
    </nav>
  )
}
