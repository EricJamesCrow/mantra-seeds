import React from 'react'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

// styles
import './Review.css'

export default function Review( { review } ) {
  return (
<div className="review-container single">
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
    </div>
  )
}
