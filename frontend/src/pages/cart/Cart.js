import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

// styles
import "./Cart.css"

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

// Components
import Order from './components/Order'


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
    <>
    <div style={{ marginTop: '50px', zIndex: 1 }}>
    <div className="add-product">
    <div>SHOPPING CART</div>
    <FontAwesomeIcon
          icon={faCartShopping} 
          style={{
            color: "#000000",
            fontSize: "1.6rem",
            float: "right",
            marginRight: "10px"
          }}
        />
    </div>
    {cart.cartItems && cart.cartItems.map(item => (
  <Order key={item._id} item={item} user={user}/>
))}
  <div className="customer-cart-whitespace"></div>
    <div className="cart-checkout-container-container">
    <div className="cart-checkout-container"> 
          <div></div>
          <div>Subtotal: ${subtotal}</div>
    </div>
    <Link to="/cart/checkout" type="button">CHECKOUT</Link>
    </div>
    </div>
    </>
  )
}
