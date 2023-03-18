import React, { useEffect, useState } from 'react'

// chakra ui
import { Radio } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

// images
import Stripe from "../../../images/payment_logos/Stripe.wine.svg"
import PayPal from "../../../images/payment_logos/PayPal-Logo.wine.svg"
import Bitcoin from "../../../images/payment_logos/Bitcoin-Logo.wine.svg"

export default function Payment( { shipping, dispatch, cart } ) {
    const total = ((cart.subtotal+shipping.shippingPrice*100)/100).toFixed(2)
    const subtotal = (cart.subtotal/100).toFixed(2)
    const delivery = shipping.shippingPrice
  
  return (
    <div className="checkout-component-container">
      <h1>Review Order</h1>
      <div className="review-order-containers">
        <div className="review-order-container">
          <div>
            <div>Contact</div>
            <div>Edit</div>
          </div>
          <div>{shipping.email}</div>
        </div>
        <div className="review-order-container">
          <div>
            <div>Shipping Address</div>
            <div>Edit</div>
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
      <h1>Choose a payment method</h1>
      <div className="review-order-containers">
        <div className="payment-option-container">
          <Radio/>
          <img src={Stripe}/>
        </div>
        <div className="payment-option-container">
          <Radio/>
          <img src={PayPal}/>
        </div>
        <div className="payment-option-container">
          <Radio/>
          <img src={Bitcoin}/>
        </div>
      </div>
      <div className="alternative-link-container shipping">
        <div className="alternative-link">
          <div>Submit Order</div>
          <ChevronRightIcon w={6} h={6}/>
        </div>
      </div>
    </div>
  )
}
