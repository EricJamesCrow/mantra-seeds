import React from 'react'

// styles
import './AdminOrdersDetailsPage.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function AdminOrdersDetailsPage() {
  return (
    <div className="admin-orders-details-page-container">
      <button className="details-page-btn">
      <FontAwesomeIcon 
        icon={faChevronLeft} 
        style={{
            color: "#BCBDBC",
            fontSize: "1.15rem",
            cursor: "pointer"}}
        />
      </button>
      <div>
      <div>Order: #MS23021708</div>
      </div>
    </div>
  )
}
