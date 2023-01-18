import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


// styles
import './Order.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Cannabis from "../../../images/cannabis-leaf-green.svg"

const CARTS_API_URL = '/api/carts/'
const PRODUCTS_API_URL = '/api/products/'

export default function Order( { item, dispatchCart, user } ) {
  const [product, setProduct] = useState('')
  const [hover, setHover] = useState(false);
  const price = (item.price/100).toFixed(2)

  useEffect(() => {
    const url = PRODUCTS_API_URL+item.product;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setProduct(data)
        })
}, [])

  const handleDelete = async () => { 
    const response = await fetch(CARTS_API_URL+item._id, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          user:  user.id,
          product: product._id
      })
  });
    const json = await response.json(); // need to refactor backend so the response is the cart object
    if(response.ok) {
      dispatchCart({type: 'DELETE_ITEM', payload: json});
    }
  }

  return (
    <div className="cart-customer-order">
        <FontAwesomeIcon
          icon={faXmark} 
          style={{
            color: hover ? "#FE503C" : "#000000",
            fontSize: "1rem",
            float: "right",
            marginRight: "10px",
            cursor: "pointer",
            transition: "color 0.1s ease-in-out"
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={handleDelete}
        />
        <Link to={`/shop/products/${item.product}`} style={{ textDecoration: "none"}}>
        <div className="cart-customer-order-details">
        <div className="view-product-image-border">
      <img src={Cannabis} />
      </div>
      <div className="cart-customer-order-product-purchased">{`x${item.quantity} ${product.name}`}</div>
      <div>{`$${price}`}</div>
  </div>
  </Link>
  </div>
  )
}
