// styles
import "./Product.css"

//react
import React from "react"
import { Link } from 'react-router-dom'

// images
import Cannabis from "../images/cannabis-leaf-green.svg"
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Product( {item} ) {
  const price = (item.price/100).toFixed(2)
  return (
    <Link to={`/shop/products/${item._id}`} style={{ textDecoration: "none", color: "inherit" }}>
    <div className="product-shop">
        <img src={Cannabis}/>
        <div className="product-container-shop">
        <div className="add-to-cart-shop">
        <FontAwesomeIcon className="cart-icon" icon={faCartPlus} style={{color: "#ECEBE8"}}></FontAwesomeIcon>
        <div className="add-to-cart-text-shop">Add to Cart</div>
        </div>
        <div className="product-price">{`$${price}`}</div>
        </div>
    </div>
    </Link>
  )
}
