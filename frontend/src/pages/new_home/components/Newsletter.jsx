import React, { useState } from 'react'

// chakra ui
import { Input } from "@chakra-ui/react";

export default function Newsletter() {
    const [email, setEmail] = useState('');
  return (
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
  )
}
