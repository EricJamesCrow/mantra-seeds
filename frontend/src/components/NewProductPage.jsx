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
  const [quantity, setQuantity] = useState(1)

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

    const handleQuantityIncrease = () => {
        setQuantity(quantity + 1)
    }

    const handleQuantityDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

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
        <div className="product-details-information-container">
        <div className="rating">
        {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon
            key={index}
            icon={faStar}
            style={{
                color: index < 4 ? "#669c54" : "#E2E8F0",
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
                <button className="adjust-quantity-btn" onClick={handleQuantityDecrease}>
                    <div>-</div>
                </button>
                <div>{quantity}</div>
                <button className="adjust-quantity-btn" onClick={handleQuantityIncrease}>
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
        <button className="add-to-cart-btn" onClick={() => addToCart(user.id, product._id, quantity, product.price)}>Add to Cart</button>
        </div>
        <div className="reviews-container">
            <div>Reviews</div>
            <div className="average-rating-container">
                <div className="average-rating">4.3</div>
                <div className="average-stars-and-num-of-reviews">
                    <div>
                        {[...Array(5)].map((_, index) => (
                            <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            style={{
                                color: index < 4 ? "#669c54" : "#E2E8F0",
                                fontSize: "1rem",
                            }}
                            />
                        ))}
                    </div>
                    <div>Based on 12 reviews</div>
                </div>
            </div>
            <div className="reviews-btns-container">
                <button>See all reviews</button>
                <button>Write a review</button>
            </div>
            <div className="review-container">
                <div className="rating-and-title">
                <div>
                        {[...Array(5)].map((_, index) => (
                            <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            style={{
                                color: index < 4 ? "#669c54" : "#E2E8F0",
                                fontSize: "1rem",
                            }}
                            />
                        ))}
                    </div>
                    <div>Love these seeds!</div>
                </div>
                <div className="review">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <div className="review-author">
                by Christopher, July 15th 2020
                </div>
            </div>
        </div>
    </div>
  </div>
  )
}
