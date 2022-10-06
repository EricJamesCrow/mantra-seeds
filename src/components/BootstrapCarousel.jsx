import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

// components
import Product from "../components/Product"

// styles
import 'bootstrap/dist/css/bootstrap.min.css'

export default function BootstrapCarousel( { items } ) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} style={{ width: '390px', height: '360px', display: 'flex', alignItem: 'center' }}>
      {items.map( item => (
        <Carousel.Item style={{ width: '340px', marginLeft: '50px'}} interval={2000}>
      <Product
        item={item}
      />
      </Carousel.Item>
      ))        
      }
    </Carousel>
  );
}