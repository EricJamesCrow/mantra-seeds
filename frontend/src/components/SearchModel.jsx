import React from 'react'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import './SearchModel.css'

export default function SearchModel( { hideSearch }) {
  return (
    <div className="search-model">
            <FontAwesomeIcon
    onClick={hideSearch}
    icon={faXmark} 
    style={{
    color: "#000000",
    fontSize: "1.4rem",
    float: "right",
    marginTop: "1rem",
    marginRight: "1.5rem",
    cursor: "pointer"}}/>
            <form>
    <input type="text" id="searchInput" placeholder="Search Mantra Seeds" class="search-input search-input-desktop"/>
    </form>
    </div>
  )
}
