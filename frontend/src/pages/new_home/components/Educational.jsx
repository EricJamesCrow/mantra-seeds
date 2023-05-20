import React from 'react'
import { useNavigate } from 'react-router-dom'

// redux
import { useSelector } from 'react-redux'

// carousel
import RBCarousel from '../../../components/carousel/RBCarousel'

export default function Educational() {
    const products = useSelector(state => state.products.products);
    const reviews = useSelector(state => state.reviews.reviews);
    const navigate = useNavigate();
    
  return (
    <div className="home-page-content-wrapper educational">
    <div className="home-page-header-text-and-link-wrapper educational">
      <div>Educational</div>
      <div onClick={() => navigate('/educational')}>View All</div>
    </div>
    <div>
      <RBCarousel items={products.slice(0,9)} reviews={reviews}/>
    </div>
</div>
  )
}
