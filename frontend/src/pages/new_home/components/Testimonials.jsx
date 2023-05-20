import React from 'react'
import { useNavigate } from 'react-router-dom'

// redux
import { useSelector } from 'react-redux'

// components
import Review from '../../../components/reviews/Review'

export default function Testimonials() {
    const navigate = useNavigate();
    const reviews = useSelector(state => state.reviews.reviews);
    const lastThreeReviews = reviews.slice(0, 8);
    
  return (
    <div className="home-page-content-wrapper testimonials">
    <div className="home-page-header-text-and-link-wrapper testimonials">
      <div>Testimonials</div>
      <div onClick={() => navigate('/testimonials')}>View All</div>
    </div>
    <div className="shop-display-products-container">
      {lastThreeReviews.map(review => (
        <Review review={review}/>
      ))}
    </div>
</div>
  )
}
