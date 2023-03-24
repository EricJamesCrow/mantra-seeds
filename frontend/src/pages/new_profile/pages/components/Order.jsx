import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

// styles
import './Order.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function Order( { id, orderNumber, date, orderTotal, paymentStatus, deliveryStatus }) {
  const navigate = useNavigate();

  function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  const cardDetails = [
    { id: 1, title: 'Order Total', value: `$${(orderTotal/100).toFixed(2)}`, class: 'gray'},
    { id: 2, title: 'Payment Status', value: toTitleCase(paymentStatus), status: paymentStatus},
    { id: 3, title: 'Delivery Status', value: deliveryStatus, class: 'gray', status: 'false'},
  ]

  return (
      <div className="order-customer-card-container customer" onClick={() => navigate(`/profile/order-history/${id}`)}>
            <div className="order-customer-card-see-details-container">
              <div>{date}</div>
              <div>
              <div>See Details</div>
              <FontAwesomeIcon 
                icon={faChevronRight} 
                style={{
                    color: "#BCBDBC",
                    fontSize: "1.15rem",
                    cursor: "pointer"}}
                />
              </div>
            </div>
            <div>
            <span></span>
            </div>
            <div className="order-customer-card-id-btn-container">
              <div>{`#${orderNumber}`}</div>
              <button className={`order-customer-card-btn pending`}>{'Pending'}</button>
            </div>
            <div className="order-customer-card-details-container">
              {cardDetails.map(item => (
              <div key={item.id} className={`order-customer-card-details ${item.class}`}>
                <div>{item.title}</div>
                <div>
                  {item.status &&
                  <div className={`circle ${item.status}`}></div>
                  }
                <div>{item.value}</div>
                </div>
              </div>
              ))
              }
            </div>
          </div>
  )
}
