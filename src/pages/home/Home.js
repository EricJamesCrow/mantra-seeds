// react
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

// styles
import "./Home.css"

// components
import Product from "../../components/Product"
import BootstrapCarousel from "../../components/BootstrapCarousel"

// images
import Cannabis from "../../images/cannabis-leaf-green.svg"

// data
import products from "../../data/product_data"

export default function Home() {

  useEffect(() => {
    window.addEventListener('scroll', whatsWindowHeight);

    return () => {
      window.removeEventListener('scroll', whatsWindowHeight);
    };
  }, []);

  const isDesktop =  useMediaQuery({ query: '(min-width: 980px)' })
  const isTablet =  useMediaQuery({ query: '(min-width: 620px)' })

  const whatsWindowHeight = () => {
    let viewportHeight = window.innerHeight;
    let viewportWidth = window.innerWidth;
    };

  const isMobile =  useMediaQuery({
    query: '(max-width: 1366px)'
  })
  
  return (
    <>
    <div className="banner">
        <div className="welcome">Welcome to</div>
        <div className="banner-title">MantraSeeds</div>
        <Link to="/shop" type="button" className="banner-shop-now">SHOP NOW</Link>
    </div>
    <div className="recent-products">
      <div className="recent-products-label">Recent Products</div>
      <div className={!isMobile ? "recent-product" : "recent-product-mobile"}>
        {/* {products.slice(0, 8).map(product => (
          <Product
          item={product}
          />
        ))} */}
        {
        <BootstrapCarousel
        items={products.slice(0, 8)}
        />
        }
        </div>
    </div>
    <div className="special-deals">
      <div className="special-deals-label">Special Deals</div>
      <div className={!isMobile ? "special-deals-products" : null}>
        {/* {products.slice(0, 3).map(product => (
          <Product
          item={product}
          />
        ))} */}
        {
        <BootstrapCarousel
        items={products.slice(0, 3)}
        />
        }
      </div>
    </div>
    <div className="about">
      <div className="about-label">About</div>
          <div className="about-text">
          Lorem ipsum dolor sit amet, putent vituperatoribus te nam, ut summo atomorum qualisque vis. Ex eius scriptorem vis, nec rebum propriae voluptatibus ex. Ei cum munere tempor noluisse, cum eu corpora adversarium.
          </div>
    </div>
    <div className="newsletter">
          <div className="newsletter-label">Subscribe to our Newsletter</div>
          <div className="newsletter-text">
          Et vim falli omittam, mei aeterno mandamus vulputate ut. Sit quidam legimus nominavi et. Augue dissentias pro in, te indoctum conclusionemque sea, tation honestatis te vix. No has illud mucius mandamus, assum scribentur quo ad, eum an ignota dissentias.
          </div>
          <div className="subscribe-container">
          <input type="email" placeholder="Enter your email:" className="newsletter-email-input"></input>
          <button className="newsletter-subscribe">SUBSCRIBE</button>
          </div>
    </div>
    </>
  )
}
