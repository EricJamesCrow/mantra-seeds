import React, { useState, useEffect } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from '../hooks/useAuthContext';

// styles
import "./ProductPage.css"

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import Cannabis from "../images/cannabis-leaf-green.svg"
import Crown from "../images/chakras/crown-chakra.svg"

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
    
    const [productAttributes, setProductAttributes] = useState({
      "Price": product.price,
      "Strain": product.strain,
      "THC": product.thc
    })

    const navigate = useNavigate();

    const { user } = useAuthContext() // JWT token in local storage

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
    <div className="view-product">
    <div>{product.name}</div>
    <div className="view-product-quantity">IN STOCK</div>
    </div>
    <div className="view-product-fields">
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
    <div className="view-product-image-border">
  <img src={Cannabis} />
  </div>
  <div className="view-product-description-border">
  <div>{product.description}</div>
  </div>
  <div className="view-product-attributes-container">
  <div className="add-to-cart-shop">
        <FontAwesomeIcon className="cart-icon" icon={faCartPlus} style={{color: "#ECEBE8"}}></FontAwesomeIcon>
        <div className="add-to-cart-text-shop">Add to Cart</div>
        </div>
        <div>{`$${product.price}`}</div>
  </div>
</div>
<div className="reviews">
  <div>Reviews (0)</div> 
  <button>Write a review</button>
    </div> 
    </div>
    </div>
    </>
  )
}
