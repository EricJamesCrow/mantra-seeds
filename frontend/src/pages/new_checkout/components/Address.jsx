import React from 'react'

// chakra ui
import { Input } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function Address( {setCurrentStep }) {

  const handleClick = () => {
    setCurrentStep(2);
  };

  return (
    <div className="checkout-component-container">
      <h1>Enter your shipping address</h1>
      <form className="checkout-component-form">
        <div className="input-fields">
            <div>First Name<span className="required-asterisk">*</span></div>
            <Input/> 
        </div>
        <div className="input-fields">
            <div>Last Name<span className="required-asterisk">*</span></div>
            <Input/> 
        </div>
        <div className="input-fields">
            <div>Company</div>
            <Input/> 
        </div>
        <div className="input-fields">
            <div>Address<span className="required-asterisk">*</span></div>
            <Input/> 
        </div>
        <div className="input-fields">
            <div>Apartment, suite, etc. (optional)</div>
            <Input/> 
        </div>
        <div className="input-fields">
            <div>City<span className="required-asterisk">*</span></div>
            <Input/> 
        </div>
        <div className="input-fields">
            <div>State<span className="required-asterisk">*</span></div>
            <Input/> 
        </div>
        <div className="input-fields">
            <div>Zip<span className="required-asterisk">*</span></div>
            <Input/> 
        </div>
        <div className="input-fields">
            <div>Phone</div>
            <Input/> 
        </div>
        <h1 className="address-component-header-2">Enter your contact information</h1>
        <div className="input-fields">
              <div>Email<span className="required-asterisk">*</span></div>
              <Input/> 
        </div>
        <div className="alternative-link-container">
            <div className="alternative-link" onClick={handleClick}>
              <div>Confirm and continue</div>
              <ChevronRightIcon w={6} h={6}/>
            </div>
        </div>
      </form>
    </div>
  )
}
