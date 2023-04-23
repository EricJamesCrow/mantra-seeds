import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

// components
import NewProduct from '../NewProduct';

// styles
import '../../scss/bootstrap.scss'
import './RBCarousel.css'

export default function RBCarousel({ items, reviews }) {
  return (
    <div className="bootstrap-carousel">
      <Carousel>
        {items.map((item, index) => (
          <Carousel.Item key={index}>
            <NewProduct product={item} reviews={reviews} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}
