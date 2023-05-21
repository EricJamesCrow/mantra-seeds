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

// loading
import Loading from './loading/loading'

export default function NewProductPage() {
    const { id } = useParams()
    const { addToCart, loading, error } = useAddToCart();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1)

    const reviews = useSelector(state => state.reviews.reviews);
    const products = useSelector(state => state.products.products);
    if(reviews === null || products === null) return <Loading/>; // only render once redux is loaded
    const product = products.find(p => p._id === id);
    if(product === null) return <Loading/>;
    const price = (product.price/100).toFixed(2)
    const inStock = product.quantity > 0
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
    <button className="details-page-btn" onClick={() => navigate(-1)} aria-label="Go to previous page">
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
                <button className="adjust-quantity-btn" onClick={handleQuantityDecrease} aria-label="Decrease Quantity">
                    <div>-</div>
                </button>
                <div>{quantity}</div>
                <button className="adjust-quantity-btn" onClick={handleQuantityIncrease} aria-label="Increase Quantity">
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
        (<button disabled={loading} className="add-to-cart-btn" onClick={() => addToCart(product._id, quantity, product.price)} aria-label="Add to Cart">Add to Cart</button>) :
        (<button disabled={true} className="add-to-cart-btn out-of-stock" aria-label="Out of Stock">Out of Stock</button>)}
        {error && <div className="error-message add-to-cart">{error}</div>}
        </div>
        <ReviewsContainer/>
    </div>
  </div>
  )
}
