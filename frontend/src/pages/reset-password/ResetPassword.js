import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// hooks
import useResetPassword from '../../hooks/useResetPassword'

// chakra ui
import { Input } from '@chakra-ui/react'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function ResetPassword() {
    // for back button  
    const navigate = useNavigate();

    // hook
    const { resetPassword, isLoading, error, success } = useResetPassword();

    // state
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await resetPassword(email);
        if(response === "Password reset link sent to email") {
            setEmail("");
        }
    }
    
  return (
    <div className="login-container admin-orders-details-page-container">
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
