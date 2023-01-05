import React from 'react'

// material ui
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';

// styles
import "./AddProductModel.css"

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

export default function AddProductModel({ setShowAddProduct }) {
  return (
    <>
    <div className="log-in-banner">
    <div>ADD PRODUCT</div>
    <FontAwesomeIcon
          icon={faXmark} 
          style={{
            color: "#000000",
            fontSize: "1.6rem",
            float: "right",
            marginRight: "10px",
            cursor: "pointer"
          }}
          onClick={() => setShowAddProduct(false)} // toggle showAddProduct when close button is clicked
        />
    </div>
    <form className="login-fields">
    <div style={{width: "90%"}}>
    <CssTextField id="outlined-email-input" 
               label="Email" 
               variant="outlined"
               type="email"
               style = {{width: "100%", paddingBottom: "5px"}}/>
    </div>
    <div style = {{width: "90%", paddingTop: "20px"}}>
    <CssTextField id="outlined-password-input" 
               label="Password" 
               variant="outlined" 
                type="password"
                style = {{width: "100%", paddingBottom: "5px"}}
    />
    </div>
    <div style={{ display: "flex", alignItems: "center", color: "#454545", marginRight: "auto"}}>
    <Checkbox 
    disableElevation
    disableRipple/>
    <div>Remember my email</div>
    </div>
    <button>LOG IN</button>
    </form>
    <div className="signup-instead">
        <div>Don't have an account?</div>
        <button>SUBMIT</button>
    </div>
    </>
  )
}
