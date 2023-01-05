import React, { useState } from 'react'

// material ui
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

// styles
import "./AddProductModel.css"

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Cannabis from "../../../images/cannabis-leaf-green.svg"

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
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [chakra, setChakra] = useState('')
    const [strain, setStrain] = useState('')
    const [thc, setThc] = useState('')

    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const product = {name, description, price, chakra, strain, thc}

        const response = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setName('')
            setDescription('')
            setPrice('')
            setChakra('')
            setStrain('')
            setThc('')
            setError(null)
            console.log('new product added')
        }
    }

  return (
    <>
    <div className="add-product">
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
    <form className="add-product-fields" onSubmit={handleSubmit}>
    <img src={Cannabis} style={{ width: '20%', height: '20%', margin: 'auto' }} />
    <button className="add-product-fields-btn">Upload Image</button>
    <Grid container spacing={3} style={{ padding: '10px 20px' }}>
  <Grid item xs={6}>
    <CssTextField id="outlined-name-input" 
      label="Name" 
      variant="outlined"
      size="small"
      onChange={(e) => setName(e.target.value)}
      value={name}
      style = {{width: "100%", paddingBottom: "5px", marginTop: "10px"}}
    />
  </Grid>
  <Grid item xs={6}>
    <CssTextField id="outlined-description-input" 
      label="Description" 
      variant="outlined"
      size="small"
      onChange={(e) => setDescription(e.target.value)}
      value={description}
      style = {{width: "100%", paddingBottom: "5px", marginTop: "10px"}}
    />
  </Grid>
  <Grid item xs={6}>
    <CssTextField id="outlined-price-input" 
      label="Price" 
      variant="outlined"
      size="small"
      onChange={(e) => setPrice(e.target.value)}
      value={price}
      style = {{width: "100%", paddingBottom: "5px", marginTop: "10px"}}
    />
  </Grid>
  <Grid item xs={6}>
    <CssTextField id="outlined-chakra-input" 
      label="Chakra" 
      variant="outlined"
      size="small"
      onChange={(e) => setChakra(e.target.value)}
      value={chakra}
      style = {{width: "100%", paddingBottom: "5px", marginTop: "10px"}}
    />
  </Grid>
  <Grid item xs={6}>
    <CssTextField id="outlined-strain-input" 
      label="Strain" 
      variant="outlined"
      size="small"
      onChange={(e) => setStrain(e.target.value)}
      value={strain}
      style = {{width: "100%", paddingBottom: "5px", marginTop: "10px"}}
    />
  </Grid>
  <Grid item xs={6}>
    <CssTextField id="outlined-thc-input" 
      label="THC" 
      variant="outlined"
      size="small"
      onChange={(e) => setThc(e.target.value)}
      value={thc}
      style = {{width: "100%", paddingBottom: "5px", marginTop: "10px"}}
    />
  </Grid>
</Grid>
    </form>
    <div className="signup-instead"> 
        <button>SUBMIT</button>
    </div> 
    </>
  )
}
