import React from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive';

// hooks
import useUpdateDeliveryStatus from '../../../hooks/useUpdateDeliveryStatus'

// styles
import './AdminOrdersDetailsPage.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

// loading
import Loading from '../../../components/loading/loading'

export default function AdminOrdersDetailsPage() {
  const { loading, error, updateDeliveryStatus } = useUpdateDeliveryStatus();
  const isDesktop = useMediaQuery({ minWidth: 980 });
  const { id } = useParams()
  const navigate = useNavigate();
  const products  = useSelector(state => state.products.products)
  const { orders } = useSelector(state => state.orders)

  if(!orders || !products) return <Loading/> // This is needed to prevent the page from crashing when the orders are not loaded yet.
  const order = orders.find(o => o._id === id)

  const { firstName, lastName, state, city, street, zip } = order.address
  const formattedAddress = `<div><span style="display: inline-block">${firstName} ${lastName}</span><br>${street}<br>${city}, ${state} ${zip}<br>United States</div>`
  const orderNumber = order.orderNumber
  const customer = order.email
  const paymentMethod = order.transaction.paymentMethod
  const paymentStatus = mapStatusToFriendlyStatus(order.transaction.status)
  const deliveryStatus = order.deliveryStatus
  const shippingMethod = order.shipping.delivery
  const shippingPrice = `$${order.shipping.price}`
  const orderTotal = `$${(order.total / 100).toFixed(2)}`
  const items = order.items

  function getDeliveryStatusValue(status) {
    if (status === 'Not Shipped') {
      return 'false';
    } else if (status === 'Shipped') {
      return 'pending';
    } else if (status === 'Delivered') {
      return 'true';
    }
    return undefined;
  };

  function mapStatusToFriendlyStatus(status) {
    if (status === 'PAYMENT.CAPTURE.COMPLETED') {
      return 'Paid';
    }
    return status;
  }
  

  const deliveryStatusValue = getDeliveryStatusValue(deliveryStatus);

  const cardDetails = [
    { id: 1, title: "Customer", value: customer, class: 'gray', },
    { id: 2, title: "Payment Method", value: paymentMethod},
    { id: 3, title: "Payment Status", value: paymentStatus, class: 'gray', status: paymentStatus.toLowerCase()},
    { id: 4, title: "Delivery Status", value: deliveryStatus, status: deliveryStatusValue},
    { id: 5, title: "Shipping Method", value: shippingMethod, class: 'gray'},
    { id: 6, title: "Shipping Price", value: shippingPrice},
    { id: 7, title: "Order Total", value: orderTotal, class: 'gray'}
  ]

  const handleUpdateDeliveryStatus = async (deliveryStatus) => {
    await updateDeliveryStatus(id, deliveryStatus);
  };

  return (
    !isDesktop ? (
      <div className="admin-orders-details-page-container">
      <button className="details-page-btn" onClick={() => navigate(-1)} aria-label='Go back to previous page'>
      <FontAwesomeIcon 
        icon={faChevronLeft} 
        style={{
            color: "#BCBDBC",
            fontSize: "1.15rem",
            cursor: "pointer"}}
        />
      </button>
      <div className="admin-order-details-wrapper">
          <div className="order-customer-card-id-btn-container">
          <div>Order: #{orderNumber}</div>
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
            <div className={`order-customer-card-details`}>
              <div>Order</div>
            </div>
            <div className='admin-order-details-page-order-images-container'>
            {items.map(item => (<div className="admin-order-details-page-order-details">
            <div>
            <img src={products.find(p => p._id === item.product).image} alt={products.find(p => p._id === item.product).name}/>
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
            <button className="order-details-button shipped" onClick={() => handleUpdateDeliveryStatus("Shipped")} disabled={loading}>Mark Order as Shipped</button>
            <button className="order-details-button delivered" onClick={() => handleUpdateDeliveryStatus("Delivered")} disabled={loading}>Mark Order as Delivered</button>
            <button className="order-details-button canceled">Mark Order as Canceled</button>
          </div>
          </div>
      </div>
    </div>) : (
              <div className="admin-orders-details-page-container">
              <button className="details-page-btn" onClick={() => navigate(-1)} aria-label='Go back to previous page'>
              <FontAwesomeIcon 
                icon={faChevronLeft} 
                style={{
                    color: "#BCBDBC",
                    fontSize: "1.15rem",
                    cursor: "pointer"}}
                />
              </button>
              <div className="admin-order-details-wrapper-order">
                  <div className="first-wrapper-admin-orders">
                    <div className="order-customer-card-id-btn-container">
                    <div>Order: #{orderNumber}</div>
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
                      <div className={`order-customer-card-details`}>
                        <div>Order</div>
                      </div>
                      <div className='admin-order-details-page-order-images-container'>
                      {items.map(item => (<div className="admin-order-details-page-order-details">
                      <div>
                      <img src={products.find(p => p._id === item.product).image} alt={products.find(p => p._id === item.product).name}/>
                      </div>
                      <div>{products.find(p => p._id === item.product).name}</div>
                      <div>${(item.price / 100).toFixed(2)}</div>
                      <div>Quantity: {item.quantity}</div>
                      </div>))}
                      </div>
                  </div>
                </div>
                <div className="second-wrapper-admin-orders">
                  <div className={`order-customer-card-details-order-details-address gray`}>
                    <div>Shipping Address</div>
                    <div dangerouslySetInnerHTML={{ __html: formattedAddress }}></div>
                  </div>
                  <div className="order-details-button-container">
                    <button className="order-details-button shipped" onClick={() => handleUpdateDeliveryStatus("Shipped")} disabled={loading}>Mark Order as Shipped</button>
                    <button className="order-details-button delivered" onClick={() => handleUpdateDeliveryStatus("Delivered")} disabled={loading}>Mark Order as Delivered</button>
                    <button className="order-details-button canceled">Mark Order as Canceled</button>
                  </div>
                </div>  
              </div>
          </div>)
  )
}