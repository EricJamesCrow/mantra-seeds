import React from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

// styles
import './AdminOrdersDetailsPage.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import defaultProfilePic from '../../../images/abstract-user-flat.svg'

export default function AdminCustomersDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate();
  const { customers } = useSelector(state => state.customers)
  if (!customers) return null; // TODO: add loading spinner
  const customer = customers.find(c => c._id === id)
  
  const email = customer.email
  const order = customer.order


  const cardDetails = [
    { id: 1, title: "Email", value: email, class: 'gray', },
    { id: 2, title: "Recent Order", value: order},
    { id: 3, title: "Number of Orders", value: "6", class: 'gray'},
    { id: 4, title: "Total Spent", value: "$1029.99"}
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
      <div>Customer: {email}</div>
      <button className={`order-customer-card-btn active`}>{"Active"}</button>
      </div>
      <div className="order-customer-card-details-container">
        <img src={defaultProfilePic} className="customer-details-profile-pic"/>
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
        <div className={`order-customer-card-details-order-details-address gray customer`}>
          <div>Shipping Address</div>
          <div>1024 Address, Santa Cruz CA
95065-9623, United States</div>
        </div>
        <div className="order-details-button-container">
          <button className="order-details-button delivered">Make Customer Admin</button>
          <button className="order-details-button canceled">Ban Customer</button>
        </div>
      </div>
    </div>
  )
}
