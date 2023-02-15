import React from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

// styles
import './AdminOrdersDetailsPage.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Cannabis from "../../../images/cannabis-leaf-green.svg"

export default function AdminOrdersDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate();
  const { products } = useSelector(state => state.products)
  const { orders } = useSelector(state => state.orders)
  const order = orders.find(o => o._id === id)

  const { firstName, lastName, state, city, street, zip } = order.address
  const formattedAddress = `<div><span style="display: inline-block">${firstName} ${lastName}</span><br>${street}<br>${city}, ${state} ${zip}<br>United States</div>`
  const orderNumber = order.orderNumber
  const customer = order.email
  const shippingMethod = order.shipping.delivery
  const shippingPrice = `$${order.shipping.price}`
  const orderTotal = `$${(order.total / 100).toFixed(2)}`
  const items = order.items

  const cardDetails = [
    { id: 1, title: "Customer", value: customer, class: 'gray', },
    { id: 2, title: "Payment Method", value: "Stripe"},
    { id: 3, title: "Payment Status", value: "Pending", class: 'gray', status: "pending"},
    { id: 4, title: "Delivery Status", value: "Not Shipped", status: "false"},
    { id: 5, title: "Shipping Method", value: shippingMethod, class: 'gray'},
    { id: 6, title: "Shipping Price", value: shippingPrice},
    { id: 7, title: "Order Total", value: orderTotal, class: 'gray'}
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
      <div>Order: #{orderNumber}</div>
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
        {items.map(item => (<div className="admin-order-details-page-order-details">
        <div>
        <img src={Cannabis}/>
        </div>
        <div>{products.find(p => p._id === item.product).name}</div>
        <div>${(item.price / 100).toFixed(2)}</div>
        <div>Quantity: {item.quantity}</div>
        </div>))}
        </div>
        <div className={`order-customer-card-details-order-details-address gray`}>
          <div>Shipping Address</div>
          <div dangerouslySetInnerHTML={{ __html: formattedAddress }}></div>
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
