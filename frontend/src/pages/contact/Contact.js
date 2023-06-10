// react
import React, { useState } from "react"

// styles
import "./Contact.css"

// chakra ui
import { Input, Textarea } from "@chakra-ui/react";

// hooks
import useContact from "../../hooks/useContact"

// react helmet
import { Helmet } from "react-helmet-async";

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const { contact, loading } = useContact()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sentEmail = await contact(name, email, subject, message);
    if (sentEmail) {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    };
  }

  return (
    <div className="contact-us-container">
      <Helmet>
          <title>Contact Us | Mantra Seeds</title>
          <meta
            name="description"
            content="Get in touch with us for any inquiries, suggestions, or issues. We're here to help and would love to hear from you."
          />        
      </Helmet>
      <h1>Contact Us</h1>
      <form className="contact-us-form" onSubmit={handleSubmit}>
        <div className="label-and-input-wrapper">
          <label>Name</label>
          <Input 
            variant='outline' 
            aria-label='Name'
            className="add-product-input"
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            value={name}
            required={true}
            color="black"
            bg="white"
            />
        </div>
        <div className="label-and-input-wrapper">
          <label>Email</label>
          <Input 
            variant='outline' 
            aria-label='Email'
            className="add-product-input"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            value={email}
            required={true}
            color="black"
            bg="white"
            />
        </div>
        <div className="label-and-input-wrapper">
          <label>Subject</label>
          <Input 
            variant='outline' 
            aria-label='Subject'
            className="add-product-input"
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Your Subject"
            value={subject}
            required={true}
            color="black"
            bg="white"
            />
        </div>
        <div className="label-and-input-wrapper">
          <label>Message</label>
          <Textarea
            variant='outline' 
            aria-label='Message'
            className="add-product-input"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            value={message}
            required={true}
            color="black"
            bg="white"
            />
        </div>
        <button className="add-to-cart-btn contact" type="submit" disabled={loading} aria-label="Send Email">Send Email</button>
      </form>
    </div>
  )
}
