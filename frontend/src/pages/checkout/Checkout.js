import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCartContext } from '../../hooks/useCartContext'
import { useNavigate } from 'react-router-dom';

// styles
import "./Checkout.css"

// components
import Info from "./components/Info"
import Shipping from "./components/Shipping"

// stripe component
import StripeContainer from './components/stripe/StripeContainer'

// hooks
import { useShippingContext } from '../../hooks/useShippingContext';

export default function Checkout() {
  const { user } = useAuthContext() // JWT token in local storage
  const { dispatch } = useCartContext()
  const { shipping } = useShippingContext()
  const [selectedLink, setSelectedLink] = useState("INFO");
  const checkoutLinks = ["CART", "INFO", "SHIPPING", "PAYMENT"]
  const navigate = useNavigate();


    useEffect(() => {
      const fetchCart = async () => {
        const response = await fetch('/api/carts/'+user.cart)
        const json = await response.json()

        if (response.ok) {
          dispatch({type: 'SET_CART', payload: json.cartItems})
        }
      }
      if(user) {
        fetchCart()
      }
    }, [user])

    useEffect(() => {
        if(selectedLink === 'CART') {
            navigate('/cart')
        }
        window.scrollTo(0, 0);
    }, [selectedLink])

  return (
    <>
    <div style={{ marginTop: '50px', zIndex: 1 }}>
    <div className="checkout-header-container">
    <div>CHECKOUT</div>
    <div className="checkout-header-links">
    {checkoutLinks.map(c => (
        <button
        className={selectedLink === c ? 'selected-checkout-link' : null}
        onClick={() => c === "CART" || shipping ? setSelectedLink(c) : null}
        >{c}</button>
    ))}

    </div>
    </div>
    {selectedLink === 'INFO' &&
    <Info setSelectedLink={setSelectedLink}/>}
    {selectedLink === 'SHIPPING' &&
    <>
    <Shipping setSelectedLink={setSelectedLink}/>
    </>
    }
    {selectedLink === "PAYMENT" &&
        <StripeContainer/>
    }
    </div>
    </>
  )
}
