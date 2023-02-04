// styles
import "./Shop.css"

// components
import Product from "../../components/Product"

// react
import React from "react"
import { useEffect } from 'react';

//redux
import { useSelector } from 'react-redux'

export default function Store( { filter } ) {
  const products = useSelector(state => state.products.products);

  useEffect(() => {
    window.scrollTo(0, 0)
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
