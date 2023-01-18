import React, { useEffect } from 'react'
import { useProductsContext } from "../../../hooks/useProductsContext";

// styles
import './Overview.css'

// components 
import Order from "../components/Order"
import Product from "../components/Product"

const PRODUCTS_API_URL = '/api/products/'

export default function Overview() {
  const {products, dispatchProducts} = useProductsContext()

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

  return (
    <>
    <div className="recent-orders">
      <div className="recent-orders-div">Recent Orders</div>
      <Order/>
      <button className="recent-orders-button">See all</button>
    </div>
    <div className="recent-orders">
      <div className="recent-orders-div">Recent Products</div>
      {
      products && products.slice(0, 1).map(item => (
        <Product key={item.id} item={item} className="product-item" />
      ))
      }
      <button className="recent-orders-button">See all</button>
    </div>
    </>
  )
}
