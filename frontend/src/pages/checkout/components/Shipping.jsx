import React, { useEffect, useState } from 'react'

// hooks
import { useShippingContext } from '../../../hooks/useShippingContext';

const shippingMethods = [  { shippingName: "USPS Priority", shippingPrice: 799, delivery: "" },  { shippingName: "USPS Next Day Air", shippingPrice: 2299, delivery: "" },];

export default function Shipping( { setSelectedLink }) {
    const { shipping, dispatch } = useShippingContext();
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
    
    const handleShippingSelection = ({shippingName, shippingPrice}) => {
        setSelectedShipping({shippingName, shippingPrice});
    }

    useEffect(() => {
        console.log(shipping)
    }, [shipping]);

    const handleSubmit = () => {
        dispatch({type: 'UPDATE_SHIPPING', payload: selectedShipping})
        setSelectedLink("PAYMENT")
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
            <div>{c.shippingName}</div>
            <div>{c.delivery}</div>
        </div>
        <div>${(c.shippingPrice/100).toFixed(2)}</div>
    </div>
    ))
    }
    </div>
    <div className="checkout-checkout-container-container">
    <button type="button" onClick={() => selectedShipping ? handleSubmit() : null}>CONTINUE TO PAYMENT</button>    </div>
    </>
  )
}
