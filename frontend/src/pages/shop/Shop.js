// styles
import "./Shop.css"

// components
import Product from "../../components/Product"

// react
import React from "react"

// react
import { useEffect } from 'react';
import { useProductsContext } from "../../hooks/useProductsContext";

export default function Store( { filter } ) {
  const {products, dispatch} = useProductsContext()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
    <div className="store-container">
      <div className="store-products">
        <div className="store-product">
      {products && products.map(product => {
        if(filter.length !== 0) {
          if(filter.indexOf(product.chakra) !== -1 || filter.indexOf(product.strain) !== -1 || filter.indexOf(product.thc) !== -1) {
            return <Product key={product._id} item={product}/>
          }
        } else {
          return <Product key={product._id} item={product}/>
        }
        }
        ) }
        </div>
      </div>
    </div>
    </>
  )
}
