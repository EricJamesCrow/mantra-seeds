import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCartContext } from '../../hooks/useCartContext'

// styles
import "./Cart.css"

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

// Components
import Order from './components/Order'


export default function Cart() {
  const { user } = useAuthContext() // JWT token in local storage
  const { cartItems, dispatch } = useCartContext()
  const [ subtotal, setSubtotal ] = useState(null)

    useEffect(() => {
      const fetchCart = async () => {
        const response = await fetch('/api/carts/'+user.cart)
        const json = await response.json()

        if (response.ok) {
          setSubtotal((json.subtotal/100).toFixed(2))
          dispatch({type: 'SET_CART', payload: json})
        }
      }
      if(user) {
        fetchCart()
      }
    }, [user])

    useEffect(() => {
      // Listen for changes in the cart items and re-render the page
      if(cartItems) {
        setSubtotal((cartItems.subtotal/100).toFixed(2))
      }
  }, [cartItems]);

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
    {cartItems && cartItems.cartItems.map(item => (
  <Order key={item._id} item={item} />
))}
  <div className="customer-cart-whitespace"></div>
    <div className="cart-checkout-container-container">
    <div className="cart-checkout-container"> 
          <div>Subtotal:</div>
          <div>${subtotal}</div>
    </div>
    <Link to="/cart/checkout" type="button">CHECKOUT</Link>
    </div>
    </div>
    </>
  )
}
