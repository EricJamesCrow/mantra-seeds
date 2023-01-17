import React, { useEffect, useState } from 'react'

// stripe component
import StripeContainer from './stripe/StripeContainer'

// hooks
import { useShippingContext } from '../../../hooks/useShippingContext';
import { useProductsContext } from "../../../hooks/useProductsContext";

const PRODUCTS_API_URL = '/api/products/'

export default function Payment( { setSelectedLink, cart } ) {   
    const { shipping } = useShippingContext(); 
    const {products, dispatch} = useProductsContext();

    const [ productsInCart, setProductsInCart ] = useState(null)

    const shippingInfo = [
        {
          title: "Contact",
          value: shipping.email,
          onClick: () => setSelectedLink("INFO")
        },
        {
          title: "Ship To",
          value: `${shipping.address}, ${shipping.city} ${shipping.state} ${shipping.zip}, United States`,
          onClick: () => setSelectedLink("INFO")
        },
        {
            title: "Method",
            value: `${shipping.shippingName} - $${(shipping.shippingPrice/100).toFixed(2)}`,
            onClick: () => setSelectedLink("SHIPPING") 
        },
        {
            title: "Order Summary",
            value: productsInCart !== null ? <div dangerouslySetInnerHTML={{__html: productsInCart.join('<br>')}} /> : null,
            onClick: () => setSelectedLink("CART")
        }
      ];
    

      useEffect(() => {
        const fetchProducts = async () => {
          const response = await fetch(PRODUCTS_API_URL)
          const json = await response.json()
    
          if (response.ok) {
            dispatch({type: 'SET_PRODUCTS', payload: json})
          }
        }
    
        fetchProducts()
      }, [])

      useEffect(() => {
        if(products) {
          const productsInCart = cart.cartItems.map(item => {
            const product = products.find(p => p._id === item.product);
            return `x${item.quantity} ${product.name} - $${(product.price/100).toFixed(2)}<br>`;
          });
          productsInCart.push(`Subtotal: $${(cart.subtotal/100).toFixed(2)}`);
          setProductsInCart(productsInCart);
        }
      }, [products])

  return (
    <>
    <div className="checkout-shipping-container">
    {shippingInfo.map((info, index) => (
        <>
      <div key={index} className="checkout-contact-info-links">
        <div>{info.title}</div>
        <div>
          <div>{info.value}</div>
          <div className="change-link" onClick={info.onClick}>Change</div>
        </div>
      </div>
      {index !== shippingInfo.length - 1 && <div className="seperator"></div>}
      </>
    ))}
  </div>
    <StripeContainer>Payment</StripeContainer>
    </>
  )
}
