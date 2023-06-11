import React from 'react'
import { Link } from 'react-router-dom';

// styles
import './NotFound.css'
import './InvalidToken.css'

// react helmet
import { Helmet } from 'react-helmet-async';

export default function InvalidToken() {
  return (
    <div className="error-page-container">
        <Helmet>
          <title>Invalid Token | Mantra Seeds</title>
          <meta
            name="description"
            content="Sorry, the password reset link you clicked is invalid or has expired. Please request a new password reset link by clicking here."
          />        
        </Helmet>
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
