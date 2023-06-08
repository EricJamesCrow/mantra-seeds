import React from 'react'
import { useNavigate } from 'react-router-dom'

//redux
import { useSelector } from 'react-redux'

// carousel
import RBCarousel from '../../../components/carousel/RBCarousel'

export default function NewArrivals() {
    const products = useSelector(state => state.products.products);
    const reviews = useSelector(state => state.reviews.reviews);
    const navigate = useNavigate();

  return (
    <div className="home-page-content-wrapper">
    <div className="home-page-header-text-and-link-wrapper">
      <div>New Arrivals</div>
      <div onClick={() => navigate('/shop')}>View All</div>
    </div>
    <div className="new-arrivals-carousel-wrapper">
      <RBCarousel items={products.slice(0,9)} reviews={reviews}/>
    </div>
</div>
  )
}
