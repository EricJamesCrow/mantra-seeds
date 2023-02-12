import React from 'react'

import { NavLink } from 'react-router-dom'

// styles
import './ContentCard.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ContentCard( { title, value, percentage, icon }) {
    const percentValue = parseFloat(percentage);
    const percentClass = percentValue >= 0 ? 'positive' : 'negative';

    let arrow;
    if(percentClass === 'positive') {
      arrow = (
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
        </svg> )
    } else if(percentClass === 'negative') {
      arrow = (
        <svg viewBox="0 0 24 24" width="24" height="24">
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
      </svg>
      );
    }

  return (
    <NavLink className="content-card-container" to={`/admin/${title.toLowerCase()}`}>
        <div className="left-card-content">
            <div>{title}</div>
            <div>{value}</div>
            <div className={`${percentClass} arrow`}>{`(${percentage} `}{arrow}{`)`}</div>
        </div>
        <div className="right-card-content">
        <FontAwesomeIcon
          icon={icon} 
          style={{
            color: "#FFFFFF",
            fontSize: "2rem",
            float: "right"
          }}
        />
        </div>
  </NavLink>

  )
}
