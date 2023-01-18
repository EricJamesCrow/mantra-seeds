import React, { useEffect, useState } from 'react'

const shippingMethods = [  { shippingName: "USPS Priority", shippingPrice: 799, delivery: "" },  { shippingName: "USPS Next Day Air", shippingPrice: 2299, delivery: "" },];

const PRODUCTS_API_URL = '/api/products/'

export default function Shipping( { setSelectedLink, cart, shipping, dispatchShipping, products, dispatchProducts }) {
    const [selectedShipping, setSelectedShipping] = useState(null);
    const [ productsInCart, setProductsInCart ] = useState(null)

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

    const handleSubmit = () => {
        dispatchShipping({type: 'UPDATE_SHIPPING', payload: selectedShipping})
        setSelectedLink("PAYMENT")
    }

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
        const total = ((cart.subtotal)/100).toFixed(2)
        if(products) {
          const productsInCart = cart.cartItems.map(item => {
            const product = products.find(p => p._id === item.product);
            return `x${item.quantity} ${product.name} - $${(product.price/100).toFixed(2)}<br>`;
          });
          productsInCart.push(`Subtotal: $${total}`);
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
