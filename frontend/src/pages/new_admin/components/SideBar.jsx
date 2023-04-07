import React from 'react'
import { NavLink } from 'react-router-dom'

// styles
import './SideBar.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDashboard, faUsers, faShoppingCart, faBoxOpen, faCog } from '@fortawesome/free-solid-svg-icons'

export default function SideBar() {
        const dashboardLinks = [
            {id: 1, title: 'customers', icon: faUsers},
            {id: 2, title: 'orders', icon: faShoppingCart},
            {id: 3, title: 'products', icon: faBoxOpen},
        ]
  return (
    <div className="admin-side-bar">
    <NavLink to="/admin/dashboard">
    <FontAwesomeIcon
          icon={faDashboard} 
          style={{
            color: "#FFFFFF",
            fontSize: "2.1rem",
          }}
        />
    </NavLink>
    <div className="admin-side-bar-seperator"/>
    {dashboardLinks.map(item => (
    <NavLink to={`/admin/${item.title}`}>
    <FontAwesomeIcon
        icon={item.icon} 
        style={{
        color: "#FFFFFF",
        fontSize: "2.1rem",
        }}
    />
    </NavLink>
    ))
    }
    <div className="admin-side-bar-seperator"/>
    <NavLink>
    <FontAwesomeIcon
        icon={faCog} 
        style={{
        color: "#FFFFFF",
        fontSize: "2.1rem",
        }}
    />  
    </NavLink>
    </div>
  )
}
