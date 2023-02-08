import React from 'react'

// styles
import './ContentCard.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ContentCard( { title, value, percentage, icon }) {
    const percentValue = parseFloat(percentage);
    const percentClass = percentValue >= 0 ? 'positive' : 'negative';

  return (
    <div className="content-card-container">
        <div className="left-card-content">
            <div>{title}</div>
            <div>{value}</div>
            <div className={percentClass}>{percentage}</div>
        </div>
        <div className="right-card-content">
        <FontAwesomeIcon
          icon={icon} 
          style={{
            color: "#33A0FF",
            fontSize: "2rem",
            float: "right"
          }}
        />
        </div>
  </div>
  )
}
