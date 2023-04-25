// react
import React, { useState } from "react"

// styles
import "./Contact.css"

// chakra ui
import { Input, Textarea } from "@chakra-ui/react";

// hooks
import useContact from "../../hooks/useContact"

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
            color="black"
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
            color="black"
            bg="white"
            />
        </div>
        <div className="label-and-input-wrapper">
          <label>Subject</label>
          <Input 
            variant='outline' 
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
            className="add-product-input"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            value={message}
            required={true}
            color="black"
            bg="white"
            />
        </div>
        <button className="add-to-cart-btn contact" type="submit" disabled={loading}>Send Email</button>
      </form>
    </div>
  )
}
