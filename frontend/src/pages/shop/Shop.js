// styles
import "./Shop.css"

// components
import Product from "../../components/Product"
import Sidebar from "../../components/Sidebar"

// react
import { useState, useEffect } from 'react';

// data
import products from "../../data/product_data";

export default function Store( { filter } ) {
  // dropdown menu
  // const [selected, setSelected] = useState("Sort by featured")
  // const [filter, setFilter] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

      
  return (
    <>
    <div className="store-container">
      <div className="store-products">
        <div className="store-product">
      {products.map(product => {
        if(filter.length !== 0) {
          if(filter.indexOf(product.chakra) !== -1 || filter.indexOf(product.strain) !== -1 || filter.indexOf(product.thc) !== -1) {
            return <Product key={product.id} item={product}/>
          }
        } else {
          return <Product key={product.id} item={product}/>
        }
        }
        ) }
        </div>
      </div>
    </div>
    </>
  )
}
