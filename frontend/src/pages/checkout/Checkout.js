import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

// styles
import "./Checkout.css"

// components
import Info from "./components/Info"
import Shipping from "./components/Shipping"
import Payment from "./components/Payment"

// hooks
import { useShippingContext } from '../../hooks/useShippingContext';
import { useProductsContext } from '../../hooks/useProductsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCartContext } from '../../hooks/useCartContext'

export default function Checkout() {
  const { user } = useAuthContext() // JWT token in local storage
  const { cartItems, dispatchCart } = useCartContext()
  const { shipping, dispatchShipping } = useShippingContext()
  const { products, dispatchProducts } = useProductsContext()
  const [selectedLink, setSelectedLink] = useState("INFO");
  const checkoutLinks = ["CART", "INFO", "SHIPPING", "PAYMENT"]
  const navigate = useNavigate();

    useEffect(() => {
      const fetchCart = async () => {
        const response = await fetch('/api/carts/'+user.cart)
        const json = await response.json()

        if (response.ok) {
          dispatchCart({type: 'SET_CART', payload: json})
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
    <div style={{ marginTop: '50px', zIndex: 1, backgroundColor: selectedLink === 'INFO' ? 'transparent' : '#D9D9D9' }}>
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
    <Info setSelectedLink={setSelectedLink} shipping={shipping} dispatchShipping={dispatchShipping}/>}
    {selectedLink === 'SHIPPING' &&
    <>
    <Shipping setSelectedLink={setSelectedLink} cart={cartItems} shipping={shipping} products={products} dispatchProducts={dispatchProducts} dispatchShipping={dispatchShipping}/>
    </>
    }
    {selectedLink === "PAYMENT" &&
        <Payment setSelectedLink={setSelectedLink} cart={cartItems} shipping={shipping} products={products} dispatchProducts={dispatchProducts} user={user}/>
    }
    </div>
    </>
  )
}
