import React from 'react'
import { useNavigate } from 'react-router-dom'

// styles
import './ChangePassword.css'

// chakra ui
import { Input } from '@chakra-ui/react'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function ChangePassword() {
    const navigate = useNavigate();
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
    <form>
    <div className="login-fields-container">
      <h1>New Password</h1>
      <div className="input-fields">
        <div>Password<span className="required-asterisk">*</span></div>
        <Input
        type="password"
        />
      </div>
      <div className="input-fields">
        <div>Confirm Password<span className="required-asterisk">*</span></div>
        <Input
        type="password"
        />
      </div>
    </div>
    <div className="input-field-submit-container">
      <button>Done</button>
    </div>
    </form>
  </div>
  )
}
