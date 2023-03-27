import React from 'react'
import { Link } from 'react-router-dom';

// styles
import './NotFound.css'
import './InvalidToken.css'

export default function InvalidToken() {
  return (
    <div className="error-page-container">
        <div className="not-found-container">
            <h1>400</h1>
            <h2>Invalid Token</h2>
            <p>The password reset link you clicked is invalid or has expired.
            Please request a new password reset link by <Link to="/reset-password" className="invalid-token-link">clicking here.</Link>
            </p>
        </div>
    </div>
  )
}
