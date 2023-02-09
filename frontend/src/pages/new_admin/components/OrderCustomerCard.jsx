import React from 'react'

// styles
import './OrderCustomerCard.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function OrderCustomerCard( { item } ) {
    const cardId = `#${item.orderNumber}`
    const email = item.email
    const paymentStatus = item.paymentStatus
    const total = (item.total / 100).toFixed(2)
    const shippingStatus = item.shippingStatus
    const shippingStatusValue = shippingStatus === 'false' ? 'Not Shipped' : shippingStatus === 'true' ? 'Shipped' : shippingStatus === 'delivered' ? 'Delivered' : null

    function toTitleCase(str) {
        return str.toLowerCase().split(' ').map(function(word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
      }

    const title1 = item.id === 'order' ? 'Customer' : item.id === 'product' ? 'Email' : null
    const title2 = item.id === 'order' ? 'Payment Status' : item.id === 'product' ? 'Recent Order' : null
    const title3 = item.id === 'order' ? 'Order Total' : item.id === 'product' ? 'Number of Orders' : null
    const title4 = item.id === 'order' ? 'Delivery Status' : item.id === 'product' ? 'Total Spent' : null

    const cardDetails = [
        { id: 1, title: title1, value: email},
        { id: 2, title: title2, value: toTitleCase(paymentStatus), class: 'gray', status: item.id === 'order' ? paymentStatus : null},
        { id: 3, title: title3, value: `$${total}`},
        { id: 4, title: title4, value: shippingStatusValue, class: 'gray', status: item.id === 'order' ? shippingStatus : null}
      ]

  return (
    <div className="order-customer-card-container">
      <div className="order-customer-card-see-details-container">
        <div>{item.dateCreated}</div>
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
        <div>{cardId}</div>
        <button className={`order-customer-card-btn ${paymentStatus}`}>{toTitleCase(paymentStatus)}</button>
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
