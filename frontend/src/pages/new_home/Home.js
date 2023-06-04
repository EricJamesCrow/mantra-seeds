import React, { useState } from 'react'

// styles
import './Home.css'

// images
import Underline from '../../images/home/underline.svg'
import Meditating from '../../images/home/meditating.svg'

//redux
import { useSelector } from 'react-redux'

// footer
import Footer from '../../components/footer/Footer';

// components
import NewArrivals from './components/NewArrivals'
import Educational from './components/Educational'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'

export default function Home() {
  const [email, setEmail] = useState('');
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
        <img src={Meditating} alt="meditating" className="meditating" />
        <NewArrivals />
        {/* <Educational />
        <Testimonials /> */}
        <Newsletter />
        <Footer />
    </div>
  )
}
