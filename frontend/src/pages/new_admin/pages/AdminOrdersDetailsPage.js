import React from 'react'
import { useNavigate} from 'react-router-dom'

// styles
import './AdminOrdersDetailsPage.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Cannabis from "../../../images/cannabis-leaf-green.svg"

export default function AdminOrdersDetailsPage() {
  const navigate = useNavigate();

  const cardDetails = [
    { id: 1, title: "Customer", value: "EricCrow@pm.me", class: 'gray', },
    { id: 2, title: "Payment Method", value: "Stripe"},
    { id: 3, title: "Payment Status", value: "Pending", class: 'gray', status: "pending"},
    { id: 4, title: "Delivery Status", value: "Not Shipped", status: "false"},
    { id: 5, title: "Shipping Method", value: "USPS Priority Express", class: 'gray'},
    { id: 6, title: "Shipping Price", value: "$51.50"},
    { id: 7, title: "Order Total", value: "$202.11", class: 'gray'}
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
      <div>Order: #MS23021708</div>
      <button className={`order-customer-card-btn active`}>{"Active"}</button>
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
        <div className={`order-customer-card-details`}>
          <div>Order</div>
        </div>
        <div className='admin-order-details-page-order-images-container'>
        {cardDetails.slice(0, 2).map(item => (<div className="admin-order-details-page-order-details">
        <div>
        <img src={Cannabis}/>
        </div>
        <div>Sativa Seeds</div>
        <div>Quantity: 3</div>
        </div>))}
        </div>
        <div className={`order-customer-card-details-order-details-address gray`}>
          <div>Shipping Address</div>
          <div>1024 Address, Santa Cruz CA
95065-9623, United States</div>
        </div>
        <div className="order-details-button-container">
          <button className="order-details-button shipped">Mark Order as Shipped</button>
          <button className="order-details-button delivered">Mark Order as Delivered</button>
          <button className="order-details-button canceled">Mark Order as Canceled</button>
        </div>
      </div>
    </div>
  )
}
