import React from 'react'
import { useParams } from 'react-router-dom'

//redux
import { useSelector } from 'react-redux'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

// styles
import './ReviewsContainer.css'

export default function ReviewsContainer() {
    const { id } = useParams()
    const reviews = useSelector(state => state.reviews.reviews);
    if(reviews === null) return null; // only render once redux is loaded
    const productReviews = reviews.filter(review => review.product === id);
    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = productReviews.length > 0 ? (totalRating / productReviews.length).toFixed(1) : 0;


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
        <button>See all reviews</button>
        <button>Write a review</button>
    </div>
    {productReviews.map(review => (<div className="review-container">
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
        by {review.user}, {new Date(review.createdAt).toLocaleDateString()}
        </div>
    </div>))}
</div>
  )
}
