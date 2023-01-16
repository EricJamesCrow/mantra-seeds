import React from 'react'
import { Link } from 'react-router-dom'

// material ui
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

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

export default function Info( { setSelectedLink }) {
    const shippingDetails = ["First Name", "Last Name", "Company (Optional)", 
    "Address", "Apartment, Suite, etc. (optional)", 
    "City", "State", "ZIP Code", "Phone (optional)"]

  return (
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
    </form>
  )
}
