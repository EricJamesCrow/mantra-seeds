import React from 'react'

// styles
import './FilterSort.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons'

export default function FilterSort() {
    const buttonData = [
        { id: 1, title: 'Filter', icon: faFilter },
        { id: 2, title: 'Sort', icon: faSort }
      ]
    
  return (
    <div className="admin-filter-sort-component-container">
    <div className="admin-filter-sort-btn-container">
    {buttonData.map(item => (
          <button className="admin-filter-sort-btn">
          <FontAwesomeIcon 
                  key={item.id}
                  icon={item.icon} 
                  style={{
                      color: "#000000",
                      fontSize: "1.3rem",
                      cursor: "pointer"}}
                  />
          <div>{item.title}</div>
          </button>
    ))}
    </div>
    <div className="admin-page-results-container">
      <div>1 - 4 of 4 Results</div>
      <div>Results per Page: </div>
    </div>
    </div>
  )
}
