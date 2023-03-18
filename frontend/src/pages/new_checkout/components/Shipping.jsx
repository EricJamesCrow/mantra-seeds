import React, { useEffect, useState } from 'react'

// chakra ui
import { Center, Radio, RadioGroup, Spinner } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

// redux
import { updateShipping } from '../../../redux/slices/shippingSlice';

export default function Shipping( { setCurrentStep, shipping, dispatch } ) {
  const [ shippingMethods, setShippingMethods ] = useState([]);
  const [ selectedShipping, setSelectedShipping ] = useState(null);

  const handleShippingSelection = (value) => {
    setSelectedShipping(shippingMethods[value]);
  };

  const handleSubmit = () => {
    dispatch(updateShipping({
      shippingName: `${selectedShipping.provider} ${selectedShipping.service_level}`,
      shippingPrice: selectedShipping.amount
    }));
    setCurrentStep(3);
  }

  // Shipping API
  const calculateShipping = async (shipping) => {
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
        const today = new Date();
        let delivery = new Date();
        delivery.setDate(today.getDate() + parseInt(method.estimated_days));
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        method.estimated_days = "Estimated delivery " + delivery.toLocaleDateString("en-US", options);
    });
      setShippingMethods(shippingOptions);
    }
  };

  useEffect(() => {
    calculateShipping(shipping);
  }, [shipping]);

  return (
    <div>
      <div className="checkout-component-container">
        <h1>Select a shipping method</h1>
        <div className="shipping-methods-container">
        {shippingMethods.length === 0 ? (
    <Center>
      <Spinner />
    </Center>
      ) : (
        <RadioGroup onChange={handleShippingSelection} value={shippingMethods.indexOf(selectedShipping)}>
          {shippingMethods.map((c, index) => (
            <div key={index} className="shipping-method-container">
              <Radio value={index} style={{marginRight: "1rem"}}>
                <div className="radio-container">
                  <div className="shipping-type-and-delivery-date-container">
                    <div>{`${c.provider} ${c.service_level}`}</div>
                    <div>{c.estimated_days}</div>
                  </div>
                  <div>${c.amount}</div>
                </div>
              </Radio>
            </div>
          ))}
        </RadioGroup>
        )}
        </div>
      </div>
      <div className="alternative-link-container shipping">
            <div className="alternative-link" onClick={() => selectedShipping ? handleSubmit() : null}>
              <div>Confirm and continue</div>
              <ChevronRightIcon w={6} h={6}/>
            </div>
      </div>
    </div>
  )
}
