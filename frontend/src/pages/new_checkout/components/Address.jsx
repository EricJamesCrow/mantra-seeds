import React, { useState, useEffect } from 'react'


// redux
import { setShipping } from '../../../redux/slices/shippingSlice';

// chakra ui
import { Input } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function Address( {setCurrentStep, shipping, dispatch }) {

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { email, firstName, lastName, company, address, apt, city, state, zip, phone };
    dispatch(setShipping(formData));
    setCurrentStep(2);
  };

  return (
    <div className="address-wrapper">
    <form className="checkout-component-form" onSubmit={handleSubmit}> 
    <div className="checkout-component-container address"> 
      <div className="shipping-address-wrapper">
        <h1>Enter your shipping address</h1>
          <div className="input-fields">
              <div>First Name<span className="required-asterisk">*</span></div>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} aria-label="First Name" required/> 
          </div>
          <div className="input-fields">
              <div>Last Name<span className="required-asterisk">*</span></div>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} aria-label="Last Name" required/> 
          </div>
          <div className="input-fields">
              <div>Company</div>
              <Input value={company} onChange={(e) => setCompany(e.target.value)} aria-label="Company"/> 
          </div>
          <div className="input-fields">
              <div>Address<span className="required-asterisk">*</span></div>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} aria-label="Address" required/> 
          </div>
          <div className="input-fields">
              <div>Apartment, suite, etc. (optional)</div>
              <Input value={apt} onChange={(e) => setApt(e.target.value)} aria-label="Apartment, suite, etc. (optional)"/> 
          </div>
          <div className="input-fields">
              <div>City<span className="required-asterisk">*</span></div>
              <Input value={city} onChange={(e) => setCity(e.target.value)} aria-label="City" required/> 
          </div>
          <div className="input-fields">
              <div>State<span className="required-asterisk">*</span></div>
              <Input value={state} onChange={(e) => setState(e.target.value)} aria-label="State" required/> 
          </div>
          <div className="input-fields">
              <div>Zip<span className="required-asterisk">*</span></div>
              <Input value={zip} onChange={(e) => setZip(e.target.value)} aria-label="Zip" required/> 
          </div>
          <div className="input-fields">
              <div>Phone</div>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} aria-label="Phone"/> 
          </div>     
      </div>
      <div className="contact-wrapper">
            <h1 className="address-component-header-2">Enter your contact information</h1>
            <div className="input-fields">
                  <div>Email<span className="required-asterisk">*</span></div>
                  <Input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required={true}
                  aria-label="Email"
                  /> 
            </div>
            <div className="alternative-link-container">
                <button type="submit" className="alternative-link" aria-label="Confirm and continue">
                  <div>Confirm and continue</div>
                  <ChevronRightIcon w={6} h={6}/>
                </button>
            </div>
          </div>
    </div>
    </form>
    </div>
  )
}
