// react
import { useAuthContext } from '../../hooks/useAuthContext';
import React from "react"

// styles
import "./Admin.css"

export default function Admin() {
  const { user } = useAuthContext()

  console.log(user)
  
  return (
    <>
    {user && <>
    <div className="admin-login-container">
      <div className="banner-title">Mantra Seeds</div>
      <div className="admin-label">ADMIN</div>
      <div className="admin-login-labels">Username</div>
      <input placeholder="admin" className="admin-input"/>
      <div className="admin-login-labels">Password</div>
      <input type="password" placeholder="admin" className="admin-input"/>
      <div>
        <button className="admin-login">Login</button>
        </div>
    </div>
        <div className="copyright">
        <div>© Mantra Seeds 2022</div>
      </div>
      </>}   
      </>
  )
}
