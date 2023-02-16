import React from 'react'

// styles
import './AddProduct.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

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
    <input/>
  </div>
  <div className="form-group">
    <label>Description</label>
    <input/>
  </div>
  <div className="form-group form-group-two-cols">
    <label>Price</label>
    <input/>
    <label>Chakra</label>
    <input/>
  </div>
</form>

</div>
  )
}
