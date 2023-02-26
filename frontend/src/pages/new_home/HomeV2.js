import React, { useEffect, useState } from 'react'

// styles
import './HomeV2.css'

// images
import Underline from '../../images/home/underline.svg'
import Meditating from '../../images/home/meditating.svg'
import Chakra from '../../images/home/chakraV2.svg'

export default function Home() {
    const [showChakras, setShowChakras] = useState(false);

    useEffect(() => {
      // Delay showing chakras to allow other content to load first
      const timeout = setTimeout(() => {
        setShowChakras(true);
      }, 3000);
  
      return () => {
        clearTimeout(timeout);
      };
    }, []);
  
    useEffect(() => {
      const chakraContainers = document.querySelectorAll('.chakra');
      if (showChakras && chakraContainers.length === 4) {
        chakraContainers.forEach((container) => {
          container.classList.add('visible');
        });
      }
    }, [showChakras]);

  return (
    <div className="landing-page-container">
        <div className="landing-page-text">
            <div>Handcrafted Seeds</div>
            <div>MANTRA SEEDS</div>
            <img src={Underline} alt="underline" />
        </div>
        <div className="chakras-container">
        <img src={Chakra} alt="uppper-left" className="chakra upper-left" />
        <img src={Chakra} alt="lower-left" className="chakra lower-left" />
        <img src={Chakra} alt="uppper-right" className="chakra upper-right" />
        <img src={Chakra} alt="lower-right" className="chakra lower-right" />
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
