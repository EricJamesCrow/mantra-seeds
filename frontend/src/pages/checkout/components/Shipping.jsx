import React, { useEffect, useState } from 'react'

// hooks
import { useShippingContext } from '../../../hooks/useShippingContext';

const shippingMethods = [  { name: "USPS Priority", price: 799, delivery: "" },  { name: "USPS Next Day Air", price: 2299, delivery: "" },];

export default function Shipping( { setSelectedLink }) {
    const { shipping } = useShippingContext();
    const [selectedShipping, setSelectedShipping] = useState(null);

    const today = new Date();
    shippingMethods.forEach(method => {
        let delivery = new Date();
        if(method.name === "USPS Priority") {
            delivery.setDate(today.getDate() + 2);
        } else if(method.name === "USPS Next Day Air") {
            delivery.setDate(today.getDate() + 1);
        }
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        method.delivery = "Estimated delivery " + delivery.toLocaleDateString("en-US", options);
    });

    const handleShippingSelection = (method) => {
        setSelectedShipping(method);
        console.log(method)
    }

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
    <input type="radio" name="shipping-method" onClick={() => handleShippingSelection(c)}/>
        <div>
            <div>{c.name}</div>
            <div>{c.delivery}</div>
        </div>
        <div>${(c.price/100).toFixed(2)}</div>
    </div>
    ))
    }
    </div>
    <div className="checkout-checkout-container-container">
    <button type="button" onClick={() => selectedShipping ? setSelectedLink("PAYMENT") : null}>CONTINUE TO PAYMENT</button>    </div>
    </>
  )
}
