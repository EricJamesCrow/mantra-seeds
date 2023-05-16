import React from 'react'
import { useNavigate } from 'react-router-dom'

// styles
import './Order.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function Order( { id, orderNumber, date, orderTotal, paymentStatus, deliveryStatus }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  function getShippingStatusIndicator(status) {
    if (status === 'Not Shipped') {
      return 'false';
    } else if (status === 'Shipped') {
      return 'pending';
    } else if (status === 'Delivered') {
      return 'true';
    }
    return undefined;
  }

  const cardDetails = [
    { id: 1, title: 'Order Total', value: `$${(orderTotal/100).toFixed(2)}`, class: 'gray'},
    { id: 2, title: 'Payment Status', value: paymentStatus, status: paymentStatus.toLowerCase()},
    { id: 3, title: 'Delivery Status', value: deliveryStatus, class: 'gray', status: getShippingStatusIndicator(deliveryStatus)},
  ]

  return (
      <div className="order-customer-card-container customer" onClick={() => navigate(user ? `/profile/order-history/${id}` : `/order-details/${id}`)}>
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
              <button className={`order-customer-card-btn ${paymentStatus.toLowerCase()}`}>{paymentStatus}</button>
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
