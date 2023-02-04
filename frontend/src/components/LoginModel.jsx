// react
import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link, useNavigate } from 'react-router-dom'

// redux
import { useSelector } from 'react-redux';

// material ui
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';

// styles
import "./LoginModel.css"

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#00D0C8',
    },
    '& .MuiInput-underline:after': {
    //   borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        // borderColor: 'red',
      },
      '&:hover fieldset': {
        // borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00D0C8',
      },
    },
  });

export default function LoginModel( { showSignupFields, setShowLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
    const user = useSelector(state => state.auth.user);
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
        navigate('/profile')
        if(user) {
          setShowLogin(false) 
        }
    }

    const handleClose = () => {
        setShowLogin(false)
    }

  return (
    <>
    <div className="log-in-banner">
    <div>LOG IN TO MANTRA SEEDS</div>
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
    <CssTextField id="outlined-email-input" 
               label="Email" 
               variant="outlined"
               type="email"
               style = {{width: "100%", paddingBottom: "5px"}}
                onChange={(e) => setEmail(e.target.value)}
                value={email} />
    <Link>Help find my account</Link>
    </div>
    <div style = {{width: "90%", paddingTop: "20px"}}>
    <CssTextField id="outlined-password-input" 
               label="Password" 
               variant="outlined" 
                type="password"
                style = {{width: "100%", paddingBottom: "5px"}}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
    />
    <Link>Help find my password</Link>
    </div>
    <div style={{ display: "flex", alignItems: "center", color: "#454545", marginRight: "auto"}}>
    <Checkbox 
    disableElevation
    disableRipple/>
    <div>Remember my email</div>
    </div>
    <button disabled={isLoading}>LOG IN</button>
    {error && <div className="error">{error}</div>}
    </form>
    <div className="signup-instead">
        <div>Don't have an account?</div>
        <button onClick={showSignupFields}>Sign up</button>
    </div>
    </>
  )
}
