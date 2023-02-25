import React from 'react'

// styles
import './Home.css'

// images
import Underline from '../../images/home/underline.svg'
import TwoBirds from '../../images/home/2_birds.svg'
import ThreeBirds from '../../images/home/3_birds.svg'
import Meditating from '../../images/home/meditating.svg'

export default function Home() {
  return (
    <div className="landing-page-container">
        <div className="landing-page-text">
            <div>Handcrafted Seeds</div>
            <div>MANTRA SEEDS</div>
            <img src={Underline} alt="underline" />
        </div>
        <div className="birds-container">
        <img src={TwoBirds} alt="two birds" className="two-birds" />
        <img src={ThreeBirds} alt="three birds" className="three-birds" />
        </div>
        <img src={Meditating} alt="meditating" className="meditating" />
        <div className="home-page-shop-products">
            <div>Shop</div>
            <div className="home-page-shop-content-container">
            <div>Insert Content Here</div>
            </div>
        </div>
    </div>
  )
}
