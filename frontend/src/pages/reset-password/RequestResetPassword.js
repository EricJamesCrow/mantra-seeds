import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// hooks
import useRequestResetPassword from '../../hooks/useRequestResetPassword'

// chakra ui
import { Input } from '@chakra-ui/react'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

// react helmet
import { Helmet } from 'react-helmet-async';

export default function RequestResetPassword() {
    // for back button  
    const navigate = useNavigate();

    // hook
    const { requestResetPassword, isLoading, error, success } = useRequestResetPassword();

    // state
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await requestResetPassword(email);
        if(response === "Password reset link sent to email") {
            setEmail("");
        }
    }
    
  return (
    <div className="login-container admin-orders-details-page-container">
      <Helmet>
        <title>Forgot Password | Mantra Seeds</title>
        <meta
          name="description"
          content="Enter your email and click the link below to request a password reset."
        />
        <link rel="canonical" href="https://mantra-seeds.com/reset-password" />        
      </Helmet>
    <button className="details-page-btn" onClick={() => navigate(-1)}>
      <FontAwesomeIcon 
        icon={faChevronLeft} 
        style={{
            color: "#BCBDBC",
            fontSize: "1.15rem",
            cursor: "pointer"}}
        />
    </button>
    <div className="change-password-wrapper">
      <form onSubmit={handleSubmit}>
      <div className="login-fields-container">
        <h1>Reset Password</h1>
        <div className="input-fields">
          <div>Email<span className="required-asterisk">*</span></div>
          <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          backgroundColor="white"
          />
        </div>
      </div>
      <div className="input-field-submit-container">
        <button type="submit" disabled={isLoading}>Send Verification Code</button>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </div>
      </form>
    </div>
  </div>
  )
}
