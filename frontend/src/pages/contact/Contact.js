// react
import React, { useState } from "react"

// styles
import "./Contact.css"

// chakra ui
import { Input, Textarea } from "@chakra-ui/react";

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <form className="contact-us-form" onSubmit={handleSubmit}>
        <div className="label-and-input-wrapper">
          <label>Name</label>
          <Input 
            variant='outline' 
            className="add-product-input"
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            value={name}
            required={true}
            bg="white"
            />
        </div>
        <div className="label-and-input-wrapper">
          <label>Email</label>
          <Input 
            variant='outline' 
            className="add-product-input"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            value={email}
            required={true}
            bg="white"
            />
        </div>
        <div className="label-and-input-wrapper">
          <label>Subject</label>
          <Input 
            variant='outline' 
            className="add-product-input"
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Your Email"
            value={subject}
            required={true}
            bg="white"
            />
        </div>
        <div className="label-and-input-wrapper">
          <label>Message</label>
          <Textarea
            variant='outline' 
            className="add-product-input"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            value={message}
            required={true}
            bg="white"
            />
        </div>
        <button className="add-to-cart-btn contact" type="submit">Send Email</button>
      </form>
    </div>
  )
}
