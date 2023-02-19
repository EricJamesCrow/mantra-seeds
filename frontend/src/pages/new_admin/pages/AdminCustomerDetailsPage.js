import React from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

// styles
import './AdminOrdersDetailsPage.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import defaultProfilePic from '../../../images/abstract-user-flat.svg'

// chakra ui
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from '@chakra-ui/react'

export default function AdminCustomersDetailsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
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
          <button className="order-details-button delete" onClick={onOpen}>Ban Customer</button>
        </div>
      </div>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Ban Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to ban this customer? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onClose} ml={3}>
                Ban
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  )
}
