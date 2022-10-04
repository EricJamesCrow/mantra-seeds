// styles
import "./Shop.css"

// components
import Product from "../../components/Product"
import DropDown from "../../components/DropDown"
import Sidebar from "../../components/Sidebar"

// react
import { useState } from 'react';

// data
import products from "../../data/product_data";

export default function Store() {
  // dropdown menu
  const [selected, setSelected] = useState("Sort by featured")
      
  return (
    <div className="store-container">
      <Sidebar/>
      <div className="store-header">Choose Your Seeds</div>
      <div className="store-products">
        <DropDown selected={selected} setSelected={setSelected}/>
        <div className="store-product">
      {products.map(product => (
          <Product
          key={product.id}
          item={product}
          />
        ))}
        </div>
      </div>
    </div>
  )
}
