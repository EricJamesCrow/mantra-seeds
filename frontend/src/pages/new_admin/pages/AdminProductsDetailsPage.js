import React, { useState, useEffect } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProduct } from '../../../redux/slices/productSlice';

// styles
import './AdminOrdersDetailsPage.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

// components
import EditProduct from '../components/EditProduct'

// loading
import Loading from '../../../components/loading/loading'

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

  useEffect(() => {
    // Disable scrollbar when AddProduct is visible
    const overlay = document.querySelector('.admin-products-overlay');
    overlay.classList.toggle('show', showEditProduct);
    if (showEditProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup the effect
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showEditProduct]);

  const { products } = useSelector(state => state.products)
  const user = useSelector(state => state.auth.user);
  if (!products) return <Loading/>; // only render once redux is loaded

  const product = products.find(p => p._id === id)
  const token = user.token

  if(!product) return <Loading/>;
  const name = product.name
  const price = `$${(product.price / 100).toFixed(2)}`
  const chakra = product.chakra
  const description = product.description
  const quantity = product.quantity

  const inStock = quantity > 0;

  const cardDetails = [
    { id: 1, title: "Name", value: name, class: 'gray', },
    { id: 2, title: "Price", value: price},
    { id: 3, title: "Quantity", value: quantity, class: 'gray'},
    { id: 4, title: "Chakra", value: chakra},
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
      <button className="details-page-btn" onClick={() => navigate(-1)} aria-label="Go back to previous page">
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
        <div>{name}</div>
        <button className={`order-customer-card-btn ${inStock ? 'active' : 'inactive'}`}>{inStock ? "In Stock": "Out of Stock"}</button>
        </div>
        <div className="order-customer-card-details-container">
        <div className="product-card-image-details-container-desktop products">
        <img src={product.image} alt={product.name}/>
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
    </div>
    {showEditProduct &&
      <div className="admin-products-add-product-container">
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
