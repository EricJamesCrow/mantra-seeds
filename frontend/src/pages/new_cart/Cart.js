import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

// styles
import './Cart.css'

export default function Cart() {
  const user = useSelector(state => state.auth.user);
  const cart = useSelector(state => state.cart);
  const [ subtotal, setSubtotal ] = useState(null)

    useEffect(() => {
      // Listen for changes in the cart items and re-render the page
      if(cart) {
        setSubtotal((cart.subtotal/100).toFixed(2))
      }
  }, [cart]);

  return (
    <div className="cart-container">
      <h1>My Cart</h1>
      <div className="cart-products-container">
        <div className="cart-product-container">

        </div>
      </div>
    </div>
  )
}
