import React, { useState, useEffect } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { useProductsContext } from "../../hooks/useProductsContext";
import { useAuthContext } from '../../hooks/useAuthContext';

// styles
import "./Cart.css"

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

// Components
import Order from './components/Order'

export default function Cart() {
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
    <Order/>
  <div className="customer-cart-whitespace"></div>
    <div className="cart-checkout-container-container">
    <div className="cart-checkout-container"> 
          <div>Subtotal:</div>
          <div>$36</div>
    </div>
    <button>CHECKOUT</button>
    </div>
    </div>
    </>
  )
}
