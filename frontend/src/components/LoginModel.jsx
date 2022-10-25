// react
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

// material ui
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

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

export default function LoginModel() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

  return (
    <>
    <div className="log-in-banner">
    <div>LOG IN TO MANTRA SEEDS</div>
    <FontAwesomeIcon
        icon={faXmark} 
        style={{
        color: "#000000",
        fontSize: "1.6rem",
        float: "right",
        marginRight: "10px",
        cursor: "pointer"}}/>
    </div>
    <div className="login-fields">
    <CssTextField id="outlined-email-input" 
               label="Email" 
               variant="outlined"
               type="email"
               style = {{width: 400}}
                onChange={(e) => setEmail(e.target.value)}
                value={email} />
    <div>Help find my account</div>
    <CssTextField id="outlined-password-input" 
               label="Password" 
               variant="outlined" 
                type="password"
                style = {{width: 400}}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
    />
    <div>Help find my password</div>
    </div>
    </>
  )
}
