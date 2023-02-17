import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createProduct } from '../../../redux/slices/productSlice';

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

export default function AddProduct( { setShowAddProduct }) {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch()
    const token = user.token;

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [chakra, setChakra] = useState('')

    const [error, setError] = useState(null)
    const [isActive, setIsActive] = useState(false);

    const handleClose = () => {
        setShowAddProduct(false);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (isActive && e.target === document.activeElement) {
    
      const product = { name, description, price: parseInt(price*100), chakra };
    
      const response = await fetch(PRODUCTS_API_URL, {
        method: "POST",
        headers: { 
          "Authorization": token,
          "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const json = await response.json();
    
      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        setName("");
        setDescription("");
        setPrice("");
        setChakra("");
        setError(null);
        console.log("new product added");
        dispatch(createProduct(json));
      }
    }

    };

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
        <div>Create Product</div>
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
    onChange={(e) => setName(e.target.value)}
    value={name}
    />
  </div>
  <div className="form-group">
    <label>Description</label>
    <Textarea 
    style={{ marginTop: "0.5rem"}}
    onChange={(e) => setDescription(e.target.value)}
    value={description}
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
      value={price} />
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
  onTransitionEnd={handleSubmit}>Create Product</button>
</div>
</form>
</div>
  )
}
