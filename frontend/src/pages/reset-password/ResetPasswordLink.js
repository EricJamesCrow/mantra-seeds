import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

// hooks
import useResetPassword from '../../hooks/useResetPassword'

// chakra ui
import { Input } from '@chakra-ui/react'

export default function ChangePassword() {
  const { id } = useParams()

  // hook
  const { resetPassword, isLoading, error, success } = useResetPassword();

  // states
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // form submit
  const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await resetPassword(id, newPassword, confirmNewPassword);
      if(response === "Password changed successfully") {
        setNewPassword("");
        setConfirmNewPassword("");
      }
    };

  return (
      <div className="login-container admin-orders-details-page-container">
      <div className="change-password-wrapper">
        <form onSubmit={handleSubmit}>
        <div className="login-fields-container">
          <h1>New Password</h1>
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
