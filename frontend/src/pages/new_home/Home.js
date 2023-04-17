import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// styles
import './Home.css'

// images
import Underline from '../../images/home/underline.svg'
import Meditating from '../../images/home/meditating.svg'

// components
import NewProduct from '../../components/NewProduct'

//redux
import { useSelector } from 'react-redux'

// chakra ui
import { Input } from "@chakra-ui/react";

// footer
import Footer from '../../components/footer/Footer';

export default function Home() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const products = useSelector(state => state.products.products);
  const reviews = useSelector(state => state.reviews.reviews);
  if (!products || !reviews) return null; // only render once redux is loaded

  return (
    <div className="landing-page-container">
        <div className="landing-page-text">
            <div>Handcrafted Seeds</div>
            <div>MANTRA SEEDS</div>
            <img src={Underline} alt="underline" />
        </div>
        {/* <div className="birds-container">
        <img src={TwoBirds} alt="two birds" className="two-birds" />
        <img src={ThreeBirds} alt="three birds" className="three-birds" />
        </div> */}
        <img src={Meditating} alt="meditating" className="meditating" />
        <div className="home-page-content-wrapper">
            <div className="home-page-header-text-and-link-wrapper">
              <div>New Arrivals</div>
              <div onClick={() => navigate('/shop')}>View All</div>
            </div>
            <div className="shop-display-products-container">
            <NewProduct product={products[0]} reviews={reviews} />
            </div>
        </div>
        <div className="home-page-content-wrapper educational">
            <div className="home-page-header-text-and-link-wrapper educational">
              <div>Educational</div>
              <div>View All</div>
            </div>
            <div className="shop-display-products-container">
            <NewProduct product={products[0]} reviews={reviews} />
            </div>
        </div>
        <div className="home-page-content-wrapper testimonials">
            <div className="home-page-header-text-and-link-wrapper testimonials">
              <div>Testimonials</div>
              <div>View All</div>
            </div>
            <div className="shop-display-products-container">
            <NewProduct product={products[0]} reviews={reviews} />
            </div>
        </div>
        <div className="home-page-content-wrapper newsletter">
            <div className="home-page-header-text-and-link-wrapper-newsletter">
              <div>Sign up for our Newsletter</div>
            </div>
            <div className="newsletter-signup-wrapper">
              <Input 
                variant='outline' 
                className="add-product-input"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                value={email}
                required={true}
                bg="white"
                />
                <button className="add-to-cart-btn">Sign Up</button>
              </div>
        </div>
        <Footer />
    </div>
  )
}
