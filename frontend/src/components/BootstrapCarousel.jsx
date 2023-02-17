// react
import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { useMediaQuery } from 'react-responsive'

// components
import Product from "../components/Product"

// styles
import "./BootstrapCarousel.css"


export default function BootstrapCarousel( { items } ) {
  const isDesktop =  useMediaQuery({ query: '(min-width: 980px)' })
  const isTablet =  useMediaQuery({ query: '(min-width: 620px)' })

  return (
    <>
      {isDesktop && 
      <Carousel animation='slide' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '61.54vw'}}>
      {
      items.map( item => 
        <div className="carousel-items">
      <Product key={item.id} item={item}/> 
      <Product key={item.id} item={item}/>
      <Product key={item.id} item={item}/>
      </div>
      )    
      }
    </Carousel>}
    {isTablet && !isDesktop &&
    <Carousel animation='slide' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '61.54vw'}}>
    {
    items.map( item => 
      <div className="carousel-items">
    <Product key={item.id} item={item}/> 
    <Product key={item.id} item={item}/>
    </div>
    )    
    }
  </Carousel>}
  {!isTablet && !isDesktop &&
    <Carousel animation='slide' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '61.54vw'}}>
    {
    items.map( item => <Product key={item.id} item={item}/> )    
    }
  </Carousel>}
</>
  );
}