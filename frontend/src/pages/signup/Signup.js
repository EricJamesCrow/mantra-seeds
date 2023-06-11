import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// hooks
import { useSignup } from '../../hooks/useSignup'

// chakra ui
import { Input } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

// styles
import './Signup.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

// react helmet
import { Helmet } from 'react-helmet-async';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await signup(email, password)
    if(response === "success") {
      navigate('/profile')
    }
}

  return (
    <div className="login-container">
      <Helmet>
          <title>Sign Up | Mantra Seeds</title>
          <meta
            name="description"
            content="Create a new account with Mantra Seeds and join our community."
          /> 
          <link rel="canonical" href="https://mantra-seeds.com/signup" />       
      </Helmet>
      <button className="details-page-btn" onClick={() => navigate("/")} aria-label="Return to home page">
        <FontAwesomeIcon 
          icon={faChevronLeft} 
          style={{
              color: "#BCBDBC",
              fontSize: "1.15rem",
              cursor: "pointer"}}
          />
      </button>
      <div className="login-wrapper">
        <form onSubmit={handleSubmit}>
        <div className="login-fields-container">
          <h1>Sign Up</h1>
          <div className="input-fields">
            <div>Email<span className="required-asterisk">*</span></div>
            <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            backgroundColor="white"
            aria-label="email"
            />
          </div>
          <div className="input-fields">
            <div>Password<span className="required-asterisk">*</span></div>
            <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            backgroundColor="white"
            aria-label="password"
            />
          </div>
        </div>
        <div className="input-field-submit-container">
          <div className="terms-and-conditions-wrapper">
            <p>By signing up, you agree to our </p>
            <Link to="/terms-and-conditions" className="forgot-password" aria-label="Terms and Conditions"> Terms and Conditions.</Link>
          </div>
          <button disabled={isLoading}>Create Account</button>
          {error && <div className="error-message">{error}</div>}
          <Link to="/reset-password" className="forgot-password" aria-label="Forgot password?">Forgot password?</Link>
        </div>
        </form>
        <div className="alternative-link-container">
              <h2>Have an account?</h2>
              <Link to="/login" className="alternative-link" aria-label="Log In">
                <div>Sign In</div>
                <ChevronRightIcon w={6} h={6}/>
              </Link>
        </div>
        </div>
    </div>
  )
}
