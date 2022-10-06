import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel'

// components
import Product from "../components/Product"


export default function BootstrapCarousel( { items } ) {
  // const [index, setIndex] = useState(0);

  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };

  return (
    <Carousel animation='slide' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '61.54vw'}}>
      {
      items.map( item => <Product key={item.id} item={item}/> )    
      }
    </Carousel>
  );
}