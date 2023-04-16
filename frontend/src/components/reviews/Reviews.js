import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

//redux
import { useSelector } from 'react-redux'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

// styles
import './Reviews.css'

// chakra ui
import { Select } from '@chakra-ui/react'

// components
import ReviewForm from './ReviewForm'
import Pagination from '../../components/Pagination'

export default function Reviews() {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    useEffect(() => {
        // Disable scrollbar when AddProduct is visible
        const overlay = document.querySelector('.admin-products-overlay');
        overlay.classList.toggle('show', showReviewForm);
        if (showReviewForm) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
        // Cleanup the effect
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [showReviewForm]);

    const { id } = useParams()
    const reviews = useSelector(state => state.reviews.reviews);
    if(reviews === null) return null; // only render once redux is loaded
    const productReviews = reviews.filter(review => review.product === id);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProductReviews = productReviews.slice(indexOfFirstItem, indexOfLastItem);
    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = productReviews.length > 0 ? (totalRating / productReviews.length).toFixed(1) : 0;

    let results = productReviews.length

    const handleSelect = (e) => {
        setItemsPerPage(e.target.value)
      }

    const handleShowWriteReview = () => {
        setShowReviewForm(!showReviewForm);
    }

  return (
    <div className="reviews-container reviews-page">
    <div className="reviews-page-header-container-wrapper">
        <div>Reviews</div>
        <div className="reviews-page-header-container">
            <div className="average-rating-container">
                <div className="average-rating">{averageRating}</div>
                <div className="average-stars-and-num-of-reviews">
                    <div>
                        {[...Array(5)].map((_, index) => (
                            <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            style={{
                                color: index < averageRating ? "#669c54" : "#E2E8F0",
                                fontSize: "1rem",
                            }}
                            />
                        ))}
                    </div>
                    <div>Based on {productReviews.length} reviews</div>
                </div>
            </div>
            <div className="write-review-container">
                <button onClick={() => handleShowWriteReview()}>Write a review</button>
            </div>
        </div>
    </div>
    <div className="admin-page-results-container review">
  <div>{results === 0 ? `0 - ${results} of ${results} Results` :
      `${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, results)} of ${results} Results`}</div>
  <div>
    <div>Results per Page:</div>
    <Select size='xs' onChange={handleSelect}>
      <option value='12'>12</option>
      <option value='24'>24</option>
      <option value='36'>36</option>
      <option value='48'>48</option>
    </Select>
  </div>
</div>
    <div className="all-reviews-container">
    {currentProductReviews.map(review => (<div className="review-container">
        <div className="rating-and-title">
        <div>
                {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    style={{
                        color: index < review.rating ? '#669c54' : '#E2E8F0',
                        fontSize: "1rem",
                    }}
                    />
                ))}
            </div>
            <div>{review.title}</div>
        </div>
        <div className="review">
        {review.comment}
        </div>
        <div className="review-author">
        by {review.name}, {new Date(review.createdAt).toLocaleDateString()}
        </div>
    </div>))}
    </div>
    {showReviewForm && 
    <div className="admin-products-add-product-container">
    <ReviewForm id={id} setShowReviewForm={setShowReviewForm} />
    </div>
    }
    <div className="pagination-container reviews">
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={productReviews.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          </div>
</div>
  )
}
