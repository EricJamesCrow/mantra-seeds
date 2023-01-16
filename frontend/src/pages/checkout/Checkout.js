import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCartContext } from '../../hooks/useCartContext'
import { useNavigate } from 'react-router-dom';

// styles
import "./Checkout.css"

// material ui
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

// stripe component
import StripeContainer from '../../stripe/StripeContainer'

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#black',
    },
    '& .MuiInput-underline:after': {
    //   borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        // borderColor: 'red',
      },
      '&:hover fieldset': {
        // borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#black',
      },
    },
  });


export default function Checkout() {
  const { user } = useAuthContext() // JWT token in local storage
  const { cartItems, dispatch } = useCartContext()
  const [selectedLink, setSelectedLink] = useState("INFO");
  const checkoutLinks = ["CART", "INFO", "SHIPPING", "PAYMENT"]
  const shippingDetails = ["First Name", "Last Name", "Company (Optional)", 
                        "Address", "Apartment, Suite, etc. (optional)", 
                        "City", "State", "ZIP Code", "Phone (optional)"]
  const shippingMethods = ["USPS Priority", "USPS Next Day Air"]
  const navigate = useNavigate();


    useEffect(() => {
      const fetchCart = async () => {
        const response = await fetch('/api/carts/'+user.cart)
        const json = await response.json()

        if (response.ok) {
          dispatch({type: 'SET_CART', payload: json.cartItems})
        }
      }
      if(user) {
        fetchCart()
      }
    }, [user])

    useEffect(() => {
        if(selectedLink === 'CART') {
            navigate('/cart')
        }
        window.scrollTo(0, 0);
    }, [selectedLink])

  return (
    <>
    <div style={{ marginTop: '50px', zIndex: 1 }}>
    <div className="checkout-header-container">
    <div>CHECKOUT</div>
    <div className="checkout-header-links">
    {checkoutLinks.map(c => (
        <button
        className={selectedLink === c ? 'selected-checkout-link' : null}
        onClick={() => setSelectedLink(c)}
        >{c}</button>
    ))}
    </div>
    </div>
    {selectedLink === 'INFO' &&
    <form className="shipping-details-form">
    <div>
        <div>CONTACT INFORMATION</div>
        <div>Already have an account? Log in</div>
    </div>
    <CssTextField id="outlined-email-input" 
               label="Email" 
               variant="outlined"
               type="email"
               style = {{width: "90%", paddingBottom: "5px", marginLeft: "1rem", marginTop: "0.2rem"}} />
    <div className="shipping-address-label">SHIPPING ADDRESS</div>
    {shippingDetails.map(e => (
    <CssTextField 
    label={e}
    variant="outlined"
    style = {{width: "90%", paddingBottom: "1rem", marginLeft: "1rem"}} />
    ))}
    <div className="checkout-checkout-container-container">
    <Link type="button" onClick={() => setSelectedLink("SHIPPING")}>CONTINUE TO SHIPPING</Link>
    </div>
    </form>}
    {selectedLink === 'SHIPPING' &&
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
    <Link type="button" onClick={() => setSelectedLink("PAYMENT")}>CONTINUE TO PAYMENT</Link>
    </div>
    </>
    }
    {selectedLink === "PAYMENT" &&
        <StripeContainer/>
    }
    </div>
    </>
  )
}
