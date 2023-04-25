import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

//redux
import { useSelector } from 'react-redux'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

// styles
import './ReviewsContainer.css'

// components
import ReviewForm from './ReviewForm'

export default function ReviewsContainer() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showReviewForm, setShowReviewForm] = useState(false);

    useEffect(() => {
        // Disable scrollbar when AddProduct is visible
        const overlay = document.querySelector('.admin-products-overlay');
        overlay.classList.toggle('show', showReviewForm);
        if (showReviewForm) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
        // Cleanup the effect
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [showReviewForm]);


    const { id } = useParams()
    const reviews = useSelector(state => state.reviews.reviews);
    if(reviews === null) return null; // only render once redux is loaded
    const productReviews = reviews.filter(review => review.product === id);
    const recentProductReviews = reviews
  .filter(review => review.product === id)
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 5);

    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = productReviews.length > 0 ? (totalRating / productReviews.length).toFixed(1) : 0;

    const handleShowWriteReview = () => {
        setShowReviewForm(!showReviewForm);
    }


  return (
    <div className="reviews-container">
    <div>Reviews</div>
    <div className="average-rating-container">
        <div className="average-rating">{averageRating}</div>
        <div className="average-stars-and-num-of-reviews">
            <div>
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
            </div>
            <div>Based on {productReviews.length} reviews</div>
        </div>
    </div>
    <div className="reviews-btns-container">
        <button onClick={() => navigate(`${location.pathname}/reviews`)}>See all reviews</button>
        <button onClick={() => handleShowWriteReview()}>Write a review</button>
    </div>
    {recentProductReviews.map(review => (<div className="review-container">
        <div className="rating-and-title">
        <div>
                {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    style={{
                        color: index < review.rating ? '#669c54' : '#E2E8F0',
                        fontSize: "1rem",
                    }}
                    />
                ))}
            </div>
            <div>{review.title}</div>
        </div>
        <div className="review">
        {review.comment}
        </div>
        <div className="review-author">
        by {review.name}, {new Date(review.createdAt).toLocaleDateString()}
        </div>
    </div>))}
    {showReviewForm && 
    <div className="admin-products-add-product-container">
      <ReviewForm id={id} setShowReviewForm={setShowReviewForm} />
    </div>
    }
</div>
  )
}
