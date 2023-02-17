import React from 'react'

// styles
import './AddProduct.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

// chakra ui
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { Textarea } from '@chakra-ui/react'
import { CheckIcon } from "@chakra-ui/icons";
import { Select } from '@chakra-ui/react'


export default function AddProduct( { setShowAddProduct }) {
    const handleClose = () => {
        setShowAddProduct(false);
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
<form className="add-product-form">
  <div className="form-group">
    <label>Product Name</label>
    <Input variant='outline' className="add-product-input"/>
  </div>
  <div className="form-group">
    <label>Description</label>
    <Textarea style={{ marginTop: "0.5rem"}} />
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
    <Input placeholder='Enter amount' />
    {/* <InputRightElement children={<CheckIcon color='green.500' />} /> */}
  </InputGroup>
  </div>
  <div style={{ marginRight: "1rem"}}>
    <label style={{ paddingBottom: "0.5rem"}}>Chakra</label>
    <Select placeholder="Select" style={{ marginRight: "2rem"}}>
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
</form>
</div>
  )
}
