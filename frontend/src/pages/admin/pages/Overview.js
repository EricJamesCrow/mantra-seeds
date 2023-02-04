import React, { useEffect } from 'react'

// styles
import './Overview.css'

// components 
import Order from "../components/Order"
import Product from "../components/Product"

export default function Overview( { products } ) {

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
