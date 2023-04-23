import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useMediaQuery } from 'react-responsive';

// components
import NewProduct from '../NewProduct';

// styles
import '../../scss/bootstrap.scss';
import './RBCarousel.css';

export default function RBCarousel({ items, reviews }) {
  const isDesktop = useMediaQuery({ minWidth: 980 });
  const isTablet = useMediaQuery({ minWidth: 520, maxWidth: 979 });

  const chunkArray = (arr, chunkSize) => {
    const results = [];
    while (arr.length) {
      results.push(arr.splice(0, chunkSize));
    }
    return results;
  };

  const mobileItems = chunkArray([...items], 1);
  const tabletItems = chunkArray([...items], 2);
  const desktopItems = chunkArray([...items], 3);

  return (
    <div className="bootstrap-carousel">
      {!isTablet && !isDesktop && (
        <Carousel>
          {mobileItems.map((itemGroup, index) => (
            <Carousel.Item key={index}>
              {itemGroup.map((item, idx) => (
                <NewProduct key={idx} product={item} reviews={reviews} />
              ))}
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      {isTablet && !isDesktop && (
        <Carousel>
          {tabletItems.map((itemGroup, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-content-wrapper">
                {itemGroup.map((item, idx) => (
                  <NewProduct key={idx} product={item} reviews={reviews} />
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      {!isTablet && isDesktop && (
        <Carousel>
          {desktopItems.map((itemGroup, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-content-wrapper">
                {itemGroup.map((item, idx) => (
                  <NewProduct key={idx} product={item} reviews={reviews} />
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
}
