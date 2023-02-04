import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

// styles
import "./Checkout.css"

// components
import Info from "./components/Info"
import Shipping from "./components/Shipping"
import Payment from "./components/Payment"

// hooks
import { useProductsContext } from '../../hooks/useProductsContext';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Checkout() {
  const { user } = useAuthContext() // JWT token in local storage
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const { shipping } = useSelector(state => state.shipping);
  const { products, dispatchProducts } = useProductsContext()
  const [selectedLink, setSelectedLink] = useState("INFO");
  const checkoutLinks = ["CART", "INFO", "SHIPPING", "PAYMENT"]
  const navigate = useNavigate();

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
    <Info setSelectedLink={setSelectedLink} shipping={shipping} dispatch={dispatch}/>}
    {selectedLink === 'SHIPPING' &&
    <>
    <Shipping setSelectedLink={setSelectedLink} cart={cartItems} shipping={shipping} products={products} dispatchProducts={dispatchProducts} dispatch={dispatch}/>
    </>
    }
    {selectedLink === "PAYMENT" &&
        <Payment setSelectedLink={setSelectedLink} cart={cartItems} shipping={shipping} products={products} dispatchProducts={dispatchProducts} user={user}/>
    }
    </div>
    </>
  )
}
