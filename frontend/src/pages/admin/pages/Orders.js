import React, { useEffect } from 'react'
import { useProductsContext } from "../../../hooks/useProductsContext";

// styles
import "./Orders.css"

// components 
import Order from "../components/Order"

const PRODUCTS_API_URL = '/api/products/'

export default function Orders() {
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
        {
      products && products.map( item => 
      <Order key={item.id}/> 
      )    
      }
    </>
  )
}
