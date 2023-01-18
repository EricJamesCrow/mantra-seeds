import React, { useEffect, useState } from 'react'
import { useProductsContext } from "../../../hooks/useProductsContext";

// styles
import "./Products.css"

// components
import Product from "../components/Product"
import AddProductModel from '../components/AddProductModel';

const PRODUCTS_API_URL = '/api/products/'

export default function Products() {
  const {products, dispatchProducts} = useProductsContext()

  const [showAddProduct, setShowAddProduct] = useState(() => {
    // retrieve showAddProduct value from localStorage on initial render
    return localStorage.getItem('showAddProduct') === 'true';
  });

  useEffect(() => {
    // update localStorage with the current value of showAddProduct
    localStorage.setItem('showAddProduct', showAddProduct);
  }, [showAddProduct]); // only update localStorage when showAddProduct changes

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(PRODUCTS_API_URL)
      const json = await response.json()

      if (response.ok) {
        dispatchProducts({type: 'SET_PRODUCTS', payload: json})
      }
    }

    fetchProducts()
  }, [])

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
