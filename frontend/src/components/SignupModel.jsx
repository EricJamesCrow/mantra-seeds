// react
import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';


// material ui
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';

// styles
import "./SignupModel.css"

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

export default function LoginModel( { showSignupFields, setShowSignup } ) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()
    const { user } = useAuthContext()
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
    <form className="login-fields" handleSubmit={handleSubmit}>
    <div style={{width: "90%"}}>
    <CssTextField id="outlined-email-input" 
               label="Email" 
               variant="outlined"
               type="email"
               style = {{width: "100%", paddingBottom: "5px"}}
                onChange={(e) => setEmail(e.target.value)}
                value={email} />
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
    </div>
    <div style={{ display: "flex", alignItems: "center", color: "#454545", marginRight: "auto"}}>
    <Checkbox 
    disableElevation
    disableRipple/>
    <Link>I agree to the terms and conditions.</Link>
    </div>
    <button disabled={isLoading}>CREATE ACCOUNT</button>
    </form>
    <div className="signup-instead">
        <div>Have an account?</div>
        <button onClick={showSignupFields}>Log in</button>
    </div>
    </>
  )
}
