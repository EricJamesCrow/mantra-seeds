import React from 'react'

// chakra ui
import { Radio } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

// images
import Stripe from "../../../images/payment_logos/Stripe.wine.svg"
import PayPal from "../../../images/payment_logos/PayPal-Logo.wine.svg"
import Bitcoin from "../../../images/payment_logos/Bitcoin-Logo.wine.svg"

export default function Payment() {
  return (
    <div className="checkout-component-container">
      <h1>Review Order</h1>
      <div className="review-order-containers">
        <div className="review-order-container">
          <div>
            <div>Contact</div>
            <div>Edit</div>
          </div>
          <div>EricCrow@pm.me</div>
        </div>
        <div className="review-order-container">
          <div>
            <div>Shipping Address</div>
            <div>Edit</div>
          </div>
          <div>1024 Address, Santa Cruz CA
95065-9623, United States</div>
        </div>
        <div className="order-summary-container">
          <h2>Order Summary</h2>
          <div>
            <div>Subtotal</div>
            <div>$23.98</div>
          </div>
          <div>
            <div>Delivery</div>
            <div>$7.99</div>
          </div>
          <div>
            <div>Total</div>
            <div>$31.97</div>
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
