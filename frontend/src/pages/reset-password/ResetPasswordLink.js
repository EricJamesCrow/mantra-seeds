import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// hooks
import useResetPassword from '../../hooks/useResetPassword'

// chakra ui
import { Input } from '@chakra-ui/react'

const CUSTOMERS_API_URL = '/api/user'

export default function ChangePassword() {
  const navigate = useNavigate();
  const { id } = useParams()

  // hook
  const { resetPassword, isLoading, error, success } = useResetPassword();

  // states
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    const checkToken = async () => {
        const response = await fetch(`${CUSTOMERS_API_URL}/check-reset-password-token/${id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });
        if(!response.ok) {
            navigate("*")
        }
    }
    checkToken();
  } , [])

  // form submit
  const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await resetPassword(id, newPassword, confirmNewPassword);
      if(response === "Password changed successfully") {
        setNewPassword("");
        setConfirmNewPassword("");
        setTimeout(() => {
           navigate("/login")
        }, 1500)
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
