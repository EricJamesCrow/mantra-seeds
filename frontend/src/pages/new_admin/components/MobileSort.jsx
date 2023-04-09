import React from 'react'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

export default function MobileSort( { handleClose } ) {
  return (
    <div className="add-product-container">
    <div className="admin-container-add-product">
    <div>
        <div>Sort</div>
        <FontAwesomeIcon 
            icon={faX} 
            style={{
                color: "#000000",
                fontSize: "1.6rem",
                cursor: "pointer"}}
            onClick={handleClose}
            />
        </div>
        <div>
    <span></span>
    </div>
    
</div>
</div>
  )
}
