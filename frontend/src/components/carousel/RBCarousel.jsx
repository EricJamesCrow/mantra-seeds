import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { useMediaQuery } from 'react-responsive';

// components
import NewProduct from '../NewProduct';

// styles
import '../../scss/bootstrap.scss'
import './RBCarousel.css'

export default function RBCarousel({ items, reviews }) {
  const isDesktop = useMediaQuery({ minWidth: 980 });
  const isTablet = useMediaQuery({ minWidth: 520, maxWidth: 979 });
  return (
    <div className="bootstrap-carousel">
      {!isTablet && !isDesktop && <Carousel>
        {items.map((item, index) => (
          <Carousel.Item key={index}>
            <NewProduct product={item} reviews={reviews} />
          </Carousel.Item>
        ))}
      </Carousel>}
      {isTablet && !isDesktop && <Carousel>
        {items.map((item, index) => (
          <Carousel.Item key={index}>
            <div className="carousel-content-wrapper">
              <NewProduct product={item} reviews={reviews} />
              <NewProduct product={item} reviews={reviews} />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>}
      {!isTablet && isDesktop && <Carousel>
        {items.map((item, index) => (
          <Carousel.Item key={index}>
            <div className="carousel-content-wrapper">
              <NewProduct product={item} reviews={reviews} />
              <NewProduct product={item} reviews={reviews} />
              <NewProduct product={item} reviews={reviews} />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>}
    </div>
  )
}
