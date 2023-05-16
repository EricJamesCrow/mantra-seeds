import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

// styles
import './Cart.css'

// components
import Order from './components/Order'

// chakra ui
import { Spinner } from '@chakra-ui/react'

export default function Cart() {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const cart = useSelector(state => state.cart);
  const [ subtotal, setSubtotal ] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [updatingSubtotal, setUpdatingSubtotal] = useState(false)

    useEffect(() => {
      // Listen for changes in the cart items and re-render the page
      if(cart) {
        setSubtotal((cart.subtotal/100).toFixed(2))
      }
  }, [cart]);

  const checkInventoryAndProceedToCheckout = async () => {
    setError(null);
    setLoading(true)
    try {
      const response = await fetch('/api/checkout/check-inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId: cart._id }),
      });
  
      if (response.ok) {
        navigate('/cart/checkout');
      } else {
        const error = await response.json();
        setError(error.error);
      }
    } catch (err) {
      const errorMessage = JSON.parse(err.message);
      setError(errorMessage.error);
      setLoading(false);
    }
  };
  

  return (
    <div className="cart-container">
      <div className="cart-wrapper">
        <div className="cart-first-wrapper">
          <h1>My Cart</h1>
          <div className="cart-products-container">
          {cart.cartItems && cart.cartItems.map(item => (
            <Order key={item._id} item={item} user={user} setUpdatingSubtotal={setUpdatingSubtotal}/>
          ))}
          {(cart?.cartItems?.length === 0 || !cart?.cartItems) && 
          <div className="empty-cart">
            <h2>Your cart is empty. <button onClick={() => navigate('/shop')}>Click here to return to shop.</button></h2>
          </div>}
            </div>
        </div>
        <div className="cart-second-wrapper">
          <div className="subtotal-container">
            <div>Subtotal:</div>
            {!updatingSubtotal && <div>{`$${subtotal}`}</div>}
            {updatingSubtotal && <Spinner />}
          </div>
          <div className="checkout-btn-container">
                {cart.cartItems?.length > 0 && <button
                  type="button"
                  className="add-to-cart-btn"
                  onClick={checkInventoryAndProceedToCheckout}
                >
                  Proceed to Checkout
                </button>}
          </div>
          {error && <div className="error-message add-to-cart">{error}</div>}
        </div>
      </div>
      </div>
  )
}
