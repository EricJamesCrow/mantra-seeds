import React, { useState, useEffect } from 'react'

// material ui
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

// hooks
import { useShippingContext } from '../../../hooks/useShippingContext';

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
    const { shipping, dispatch } = useShippingContext();

    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [address, setAddress] = useState("");
    const [apt, setApt] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState("");

    const shippingDetailsMap = [
      { label: "First Name", value: firstName, setValue: setFirstName },
      { label: "Last Name", value: lastName, setValue: setLastName },
      { label: "Company (optional)", value: company, setValue: setCompany },
      { label: "Address", value: address, setValue: setAddress },
      { label: "Apartment, Suite, etc. (optional)", value: apt, setValue: setApt },
      { label: "City", value: city, setValue: setCity },
      { label: "State", value: state, setValue: setState },
      { label: "ZIP Code", value: zip, setValue: setZip },
      { label: "Phone (optional)", value: phone, setValue: setPhone },
    ];
    

    const submitForm = (event) => {
      event.preventDefault();
      const formData = { email, firstName, lastName, company, address, apt, city, state, zip, phone };
      dispatch({ type: 'SET_SHIPPING', payload: formData });
      setSelectedLink("SHIPPING")
    }

    useEffect(() => {
      try {
      setEmail(shipping.email);
      setFirstName(shipping.firstName);
      setLastName(shipping.lastName);
      setCompany(shipping.company);
      setAddress(shipping.address);
      setApt(shipping.apt);
      setCity(shipping.city);
      setState(shipping.state);
      setZip(shipping.zip);
      setPhone(shipping.phone);
    } catch (e) {
      console.log(e)
    }
      }, [shipping])

  return (
    <form className="shipping-details-form" onSubmit={submitForm}>
    <div>
        <div>CONTACT INFORMATION</div>
        <div>Already have an account? Log in</div>
    </div>
    <CssTextField id="outlined-email-input" 
            label="Email" 
            variant="outlined"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required={true}
            style = {{width: "90%", paddingBottom: "5px", marginLeft: "1rem", marginTop: "0.2rem"}} />
    <div className="shipping-address-label">SHIPPING ADDRESS</div>
    {shippingDetailsMap.map(({ label, value, setValue }) => (
    <CssTextField 
    label={label}
    variant="outlined"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    required={!label.includes("optional")}
    style = {{width: "90%", paddingBottom: "1rem", marginLeft: "1rem"}} 
    />
    ))}
    <div className="checkout-checkout-container-container">
    <button type="submit">CONTINUE TO SHIPPING</button>
    </div>
    </form>
  )
}
