import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProductsContext } from "../../../hooks/useProductsContext";

// material ui
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

// styles
import "./EditProductModel.css"

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Cannabis from "../../../images/cannabis-leaf-green.svg"

export default function EditProductModel() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [chakra, setChakra] = useState('')
    const [strain, setStrain] = useState('')
    const [thc, setThc] = useState('')

    const [error, setError] = useState(null)

    // useParams
    const { id } = useParams()
    const [product, setProduct] = useState('')

    useEffect(() => {
        const url = '/api/products/'+id;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setProduct(data)
            })
    }, [])
      
  return (
    <>
    <div style={{ position: 'fixed', top: 50, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
    <div className="add-product">
    <div>{product.name}</div>
    <FontAwesomeIcon
          icon={faXmark} 
          style={{
            color: "#000000",
            fontSize: "1.6rem",
            float: "right",
            marginRight: "10px",
            cursor: "pointer"
          }} 
        />
    </div>
    <div className="add-product-fields">
    <form>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
    <div className="edit-product-image-border">
  <img src={Cannabis} />
  </div>
</div>
<div className="signup-instead"> 
        <button>SAVE CHANGES</button>
    </div> 
    </form>
    </div>
    </div>
    </>
  )
}
