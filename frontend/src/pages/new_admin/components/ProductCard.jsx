import React from 'react'

// styles
import './OrderCustomerCard.css'
import './ProductCard.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Cannabis from "../../../images/cannabis-leaf-green.svg"

export default function ProductCard( {item} ) {
    const cardId = item.cardId
    const name = item.var1 // Name
    const status = item.var2 // Price css class
    const statusValue = item.var5
    const price = `$${(item.var3 / 100).toFixed(2)}` // Price
    const quantity = item.var4 // Quantity

    function toTitleCase(str) {
        return str.toLowerCase().split(' ').map(function(word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
      }

    const cardDetails = [
        { id: 1, title: 'Name', value: name},
        { id: 2, title: 'Price', value: price, class: 'gray', status: status},
        { id: 3, title: 'Quantity', value: quantity},
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
      <button className={`order-customer-card-btn ${status}`}>{statusValue}</button>
    </div>
    <div className="product-card-image-details-container">
      <div>
      <img src={Cannabis}/>
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
  </div>
  )
}
