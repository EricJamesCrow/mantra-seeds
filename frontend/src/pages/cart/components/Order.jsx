import React from 'react'

// styles
import './Order.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Cannabis from "../../../images/cannabis-leaf-green.svg"

export default function Order() {
  return (
    <div className="cart-customer-order">
    <FontAwesomeIcon
          icon={faXmark} 
          style={{
            color: "#000000",
            fontSize: "1rem",
            float: "right",
            marginRight: "10px",
            cursor: "pointer"
          }}
        />
        <div className="cart-customer-order-details">
        <div className="view-product-image-border">
      <img src={Cannabis} />
      </div>
      <div className="cart-customer-order-product-purchased">x2 Watermelon Seeds</div>
      <div>$36</div>
  </div>
  </div>
  )
}
