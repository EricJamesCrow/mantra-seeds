import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// chakra ui
import { CheckCircleIcon } from '@chakra-ui/icons';

// components
import Address from './components/Address';
import Shipping from './components/Shipping';
import Payment from './components/Payment';

// styles
import './Checkout.css';

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { shipping } = useSelector((state) => state.shipping);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div
          className="checkout-step-container"
          onClick={() => {
            if (maxStep >= 1) setCurrentStep(1);
          }}
        >
          {maxStep >= 2 ? (
            <CheckCircleIcon color="green.500" h={5} w={5} />
          ) : (
            <div className="checkout-circle selected">1</div>
          )}
          <div>Address</div>
        </div>
        <div
          className="checkout-step-container"
          onClick={() => {
            if (maxStep >= 2) setCurrentStep(2);
          }}
        >
          {maxStep >= 3 ? (
            <CheckCircleIcon color="green.500" h={5} w={5} />
          ) : (
            <div
              className={
                currentStep === 2
                  ? 'checkout-circle selected'
                  : 'checkout-circle'
              }
            >
              2
            </div>
          )}
          <div>Shipping</div>
        </div>
        <div
          className="checkout-step-container"
          onClick={() => {
            if (maxStep >= 3) setCurrentStep(3);
          }}
        >
          {maxStep >= 4 ? (
            <CheckCircleIcon color="green.500" h={5} w={5} />
          ) : (
            <div
              className={
                currentStep === 3
                  ? 'checkout-circle selected'
                  : 'checkout-circle'
              }
            >
              3
            </div>
          )}
          <div>Payment</div>
        </div>
      </div>
      {currentStep === 1 && (
        <Address
          setCurrentStep={(step) => {
            setCurrentStep(step);
            setMaxStep(Math.max(maxStep, step));
          }}
          shipping={shipping}
          dispatch={dispatch}
        />
      )}
      {currentStep === 2 && (
        <Shipping
          setCurrentStep={(step) => {
            setCurrentStep(step);
            setMaxStep(Math.max(maxStep, step));
          }}
          shipping={shipping}
          dispatch={dispatch}
        />
      )}
      {currentStep === 3 && (
        <Payment
          setCurrentStep={(step) => {
            setCurrentStep(step);
            setMaxStep(Math.max(maxStep, step));
          }}
          shipping={shipping}
          cart={cart}
          user={user}
        />
      )}
    </div>
  );
}
