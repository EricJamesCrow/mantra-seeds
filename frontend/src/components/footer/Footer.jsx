import React from 'react'
import { Link } from 'react-router-dom'

// styles
import './Footer.css'

// images
import Facebook from '../../images/social_media/facebook.svg'
import Instagram from '../../images/social_media/instagram.svg'
import Twitter from '../../images/social_media/twitter.svg'

export default function Footer() {
  return (
    <div className="footer">
        <div className="footer-links-wrapper">
            <Link to="/about-us">About Us</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
        <div className="footer-social-media-wrapper">
          <a href="https://www.instagram.com/mantraseeds" target="_blank" rel="noopener noreferrer">
            <img src={Instagram} alt="Instagram" />
          </a>
          <a href="https://www.facebook.com/mantraseeds" target="_blank" rel="noopener noreferrer">
              <img src={Facebook} alt="Facebook" />
          </a>
          <a href="https://www.twitter.com/mantraseeds" target="_blank" rel="noopener noreferrer">
              <img src={Twitter} alt="Twitter" />
          </a>
        </div>
        <div className="footer-copyright">© 2023 Mantra Seeds</div>
    </div>
  )
}
