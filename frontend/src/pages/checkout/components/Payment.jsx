import React, { useEffect, useState } from 'react'

// images
import Stripe from '../../../images/payment_logos/Stripe.wine.svg';
import Paypal from '../../../images/payment_logos/PayPal-Logo.wine.svg';
import Bitcoin from '../../../images/payment_logos/Bitcoin-Logo.wine.svg';
import PoweredByStripe from '../../../images/payment_logos/PoweredByStripe.wine.svg';

// stripe component
import StripeContainer from './stripe/StripeContainer'

const PRODUCTS_API_URL = '/api/products/'

export default function Payment( { setSelectedLink, cart, shipping, products, dispatchProducts, user } ) {   
    const [ productsInCart, setProductsInCart ] = useState(null)
    const [ selectedPaymentMethod, setSelectedPaymentMethod] = useState("stripe")

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
            value: `${shipping.shippingName} - $${shipping.shippingPrice}`,
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
            dispatchProducts({type: 'SET_PRODUCTS', payload: json})
          }
        }
    
        fetchProducts()
      }, [])

      useEffect(() => {
        const total = ((cart.subtotal+shipping.shippingPrice*100)/100).toFixed(2)
        if(products) {
          const productsInCart = cart.cartItems.map(item => {
            const product = products.find(p => p._id === item.product);
            return `x${item.quantity} ${product.name} - $${(product.price/100).toFixed(2)}<br>`;
          });
          productsInCart.push(`Total: $${total}`);
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
  <div className="shipping-methods shipping-methods-remove-padding">
    <div>PAYMENT METHOD</div>
    <div className="payment-methods">
    <div className={selectedPaymentMethod == 'stripe' ? "stripe-selected" : null} onClick={() => setSelectedPaymentMethod("stripe")}>
      <img src={Stripe} alt='stripe'/>
      </div>
      <div className={selectedPaymentMethod == 'paypal' ? "paypal-selected" : null} onClick={() => setSelectedPaymentMethod("paypal")}>
      <img src={Paypal} alt='paypal'/>
        </div>
      <div className={selectedPaymentMethod == 'bitcoin' ? "bitcoin-selected" : null} onClick={() => setSelectedPaymentMethod("bitcoin")}>
      <img src={Bitcoin} alt='bitcoin'/>
        </div>
    </div>
  </div>
  <div 
 className={selectedPaymentMethod == 'stripe' ? "selected-payment-method-container stripe-selected": selectedPaymentMethod == 'paypal' ? "selected-payment-method-container paypal-selected" : selectedPaymentMethod == 'bitcoin' ? "selected-payment-method-container bitcoin-selected" : "selected-payment-method-container"}
  >
  { selectedPaymentMethod === "stripe" && 
  <div className="grid-container">
      <img src={PoweredByStripe} className='powered-by-stripe'/> 
  <StripeContainer cart={cart} shipping={shipping} user={user}/>
  </div>
  }
  </div>
    </>
  )
}
