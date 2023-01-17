import React from 'react'
import { Link } from 'react-router-dom'

export default function Shipping( { setSelectedLink }) {
    const shippingMethods = ["USPS Priority", "USPS Next Day Air"]
  return (
    <>
    <div className="checkout-shipping-container">
        <div className="checkout-contact-info-links">
        <div>Contact</div>
        <div>
            <div>insertemailhere@email.com</div>
            <div>Change</div>
        </div>
        </div>
        <div className="seperator"></div>
        <div className="checkout-contact-info-links">
        <div>Ship To</div>
        <div>
            <div>1024 Address, Santa Cruz CA
95065-9623, United States</div>
            <div>Change</div>
        </div>
        </div>
    </div>
    <div className="shipping-methods">
    <div>SHIPPING METHOD</div>
    {shippingMethods.map(c => (
    <div className="shipping-method">
    <input type="radio" name="shipping-method"/>
        <div>
            <div>USPS Priority</div>
            <div>Estimated delivery Tuesday, Jan 24-Thursday, Feb 23</div>
        </div>
        <div>$7.99</div>
    </div>
    ))
    }
    </div>
    <div className="checkout-checkout-container-container">
    <button type="button" onClick={() => setSelectedLink("PAYMENT")}>CONTINUE TO PAYMENT</button>
    </div>
    </>
  )
}
