import React, { useState } from 'react'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faStar } from '@fortawesome/free-solid-svg-icons'

// chakra ui
import { Input } from "@chakra-ui/react";
import { Textarea } from '@chakra-ui/react'

// styles
import './ReviewForm.css'
import '../../pages/new_admin/components/AddProduct.css'

// hooks
import useReview from '../../hooks/useReview'

export default function ReviewForm( { id, setShowReviewForm } ) {
    const { createReview } = useReview()
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const [title, setTitle] = useState('')
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleClose = () => {
      setShowReviewForm(false)
    }

    const handleStarMouseEnter = (index) => {
      setHoverRating(index + 1);
    };
  
    const handleStarMouseLeave = () => {
      setHoverRating(0);
    };

    const handleStarClick = (index) => {
      setRating(index + 1);
    };

    const handleSubmit = async (e) => {
      e.preventDefault()
      const reviewCreated = await createReview(id, name, title, rating, comment)
      if (reviewCreated) {
        setName('')
        setComment('')
        setTitle('')
        setRating(0)
      }
    }

  return (
    <div className="add-product-container review-form">
    <div className="admin-container-add-product">
    <div className="write-a-review-container">
        <div>Write a review</div>
        <FontAwesomeIcon 
            icon={faX} 
            style={{
                color: "#000000",
                fontSize: "1.6rem",
                cursor: "pointer"}}
            onClick={handleClose}
            />
        </div>
        <div>
    <span></span>
    </div>
</div>
<form className="add-product-form review-form" onSubmit={(e) => handleSubmit(e)}>
  <div className="form-group">
    <label>Name</label>
    <Input 
    variant='outline' 
    className="add-product-input"
    onChange={(e) => setName(e.target.value)}
    placeholder="Your name"
    value={name}
    required={true}
    />
  </div>
  <div className="form-group">
    <label>Title</label>
    <Input 
    variant='outline' 
    className="add-product-input"
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Your title"
    value={title}
    required={true}
    />
  </div>
  <div className="form-group">
    <label>Rating</label>
    <div>
        {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon
            key={index}
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => handleStarMouseEnter(index)}
            onMouseLeave={handleStarMouseLeave}
            icon={faStar}
            style={{
                color: "#669c54",
                fontSize: "1rem",
                color: index < (hoverRating || rating) ? '#669c54' : '#E2E8F0',
                cursor: 'pointer',
            }}
            />
        ))}
    </div>
  </div>
  <div className="form-group">
    <label>Comment</label>
    <Textarea 
    style={{ marginTop: "0.5rem"}}
    onChange={(e) => setComment(e.target.value)}
    placeholder="Your comment"
    value={comment}
    required={true}
     />
  </div>
  <div className="reviews-btns-container review-form">
  <button type="submit">Submit Review</button>
  </div>
</form>
</div>
  )
}
 