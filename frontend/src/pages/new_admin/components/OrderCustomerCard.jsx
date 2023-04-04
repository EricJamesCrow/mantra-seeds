import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { NavLink } from 'react-router-dom'

// styles
import './OrderCustomerCard.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function OrderCustomerCard( { item } ) {
    const desktop = useMediaQuery('(min-width:980px)');

    const cardId = item.cardId
    const var1 = item.var1
    const var2 = item.var2
    const var3 = item.id === 'order' ? `$${(item.var3 / 100).toFixed(2)}` : item.id === 'customer' ? item.var3 : null
    const var4 = item.var4
    const var5 = item.var5

    function getVar4Value(status) {
      if (status === 'Not Shipped') {
        return 'false';
      } else if (status === 'Shipped') {
        return 'pending';
      } else if (status === 'Delivered') {
        return 'true';
      }
      return undefined;
    }
  
    const var4value = getVar4Value(var4);

    function toTitleCase(str) {
        return str.toLowerCase().split(' ').map(function(word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
      }

    const title1 = item.id === 'order' ? 'Customer' : item.id === 'customer' ? 'Email' : null
    const title2 = item.id === 'order' ? 'Payment Status' : item.id === 'customer' ? 'Recent Order' : null
    const title3 = item.id === 'order' ? 'Order Total' : item.id === 'customer' ? 'Number of Orders' : null
    const title4 = item.id === 'order' ? 'Delivery Status' : item.id === 'customer' ? 'Total Spent' : null

    const cardDetails = [
        { id: 1, title: title1, value: var1, class: 'gray', },
        { id: 2, title: title2, value: var5, status: item.id === 'order' ? var2 : null},
        { id: 3, title: title3, value: var3, class: 'gray'},
        { id: 4, title: title4, value: var4, status: item.id === 'order' ? var4value : null}
      ]

  return (
    <NavLink to={`/admin/${item.id}s/${cardId}`}>
    {!desktop && <div className="order-customer-card-container">
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
        <div>{item.id === 'order' ? `#${item.orderNumber}` : item.cardId}</div>
        <button className={`order-customer-card-btn ${var2}`}>{toTitleCase(var2)}</button>
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
    </div>}
    {desktop &&
        <div className="admin-desktop-sort order-customer-card-desktop">
        <div>{cardId}</div>
        <div>{item.dateCreated}</div>
        {cardDetails.map(item => (
          <div>
            {item.status &&
            <div className={`circle ${item.status}`}></div>
            }
          <div>{item.value}</div>
          </div>
        ))
        }
        <div className="order-customer-card-id-btn-container">
        <button className={`order-customer-card-btn ${var2}`}>{toTitleCase(var2)}</button>
        </div>
        </div>
    }
    </NavLink>
  )
}
