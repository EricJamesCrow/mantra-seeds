import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// hooks
import { useAuthContext } from '../hooks/useAuthContext';
import useAddToCart from '../hooks/useAddToCart';

// styles
import "./ProductPage.css"

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import Cannabis from "../images/cannabis-leaf-green.svg"

const PRODUCTS_API_URL = '/api/products/'

export default function ProductPage() {
    const { id } = useParams()
    const [product, setProduct] = useState('')
    const { user } = useAuthContext() // JWT token in local storage
    const { addToCart } = useAddToCart();
    const price = (product.price/100).toFixed(2)

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
  <div className="add-to-cart-shop" 
  onClick={() => addToCart(user.id, product._id, 1, product.price)}
  >
        <FontAwesomeIcon className="cart-icon" icon={faCartPlus} style={{color: "#ECEBE8"}}></FontAwesomeIcon>
        <div className="add-to-cart-text-shop">Add to Cart</div>
        </div>
        <div>{`$${price}`}</div>
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
