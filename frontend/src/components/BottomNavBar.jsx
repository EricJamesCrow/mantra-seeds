// react
import { NavLink} from 'react-router-dom'
import { useLocation } from 'react-router-dom'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faCartShopping, faBars} from '@fortawesome/free-solid-svg-icons'

// styles
import "./BottomNavBar.css"

export default function BottomNavBar( { hideLogin } ) {
    const location = useLocation();

  return (
    <nav className="bottom-nav">
        <NavLink to="/" onClick={hideLogin}><FontAwesomeIcon 
            icon={faHouse} 
            style={{
                color: location.pathname === "/" ? "#AECAED" : "#FFF",
                fontSize: "1.6rem",
                padding: "15px 20px",
                cursor: "pointer"}}/>
        </NavLink>
        <NavLink to="/profile"><FontAwesomeIcon 
            icon={faUser} 
            style={{
                color: location.pathname === "/profile" ? "#AECAED" : "#FFF",
                fontSize: "1.6rem",
                padding: "15px 20px",
                cursor: "pointer"}}/>
        </NavLink>
        <NavLink to="/shop" onClick={hideLogin}><FontAwesomeIcon 
            icon={faCartShopping} 
            style={{
                color: location.pathname === "/shop" ? "#AECAED" : "#FFF",
                fontSize: "1.6rem",
                padding: "15px 20px",
                cursor: "pointer"}}/>
        </NavLink>
        <NavLink to="/menu" onClick={hideLogin}><FontAwesomeIcon 
            icon={faBars} 
            style={{
                color: location.pathname === "/menu" ? "#AECAED" : "#FFF",
                fontSize: "1.6rem",
                padding: "15px 20px",
                cursor: "pointer"}}/>
        </NavLink>
    </nav>
  )
}
