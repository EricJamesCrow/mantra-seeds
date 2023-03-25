import React, { useEffect, useState } from 'react'

import { useMediaQuery } from 'react-responsive'

// chakra ui
import { Radio, RadioGroup } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

// images
import StripeSvg from "../../../images/payment_logos/Stripe.wine.svg"
import PayPalSvg from "../../../images/payment_logos/PayPal-Logo.wine.svg"
import BitcoinSvg from "../../../images/payment_logos/Bitcoin-Logo.wine.svg"

// components
import StripeContainer from './stripe/StripeContainer'
import PayPal from './paypal/PayPal'

export default function Payment( { setCurrentStep, shipping, dispatch, cart, user } ) {
    const isDesktop = useMediaQuery({ minWidth: 980 });
    const [ encrypted, setEncrypted ] = useState(false);
    const [ value, setValue ] = useState(0);
    const total = ((cart.subtotal+shipping.shippingPrice*100)/100).toFixed(2);
    const subtotal = (cart.subtotal/100).toFixed(2);
    const delivery = shipping.shippingPrice;

    const handleEdit = () => {
      setCurrentStep(1)
    };

    useEffect(() => {
      const encryptAdrress = async () => {
        fetch("/api/payment/encrypt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.cart,
            address: { 
              firstName: shipping.firstName,
              lastName: shipping.lastName,
              street: shipping.address,
              city: shipping.city,
              state: shipping.state,
              zip: shipping.zip
            },
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
  
  return (
    <div className="checkout-component-container payment">
      <div className="review-order-wrapper">
      <h1>Review Order</h1>
      <div className="review-order-containers">
        <div className="review-order-container">
          <div>
            <div>Contact</div>
            <div onClick={handleEdit}>Edit</div>
          </div>
          <div>{shipping.email}</div>
        </div>
        <div className="review-order-container">
          <div>
            <div>Shipping Address</div>
            <div onClick={handleEdit}>Edit</div>
          </div>
          <div>{`${shipping.address}, ${shipping.city} ${shipping.state} ${shipping.zip}, United States`}</div>
        </div>
        <div className="order-summary-container">
          <h2>Order Summary</h2>
          <div>
            <div>Subtotal</div>
            <div>${subtotal}</div>
          </div>
          <div>
            <div>Delivery</div>
            <div>${delivery}</div>
          </div>
          <div>
            <div>Total</div>
            <div>${total}</div>
          </div>
        </div>
      </div>
      {isDesktop && <div className="alternative-link-container">
        <div className="alternative-link">
          <div>Submit Order</div>
          <ChevronRightIcon w={6} h={6}/>
        </div>
      </div>}
      </div>
      <div className="payment-method-wrapper">
      <h1>Choose a payment method</h1>
      <div className="review-order-containers">
      <RadioGroup onChange={setValue} value={value}>
        <div className={value === "stripe" ? "payment-option-container stripe" : "payment-option-container"}>
          <div>
            <Radio
            value='stripe'
            />
            <img src={StripeSvg}/>
          </div>
          {encrypted && value === "stripe" && <StripeContainer cart={cart} shipping={shipping} user={user}/>}
        </div>
        <div className="payment-option-container">
          <div>
            <Radio
            value='paypal'
            />
            <img src={PayPalSvg}/>
          </div>
          {encrypted && value === "paypal" && <PayPal cart={cart} shipping={shipping} user={user}/>}
        </div>
        <div className="payment-option-container">
          <div>
            <Radio
            value='bitcoin'
            />
            <img src={BitcoinSvg}/>
          </div>
          {encrypted && value === "bitcoin" && <PayPal cart={cart} shipping={shipping} user={user}/>}
        </div>
      </RadioGroup>
      </div>
      {!isDesktop && <div className="alternative-link-container shipping">
        <div className="alternative-link">
          <div>Submit Order</div>
          <ChevronRightIcon w={6} h={6}/>
        </div>
      </div>}
      </div>
    </div>
  )
}
