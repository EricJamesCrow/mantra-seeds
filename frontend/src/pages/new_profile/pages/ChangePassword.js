import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// hooks
import useChangePassword from '../../../hooks/useChangePassword'

// styles
import './ChangePassword.css'

// chakra ui
import { Input } from '@chakra-ui/react'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function ChangePassword() {
  // for back button  
  const navigate = useNavigate();

  // hook
  const { changePassword, isLoading, error, success } = useChangePassword();

  // states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // form submit
  const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await changePassword(oldPassword, newPassword, confirmNewPassword);
      if(response === "Password changed successfully") {
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
    };

  return (
      <div className="login-container admin-orders-details-page-container">
      <button className="details-page-btn" onClick={() => navigate("/profile")}>
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
          <h1>New Password</h1>
          <div className="input-fields">
            <div>Old Password<span className="required-asterisk">*</span></div>
            <Input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)} 
            required
            />
          </div>
          <div className="input-fields">
            <div>New Password<span className="required-asterisk">*</span></div>
            <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} 
            required
            />
          </div>
          <div className="input-fields">
            <div>Confirm New Password<span className="required-asterisk">*</span></div>
            <Input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)} 
            required
            />
          </div>
        </div>
        <div className="input-field-submit-container change-password">
          <button type="submit" disabled={isLoading}>Done</button>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
        </div>
        </form>
      </div>
    </div>
  )
}
