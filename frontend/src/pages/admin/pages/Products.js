import React, { useEffect, useState } from 'react'

// styles
import "./Products.css"

// components
import Product from "../components/Product"
import AddProductModel from '../components/AddProductModel';


export default function Products( { products }) {
  const [showAddProduct, setShowAddProduct] = useState(() => {
    // retrieve showAddProduct value from localStorage on initial render
    return localStorage.getItem('showAddProduct') === 'true';
  });

  useEffect(() => {
    // update localStorage with the current value of showAddProduct
    localStorage.setItem('showAddProduct', showAddProduct);
  }, [showAddProduct]); // only update localStorage when showAddProduct changes

  const handleClick = () => {
    setShowAddProduct(!showAddProduct) 
  }

  useEffect(() => {
    // when showAddProduct is true, disable scrolling
    if (showAddProduct) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [showAddProduct])

  return (
    <>
      <div className="add-product-btn-container">
        <button className="add-product-btn" onClick={handleClick}>Add Product</button>
      </div>
      {
        products && products.map( item => 
            <Product key={item.id} item={item} className="product-item"/> 
        )    
      }
      { showAddProduct && (
        <div style={{ position: 'fixed', top: 50, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
          <AddProductModel setShowAddProduct={setShowAddProduct}/>
        </div>
      )}
    </>
  )
}
