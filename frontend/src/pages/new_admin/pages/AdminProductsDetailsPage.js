import React, { useState } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProduct } from '../../../redux/slices/productSlice';

// styles
import './AdminOrdersDetailsPage.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Cannabis from "../../../images/cannabis-leaf-green.svg"

// components
import EditProduct from '../components/EditProduct'

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

const PRODUCTS_API_URL = '/api/products/'

export default function AdminCustomersDetailsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const { id } = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [showEditProduct, setShowEditProduct] = useState(false);
  const { products } = useSelector(state => state.products)
  const user = useSelector(state => state.auth.user);
  if (!products) return null; // only render once redux is loaded

  const product = products.find(p => p._id === id)
  const token = user.token

  if(!product) return null
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

  const handleDelete =  async () => {
      const response = await fetch(PRODUCTS_API_URL + product._id, {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}` // set the authorization header
        }
    })
    const json = await response.json()

    if (response.ok) {
        dispatch(deleteProduct(json))
        navigate(-1); // Won't navigate to previous page if refresh is hit first.
    }
    
  }

  const handleUpdate = () => {
    setShowEditProduct(true)
  }

  return (
    <>
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
      <button className={`order-customer-card-btn active`}>{"In Stock"}</button>
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
          <button className="order-details-button pending" onClick={handleUpdate}>Edit Product Details</button>
          <button 
          className="order-details-button delete"
          onClick={onOpen}
          >Delete Product</button>
        </div>
      </div>
    </div>
    {showEditProduct &&
      <div style={{ position: 'fixed', top: '61px', left: 0, right: 0, zIndex: 1 }}>
      <EditProduct setShowEditProduct={setShowEditProduct} product={product}/>
      </div>}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this product? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
