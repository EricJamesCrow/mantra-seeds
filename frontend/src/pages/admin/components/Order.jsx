import React from 'react'

// styles
import "./Order.css"

// images
import Cannabis from "../../../images/cannabis-leaf-green.svg"

export default function Order() {
  return (
    <div className="order">
    <div className="customer-email recent-orders-div">customeremail@gmail.com</div>
    <div className="recent-orders-div">total: $59.99</div>
    <div className="order-details">
    <img src={Cannabis}/>
    <div className="recent-orders-div">x 5</div>
    </div>
    <button>More Info</button>
  </div>
  )
}
