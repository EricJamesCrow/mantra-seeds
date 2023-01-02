// react
import { useAuthContext } from '../../hooks/useAuthContext';
import React, { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

// styles
import "./Admin.css"

// components
import Overview from "./Overview"
import Orders from "./Orders"
import Products from "./Products"
import Analytics from "./Analytics"

export default function Admin() {
  const { user } = useAuthContext()
  const [selectedButton, setSelectedButton] = useState('Overview');

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const buttonLabels = ['Overview', 'Orders', 'Products', 'Analytics'];

  const handleSubmit = async (e) => {
      e.preventDefault()

      await login(email, password)
  }

  const handleButtonClick = (label) => {
    setSelectedButton(label);
  };
  
  return (
    <>
    {!user && <>
    <div className="admin-login-container">
      <div className="banner-title">Mantra Seeds</div>
      <div className="admin-label">ADMIN</div>
      <div className="admin-login-labels">Username</div>
      <form onSubmit={handleSubmit}>
      <input 
      placeholder="admin" 
      className="admin-input"
      type="email"
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      />
      <div className="admin-login-labels">Password</div>
      <input 
      type="password" 
      placeholder="admin" 
      className="admin-input"
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      />
      <div>
        <button 
        className="admin-login"
        disabled={isLoading}
        >Login</button>
        </div>
        </form>
    </div>
        <div className="copyright">
        <div>© Mantra Seeds 2022</div>
      </div>
      </>}
      {user && user.role === 1 && <>
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-text">ADMIN DASHBOARD</div>
      {['Overview', 'Orders', 'Products', 'Analytics'].map((label) => (
          <button
            className={`admin-button ${selectedButton === label ? 'selected' : ''}`}
            onClick={() => handleButtonClick(label)}
          >
            {label}
          </button>
        ))}
      <>
        {selectedButton === 'Overview' && <Overview/>}
        {selectedButton === 'Orders' && <Orders/>}
        {selectedButton === 'Products' && <Products/>}
        {selectedButton === 'Analytics' && <Analytics/>}
      </>
      </div>
      </>}   
      </>
  )
}
