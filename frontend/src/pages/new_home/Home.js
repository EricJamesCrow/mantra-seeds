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

// react helmet
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const [email, setEmail] = useState('');
  const products = useSelector(state => state.products.products);
  const reviews = useSelector(state => state.reviews.reviews);
  if (!products || !reviews) return null; // only render once redux is loaded

  return (
    <div className="landing-page-container">
        <Helmet>
          <title>Mantra Seeds</title>
          <meta
            name="description"
            content="Mantra Seeds offers a wide variety of high-quality distinctive seeds and other types of seeds for all your gardening needs. Browse our collection and order online today."
          />
          <link rel="canonical" href="https://mantra-seeds.com/" />
        </Helmet>
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
