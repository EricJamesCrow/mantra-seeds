import React from 'react'

// chakra ui
import { Radio } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function Shipping() {
  return (
    <div>
      <div className="checkout-component-container">
        <h1>Select a shipping method</h1>
        <div className="shipping-methods-container">
          <div className="shipping-method-container">
            <Radio/>
            <div className="shipping-type-and-delivery-date-container">
              <div>USPS Priority</div>
              <div>Estimated delivery Tuesday, Jan 24-Thursday, Feb 23</div>
            </div>
            <div>$7.99</div>
          </div>
        </div>
      </div>
      <div className="alternative-link-container shipping">
            <div className="alternative-link">
              <div>Confirm and continue</div>
              <ChevronRightIcon w={6} h={6}/>
            </div>
      </div>
    </div>
  )
}
