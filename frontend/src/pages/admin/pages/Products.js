import React, { useEffect } from 'react'
import { useProductsContext } from "../../../hooks/useProductsContext";

// styles
import "./Products.css"

// components
import Product from "../components/Product"

export default function Products() {
  const {products, dispatch} = useProductsContext()

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_PRODUCTS', payload: json})
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
    <div className="add-product-btn-container">
    <button className="add-product-btn">Add Product</button>
    </div>
    {
      products.map( item => 
        <div>
      <Product key={item.id} item={item}  className="product-item"/> 
      </div>
      )    
      }
    </>
  )
}
