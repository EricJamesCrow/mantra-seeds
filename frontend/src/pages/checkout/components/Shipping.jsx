import React, { useEffect } from 'react'

// hooks
import { useShippingContext } from '../../../hooks/useShippingContext';

const shippingMethods = [  { name: "USPS Priority", price: 7.99, delivery: "" },  { name: "USPS Next Day Air", price: 22.99, delivery: "" },];

export default function Shipping( { setSelectedLink }) {
    const { shipping } = useShippingContext();

    // useEffect(() => {
    //     const today = new Date();
    //     if (shippingMethods.name === "USPS Priority") {
    //         const delivery = new Date();
    //         delivery.setDate(today.getDate() + 2);
    //     } else if (shippingMethods.name === "USPS Next Day Air") {
    //         const delivery = new Date();
    //         delivery.setDate(today.getDate() + 1);
    //     }
    // }, []);

  return (
    <>
    <div className="checkout-shipping-container">
        <div className="checkout-contact-info-links">
        <div>Contact</div>
        <div>
            <div>{shipping.email}</div>
            <div className="change-link" onClick={() => setSelectedLink("INFO")}>Change</div>
        </div>
        </div>
        <div className="seperator"></div>
        <div className="checkout-contact-info-links">
        <div>Ship To</div>
        <div>
            <div>{`${shipping.address}, ${shipping.city} ${shipping.state} ${shipping.zip}, United States`}</div>
            <div className="change-link" onClick={() => setSelectedLink("INFO")}>Change</div>
        </div>
        </div>
    </div>
    <div className="shipping-methods">
    <div>SHIPPING METHOD</div>
    {shippingMethods.map(c => (
    <div className="shipping-method">
    <input type="radio" name="shipping-method"/>
        <div>
            <div>{c.name}</div>
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
