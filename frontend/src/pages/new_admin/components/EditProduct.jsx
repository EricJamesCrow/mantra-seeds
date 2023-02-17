import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom'
import { updateProduct } from '../../../redux/slices/productSlice';

// styles
import './AddProduct.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

// chakra ui
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Textarea } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'

const PRODUCTS_API_URL = '/api/products/'

export default function AddProduct( { setShowEditProduct, product }) {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const token = user.token;

    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [chakra, setChakra] = useState(product.chakra)

    const [error, setError] = useState(null)
    const [isActive, setIsActive] = useState(false);

    const handleClose = () => {
        setShowEditProduct(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isActive && e.target === document.activeElement) {
        const response = await fetch(PRODUCTS_API_URL + product._id, {
          method: 'PATCH',
          headers: { 
            "Authorization": token,
            "Content-Type": "application/json" },
          body: JSON.stringify({ name, description, price, chakra})
        })
        const json = await response.json()
      
        if (response.ok) {
          dispatch(updateProduct(json))
          navigate(-1) // Won't navigate to previous page if refresh is hit first.
        }
    }
      }

    function handleMouseDown() {
      setIsActive(true);
    }
  
    function handleMouseUp() {
      setIsActive(false);
    }

  return (
    <div className="add-product-container">
    <div className="admin-container-add-product">
    <div>
        <div>Edit Product</div>
        <FontAwesomeIcon 
            icon={faX} 
            style={{
                color: "#000000",
                fontSize: "1.6rem",
                cursor: "pointer"}}
            onClick={handleClose}
            />
        </div>
        <div>
    <span></span>
    </div>
</div>
<form className="add-product-form" onSubmit={(e) => e.preventDefault}>
  <div className="form-group">
    <label>Product Name</label>
    <Input 
    variant='outline' 
    className="add-product-input"
    placeholder={product.name}
    onChange={(e) => setName(e.target.value)}
    placeholder={name}
    />
  </div>
  <div className="form-group">
    <label>Description</label>
    <Textarea 
    style={{ marginTop: "0.5rem"}}
    placeholder={product.description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder={description}
     />
  </div>
  <div className="form-group-two-cols">
    <div>
    <label>Price</label>
    <InputGroup style={{ width: "85%", marginTop: "0.5rem"}}>
    <InputLeftElement
      pointerEvents='none'
      color='gray.300'
      fontSize='1.2em'
      children='$'
    />
    <Input placeholder='Enter amount'
      onChange={(e) => setPrice(e.target.value)}
      placeholder={price} />
    {/* <InputRightElement children={<CheckIcon color='green.500' />} /> */}
  </InputGroup>
  </div>
  <div style={{ marginRight: "1rem"}}>
    <label style={{ paddingBottom: "0.5rem"}}>Chakra</label>
    <Select placeholder="Select" style={{ marginRight: "2rem"}}  onChange={(e) => setChakra(e.target.value)}
      value={chakra}>
        <option value='root'>Root</option>
        <option value='sacral'>Sacral</option>
        <option value='solar'>Solar</option>
        <option value='heart'>Heart</option>
        <option value='throat'>Throat</option>
        <option value='third-eye'>Third Eye</option>
        <option value='crown'>Crown</option>
    </Select>
    </div>
  </div>
  <div className="order-details-button-container create-product">
  <button 
  type="button"
  className="order-details-button create-product"
  onMouseDown={handleMouseDown}
  onMouseUp={handleMouseUp}
  onTransitionEnd={handleSubmit}>Save Changes</button>
</div>
</form>
</div>
  )
}
