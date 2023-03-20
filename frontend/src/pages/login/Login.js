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

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
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
        <div className="change-password-wrapper">
        <form onSubmit={handleSubmit}>
        <div className="login-fields-container">
          <h1>Sign In</h1>
          <div className="input-fields">
            <div>Email</div>
            <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
          </div>
          <div className="input-fields">
            <div>Password</div>
            <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
          </div>
        </div>
        <div className="input-field-submit-container">
          <button disabled={isLoading}>Sign In</button>
          {error && <div className="error">{error}</div>}
          <Link to="/reset-password" className="forgot-password">Forgot password?</Link>
        </div>
        </form>
        <div className="alternative-link-container">
              <h1>Don't have an account?</h1>
              <Link to="/signup" className="alternative-link">
                <div>Sign Up</div>
                <ChevronRightIcon w={6} h={6}/>
              </Link>
        </div>
      </div>
    </div>
  )
}
