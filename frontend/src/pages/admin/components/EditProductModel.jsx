import React, { useState, useEffect } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { useProductsContext } from "../../../hooks/useProductsContext";

// styles
import "./EditProductModel.css"

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Cannabis from "../../../images/cannabis-leaf-green.svg"
import Crown from "../../../images/chakras/crown-chakra.svg"

export default function EditProductModel() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [chakra, setChakra] = useState('')
    const [strain, setStrain] = useState('')
    const [thc, setThc] = useState('')

    const { id } = useParams()
    const [product, setProduct] = useState('')
    const { dispatch } = useProductsContext()
    
    var productAttributes = {
      "Price": product.price,
      "Strain": product.strain,
      "THC": product.thc
    }

    const navigate = useNavigate();

    const handleDelete = async () => {
        const response = await fetch('/api/products/' + product._id, {
            method: 'DELETE',
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_PRODUCT', payload: json})
            navigate(-1); // Won't navigate to previous page if refresh is hit first.
        }
    }


    useEffect(() => {
        const url = '/api/products/'+id;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setProduct(data)
            })
    }, [id])

    useEffect(() => {
      productAttributes = {"Price": product.price, "Strain": product.strain, "THC": product.thc}
    }, [product])
      
  return (
    <>
    <div style={{ marginTop: '50px', zIndex: 1 }}>
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
          onClick={() => navigate(-1)}
        />
    </div>
    <div className="edit-product-fields">
    <form>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
    <div className="edit-product-image-border">
        <button onClick={(e) => e.preventDefault()}>edit</button>
  <img src={Cannabis} />
  </div>
  <div className="edit-product-description-border">
        <button onClick={(e) => e.preventDefault()}>edit</button>
  <div>{product.description}</div>
  </div>
  <div className="edit-product-attributes-container">
    <img className="edit-product-chakra" src={Crown}>
    </img>
    <div className="edit-product-attribute-btns">
    {Object.entries(productAttributes).map(([key, value]) => (
  <div className="edit-product-attribute" onClick={() => console.log(productAttributes)}>
    <div>{key}: {value}</div>
    <button className="edit-product-attribute-edit" onClick={(e) => e.preventDefault()}>edit</button>
  </div>
))}
    </div>
  </div>
  <button className="remove-product-btn" onClick={handleDelete}>REMOVE</button>
</div>
<div className="save-changes"> 
        <button onClick={(e) => e.preventDefault()}>SAVE CHANGES</button>
    </div> 
    </form>
    </div>
    </div>
    </>
  )
}
