import React, { useState, useEffect } from 'react'

// styles
import './Order.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Cannabis from "../../../images/cannabis-leaf-green.svg"

// hooks
import { useAuthContext } from '../../../hooks/useAuthContext'

export default function Order( { item } ) {
  const [product, setProduct] = useState('')
  const [hover, setHover] = useState(false);
  const { user } = useAuthContext()

  useEffect(() => {
    const url = '/api/products/'+item.product;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setProduct(data)
        })
}, [])

  const handleDelete = async () => { 
    const response = await fetch('/api/carts/'+item._id, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          user:  user.id,
          product: product._id
      })
  });
    const json = await response.json();
    if(response.ok) {
      console.log("Item deleted successfully")
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
        <div className="cart-customer-order-details">
        <div className="view-product-image-border">
      <img src={Cannabis} />
      </div>
      <div className="cart-customer-order-product-purchased">{`x${item.quantity} ${product.name}`}</div>
      <div>{`$${item.price}`}</div>
  </div>
  </div>
  )
}
