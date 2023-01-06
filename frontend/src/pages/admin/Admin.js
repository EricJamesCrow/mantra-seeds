import { useAuthContext } from '../../hooks/useAuthContext';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin'

// styles
import "./Admin.css"

// components
import Overview from "./pages/Overview"
import Orders from "./pages/Orders"
import Products from "./pages/Products"
import Analytics from "./pages/Analytics"


function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export default function Admin() {
  const { user } = useAuthContext()
  const [selectedButton, setSelectedButton] = useState('Overview');
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
      e.preventDefault()

      await login(email, password)
  }

  const handleButtonClick = (label) => {
    setSelectedButton(toTitleCase(label));
    navigate(`#${label.toLowerCase()}`);
  };
  
  const selectedButtonFromURL = window.location.hash.slice(1);

  useEffect(() => {
    const selectedButtonFromURL = window.location.hash.slice(1);
    handleButtonClick(selectedButtonFromURL || 'Overview');
  }, []);
  
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
