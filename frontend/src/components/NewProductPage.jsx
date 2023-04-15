import React, { useState, useEffect } from 'react'
import { useParams, useNavigate} from 'react-router-dom'

//redux
import { useSelector } from 'react-redux'

// hooks
import useAddToCart from '../hooks/useAddToCart';

// styles
import './NewProductPage.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faStar, faHeart } from '@fortawesome/free-solid-svg-icons'

// components
import ReviewsContainer from './reviews/ReviewsContainer';

const PRODUCTS_API_URL = '/api/products/'

export default function NewProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState('')
  const { addToCart, loading, error } = useAddToCart();
  const navigate = useNavigate();
  const price = (product.price/100).toFixed(2)
  const [quantity, setQuantity] = useState(1)

  const inStock = product.quantity > 0

  useEffect(() => {
    const url = PRODUCTS_API_URL+id;
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                navigate("*");
            } else {
                return response.json();
            }
        })
        .then((data) => {
            setProduct(data)
        })
}, [id])

    const reviews = useSelector(state => state.reviews.reviews);
    if(reviews === null) return null; // only render once redux is loaded
    const productReviews = reviews.filter(review => review.product === id);
    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = productReviews.length > 0 ? (totalRating / productReviews.length).toFixed(1) : 0;

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
                color: index < averageRating ? "#669c54" : "#E2E8F0",
                fontSize: "1rem",
            }}
            />
        ))}
        <div className="num-of-reviews">{productReviews.length} reviews</div>
        </div>
        <div className="product-details">
        <div>{product.name}</div>
        <div>{`$${price}`}</div>
        <div>{product.description}</div>
        </div>
        <div className="product-details-page-functionality">
            {inStock ? (<div className="adjust-quantity-container">
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
            </div>) : (<div className="adjust-quantity-container">
            <div className="adjust-quantity out-of-stock">Out of Stock</div>
            </div>)}
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
        {inStock ?
        (<button disabled={loading} className="add-to-cart-btn" onClick={() => addToCart(product._id, quantity, product.price)}>Add to Cart</button>) :
        (<button disabled={true} className="add-to-cart-btn out-of-stock">Out of Stock</button>)}
        {error && <div className="error-message add-to-cart">{error}</div>}
        </div>
        <ReviewsContainer/>
    </div>
  </div>
  )
}
