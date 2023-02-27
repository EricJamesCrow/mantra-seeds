import React, { useState, useEffect } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';

// hooks
import useAddToCart from '../hooks/useAddToCart';

import './NewProductPage.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faStar, faHeart } from '@fortawesome/free-solid-svg-icons'

const PRODUCTS_API_URL = '/api/products/'

export default function NewProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState('')
  const user = useSelector(state => state.auth.user);
  const { addToCart } = useAddToCart();
  const navigate = useNavigate();
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
    <div className="admin-orders-details-page-container">
    <button className="details-page-btn" onClick={() => navigate(-1)}>
    <FontAwesomeIcon 
      icon={faChevronLeft} 
      style={{
          color: "#BCBDBC",
          fontSize: "1.15rem",
          cursor: "pointer"}}
      />
    </button>
    <div className="product-details-container">
        <img src={product.image} alt="product-image" className="product-image"/>
        <div className="rating">
        {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon
            key={index}
            icon={faStar}
            style={{
                color: index < 4 ? "#319795" : "#E2E8F0",
                fontSize: "1rem",
            }}
            />
        ))}
        <div className="num-of-reviews">12 reviews</div>
        </div>
        <div className="product-details">
        <div>{product.name}</div>
        <div>{`$${price}`}</div>
        <div>{product.description}</div>
        </div>
        <div className="product-details-page-functionality">
            <div className="adjust-quantity-container">
            <div>Quantity</div>
            <div className="adjust-quantity">
                <button className="adjust-quantity-btn">
                    <div>-</div>
                </button>
                <div>1</div>
                <button className="adjust-quantity-btn">
                    <div>+</div>
                </button>
            </div>
            </div>
            <div className="add-to-favorites">
                <FontAwesomeIcon
                icon={faHeart}
                style={{
                    color: "#E2E8F0",
                    fontSize: "1rem",
                }}
                />
                <div>Add to Favorites</div>
            </div>
        </div>
        <button className="add-to-cart-btn" onClick={() => addToCart(user.id, product._id, 1, product.price)}>Add to Cart</button>
    </div>
  </div>
  )
}
