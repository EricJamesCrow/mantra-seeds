import React, { useEffect, useState } from 'react'

// images
import Stripe from '../../../images/payment_logos/Stripe.wine.svg';
import Paypal from '../../../images/payment_logos/PayPal-Logo.wine.svg';
import Bitcoin from '../../../images/payment_logos/Bitcoin-Logo.wine.svg';
import PoweredByStripe from '../../../images/payment_logos/PoweredByStripe.wine.svg';

// stripe component
import StripeContainer from './stripe/StripeContainer'

// paypal component
import PayPal from './paypal/PayPal'

export default function Payment( { setSelectedLink, cart, shipping, products, user } ) {   
    const [ productsInCart, setProductsInCart ] = useState(null)
    const [ selectedPaymentMethod, setSelectedPaymentMethod] = useState("stripe")
    const [ encrypted, setEncrypted ] = useState(false)

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
        const encryptAdrress = async () => {
          fetch("/api/payment/encrypt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user: cart.user,
              address: { 
                firstName: shipping.firstName,
                lastName: shipping.lastName,
                street: shipping.address,
                city: shipping.city,
                state: shipping.state,
                zip: shipping.zip
              },
              items: cart,
              shipping: {
                delivery: shipping.shippingName,
                price: shipping.shippingPrice,
                // expected: shipping.shippingPrice // fix this, need expected delivery date
              },
              email: shipping.email
            }),
          }).then((res) => res.json())
          .then((data) => {
            setEncrypted(data)})
          .catch((e) => {
            console.log(e)
          })
        }
        encryptAdrress()
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
  { selectedPaymentMethod === "stripe" && encrypted &&
  <div className="grid-container">
      <img src={PoweredByStripe} className='powered-by-stripe'/> 
  <StripeContainer cart={cart} shipping={shipping} user={user}/>
  </div>
  }
  { selectedPaymentMethod === "paypal" && encrypted &&
  <PayPal cart={cart} shipping={shipping} user={user}/>
  }
  </div>
    </>
  )
}
