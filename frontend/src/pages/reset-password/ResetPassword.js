import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// chakra ui
import { Input } from '@chakra-ui/react'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function ResetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    
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
      <form>
      <div className="login-fields-container">
        <h1>Reset Password</h1>
        <div className="input-fields">
          <div>Email<span className="required-asterisk">*</span></div>
          <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          backgroundColor="white"
          />
        </div>
      </div>
      <div className="input-field-submit-container">
        <button>Send Verification Code</button>
      </div>
      </form>
    </div>
  </div>
  )
}
