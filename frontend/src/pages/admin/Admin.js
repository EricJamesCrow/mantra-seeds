// react
import { useAuthContext } from '../../hooks/useAuthContext';
import React, { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

// styles
import "./Admin.css"

export default function Admin() {
  const { user } = useAuthContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
      e.preventDefault()

      await login(email, password)
  }
  
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
    <div className="admin-login-container">
      <div className="banner-title">Mantra Seeds</div>
      <div className="admin-label">YOU ARE ADMIN</div>
    </div>
        <div className="copyright">
        <div>© Mantra Seeds 2022</div>
      </div>
      </>}   
      </>
  )
}
