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

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password)
    navigate('/profile')
}

  return (
    <div className="login-container">
      <button className="details-page-btn" onClick={() => navigate(-1)}>
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
            />
          </div>
          <div className="input-fields">
            <div>Password<span className="required-asterisk">*</span></div>
            <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
          </div>
        </div>
        <div className="input-field-submit-container">
          <button disabled={isLoading}>Create Account</button>
          {error && <div className="error">{error}</div>}
          <Link to="/reset-password" className="forgot-password">Forgot password?</Link>
        </div>
        </form>
        <div className="alternative-link-container">
              <h1>Have an account?</h1>
              <Link to="/login" className="alternative-link">
                <div>Sign In</div>
                <ChevronRightIcon w={6} h={6}/>
              </Link>
        </div>
        </div>
    </div>
  )
}
