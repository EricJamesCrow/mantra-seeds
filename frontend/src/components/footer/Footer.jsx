import React from 'react'

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
            <div>About Us</div>
            <div>Privacy Policy</div>
        </div>
        <div className="footer-social-media-wrapper">
            <img src={Instagram} alt="Instagram" />
            <img src={Facebook} alt="Facebook" />
            <img src={Twitter} alt="Twitter" />
        </div>
        <div className="footer-copyright">© 2023 Mantra Seeds</div>
    </div>
  )
}
