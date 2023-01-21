import React, { useEffect, useState } from 'react'

const PRODUCTS_API_URL = '/api/products/'

export default function Shipping( { setSelectedLink, cart, shipping, dispatchShipping, products, dispatchProducts }) {
    const [selectedShipping, setSelectedShipping] = useState(null);
    const [ productsInCart, setProductsInCart ] = useState(null)
    const [ shippingMethods, setShippingMethods ] = useState([])

    const today = new Date()
    
    const handleShippingSelection = (provider, service_level, amount) => {
        setSelectedShipping(`${provider} ${service_level}`, amount);
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


      // Shipping API
      const calculateShipping = async (shipping) => {
        console.log(shipping)
        const response = await fetch('/api/shipping', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({shipping})
        })
        const shippingOptions = await response.json()

        if(!response.ok) {
          console.log(shippingOptions.error)
        }

        if(response.ok) {
          shippingOptions.forEach(method => {
            let delivery = new Date();
            delivery.setDate(today.getDate() + parseInt(method.estimated_days));
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            method.estimated_days = "Estimated delivery " + delivery.toLocaleDateString("en-US", options);
        });
          setShippingMethods(shippingOptions)
        }
      }

      useEffect(() => {
        calculateShipping(shipping);
    }, []);

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
            <div>{`${c.provider} ${c.service_level}`}</div>
            <div>{c.estimated_days}</div>
        </div>
        <div>${c.amount}</div>
    </div>
    ))
    }
    </div>
    <div className="checkout-checkout-container-container">
    <button type="button" onClick={() => selectedShipping ? handleSubmit() : null}>CONTINUE TO PAYMENT</button>    </div>
    </>
  )
}
