import React from 'react'
import { useNavigate} from 'react-router-dom'

// styles
import './AdminOrdersDetailsPage.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Cannabis from "../../../images/cannabis-leaf-green.svg"

export default function AdminCustomersDetailsPage() {
  const navigate = useNavigate();

  const cardDetails = [
    { id: 1, title: "Name", value: "Watermelon Seeds", class: 'gray', },
    { id: 2, title: "Price", value: "$45.99"},
    { id: 3, title: "Quantity", value: "5", class: 'gray'},
  ]

  return (
    <div className="admin-orders-details-page-container">
      <button className="details-page-btn" onClick={() => navigate(-1)}>
      <FontAwesomeIcon 
        icon={faChevronLeft} 
        style={{
            color: "#BCBDBC",
            fontSize: "1.15rem",
            cursor: "pointer"}}
        />
      </button>
      <div className="order-customer-card-id-btn-container">
      <div>Watermelon Seeds</div>
      <button className={`order-customer-card-btn active`}>{"Active"}</button>
      </div>
      <div className="order-customer-card-details-container">
      <div className="product-card-image-details-container-desktop products">
      <img src={Cannabis}/>
      </div>
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
        <div className={`order-customer-card-details-order-details-address gray product`}>
          <div>Description</div>
          <div>Pro cu veri mediocrem, cum ea suas omnis justo. Quo nulla soleat cetero eu, nam debet invidunt cu.</div>
        </div>
        <div className="order-details-button-container">
          <button className="order-details-button pending">Edit Product Details</button>
          <button className="order-details-button canceled">Delete Product</button>
        </div>
      </div>
    </div>
  )
}
