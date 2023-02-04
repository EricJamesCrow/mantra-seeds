import React from 'react'

// styles
import "./Orders.css"

// components 
import Order from "../components/Order"

export default function Orders( { products }) {
  return (
    <>
        {
      products && products.map( item => 
      <Order key={item.id}/> 
      )    
      }
    </>
  )
}
