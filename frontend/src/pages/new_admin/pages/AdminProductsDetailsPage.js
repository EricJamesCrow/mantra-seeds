import React from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

// styles
import './AdminOrdersDetailsPage.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Cannabis from "../../../images/cannabis-leaf-green.svg"

export default function AdminCustomersDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate();
  const { products } = useSelector(state => state.products)
  const product = products.find(p => p._id === id)

  const name = product.name
  const price = `$${(product.price / 100).toFixed(2)}`
  const chakra = product.chakra
  const strain = product.strain
  const thc = product.thc
  const description = product.description

  const cardDetails = [
    { id: 1, title: "Name", value: name, class: 'gray', },
    { id: 2, title: "Price", value: price},
    { id: 3, title: "Quantity", value: "5", class: 'gray'},
    { id: 4, title: "Chakra", value: chakra},
    { id: 5, title: "Strain", value: strain, class: 'gray'},
    { id: 6, title: "THC", value: thc},
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
      <div>{name}</div>
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
          <div>{description}</div>
        </div>
        <div className="order-details-button-container">
          <button className="order-details-button pending">Edit Product Details</button>
          <button className="order-details-button canceled">Delete Product</button>
        </div>
      </div>
    </div>
  )
}
