import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// hooks
import { useLogin } from '../../hooks/useLogin'

// chakra ui
import { Input } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

// styles
import './Login.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

// react helmet
import { Helmet } from 'react-helmet-async';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if(response === "success") {
      navigate('/profile')
    }
}

  return (
    <div className="login-container">
      <Helmet>
          <title>Log In | Mantra Seeds</title>
          <meta
            name="description"
            content="Access your account to manage your orders and update your profile."
          />        
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
              <h1>Sign In</h1>
              <div className="input-fields">
                <div>Email</div>
                <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                backgroundColor="white"
                aria-label="email"
                />
              </div>
              <div className="input-fields">
                <div>Password</div>
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
              <button disabled={isLoading}>Sign In</button>
              {error && <div className="error-message">{error}</div>}
              <Link to="/reset-password" className="forgot-password" aria-label="Forgot password?">Forgot password?</Link>
            </div>
          </form>
            <div className="alternative-link-container">
                  <h2>Don't have an account?</h2>
                  <Link to="/signup" className="alternative-link" aria-label="Signup">
                    <div>Sign Up</div>
                    <ChevronRightIcon w={6} h={6}/>
                  </Link>
            </div>
      </div>
    </div>
  )
}
