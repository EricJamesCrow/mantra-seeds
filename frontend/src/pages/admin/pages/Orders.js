import React, { useEffect } from 'react'
import { useProductsContext } from "../../../hooks/useProductsContext";

// styles
import "./Orders.css"

// components 
import Order from "../components/Order"

export default function Orders() {
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
        {
      products.map( item => 
        <div>
      <Order key={item.id}/> 
      </div>
      )    
      }
    </>
  )
}
