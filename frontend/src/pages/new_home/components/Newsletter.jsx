import React, { useState } from 'react'

// chakra ui
import { Input } from "@chakra-ui/react";

// redux
import { useDispatch } from 'react-redux';
import { setError, setErrorName, setSuccessName, setSuccess } from '../../../redux/slices/notificationsSlice';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    setLoading(true);
    // Call the addToNewsletter API
    try {
      const response = await fetch('/api/recipient/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // handle error
        dispatch(setError(true));
        dispatch(setErrorName(data.message));
        setTimeout(() => {
            dispatch(setError(false));
          }, 100);
      } else {
        // handle success
        console.log(data);
        dispatch(setSuccess(true));
        dispatch(setSuccessName(data.success));
        setTimeout(() => {
            dispatch(setSuccess(false));
          }, 100);
        setEmail('');
      }
      setLoading(false);
    } catch (err) {
      dispatch(setError(true));
      dispatch(setErrorName(err.message));
      setTimeout(() => {
          dispatch(setError(false));
        }, 100);
    }
  }

  return (
    <div className="home-page-content-wrapper newsletter">
      <div className="home-page-header-text-and-link-wrapper-newsletter">
        <div>Sign up for our Newsletter</div>
      </div>
      <div className="newsletter-signup-wrapper">
        <Input 
          variant='outline' 
          className="add-product-input"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
          required={true}
          color="black"
          bg="white"
        />
        <button className="add-to-cart-btn" onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  )
}
