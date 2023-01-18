import React, { useState, useEffect } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { useProductsContext } from "../../../hooks/useProductsContext";
import { useAuthContext } from '../../../hooks/useAuthContext';

// styles
import "./EditProductModel.css"

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Cannabis from "../../../images/cannabis-leaf-green.svg"
import Crown from "../../../images/chakras/crown-chakra.svg"

const PRODUCTS_API_URL = '/api/products/'

export default function EditProductModel() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [chakra, setChakra] = useState('')
    const [strain, setStrain] = useState('')
    const [thc, setThc] = useState('')

    const { id } = useParams()
    const [product, setProduct] = useState('')
    const { dispatchProducts } = useProductsContext()
    
    const [productAttributes, setProductAttributes] = useState({
      "Price": product.price,
      "Strain": product.strain,
      "THC": product.thc
    })

    const navigate = useNavigate();

    const { user } = useAuthContext() // JWT token in local storage
    const token = user.token;

    const handleDelete = async () => {
        const response = await fetch(PRODUCTS_API_URL + product._id, {
            method: 'DELETE',
            headers: {
              'Authorization': `${token}` // set the authorization header
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatchProducts({type: 'DELETE_PRODUCT', payload: json})
            navigate(-1); // Won't navigate to previous page if refresh is hit first.
        }
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
    
      const response = await fetch(PRODUCTS_API_URL + product._id, {
        method: 'PATCH',
        headers: { 
          "Authorization": token,
          "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price, chakra, strain, thc })
      })
      const json = await response.json()
    
      if (response.ok) {
        dispatchProducts({ type: 'UPDATE_PRODUCT', payload: json })
        navigate(-1) // Won't navigate to previous page if refresh is hit first.
      }
    }

    useEffect(() => {
        const url = PRODUCTS_API_URL+id;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setProduct(data)
            })
    }, [id])

    useEffect(() => {
      setProductAttributes({"Price": product.price, "Strain": product.strain, "THC": product.thc})
      setName(product.name)
      setDescription(product.description)
      setPrice(product.price)
      setChakra(product.chakra)
      setStrain(product.strain)
      setThc(product.thc)
    }, [product])
      
  return (
    <>
    <div style={{ marginTop: '50px', zIndex: 1 }}>
    <div className="edit-product">
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
  <div className="edit-product-attribute">
    <div contentEditable="true" onBlur={(e) => {
      switch(key) {
        case "Price":
          setPrice(e.target.innerText);
          break;
        case "Strain":
          setStrain(e.target.innerText);
          break;
        case "THC":
          setThc(e.target.innerText);
          break;
        default:
          break;
      }
    }}>{key}: {value}</div>
    <button className="edit-product-attribute-edit" onClick={(e) => e.preventDefault()}>edit</button>
  </div>
))}

    </div>
  </div>
  <button className="remove-product-btn" onClick={handleDelete}>REMOVE</button>
</div>
<div className="save-changes"> 
        <button onClick={handleSubmit}>SAVE CHANGES</button>
    </div> 
    </form>
    </div>
    </div>
    </>
  )
}
