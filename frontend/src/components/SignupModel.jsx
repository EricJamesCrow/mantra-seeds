// react
import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';


// chakra ui
import { Checkbox } from '@chakra-ui/react'
import { Input } from "@chakra-ui/react";

// styles
import "./SignupModel.css"

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function LoginModel( { showSignupFields, setShowSignup } ) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()
    const user = useSelector(state => state.auth.user);
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
        navigate('/profile')
        if(user) {
          setShowSignup(false)
        }
    }

    const handleClose = () => {
      setShowSignup(false)
    }

  return (
    <>
    <div className="log-in-banner">
    <div>SIGN UP</div>
    <FontAwesomeIcon
        onClick={handleClose}
        icon={faXmark} 
        style={{
        color: "#000000",
        fontSize: "1.6rem",
        float: "right",
        marginRight: "10px",
        cursor: "pointer"}}/>
    </div>
    <form className="login-fields" onSubmit={handleSubmit}>
    <div style={{width: "90%"}}>
    <Input id="outlined-email-input" 
               label="Email" 
               variant="outlined"
               type="email"
               style = {{width: "100%", paddingBottom: "5px"}}
                onChange={(e) => setEmail(e.target.value)}
                value={email} />
    </div>
    <div style = {{width: "90%", paddingTop: "20px"}}>
    <Input id="outlined-password-input" 
               label="Password" 
               variant="outlined" 
                type="password"
                style = {{width: "100%", paddingBottom: "5px"}}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
    />
    </div>
    <div style={{ display: "flex", alignItems: "center", color: "#454545", marginRight: "auto"}}>
    <Checkbox />
    <Link>I agree to the terms and conditions.</Link>
    </div>
    <button disabled={isLoading}>CREATE ACCOUNT</button>
    {error && <div className="error">{error}</div>}
    </form>
    <div className="signup-instead">
        <div>Have an account?</div>
        <button onClick={showSignupFields}>Log in</button>
    </div>
    </>
  )
}
