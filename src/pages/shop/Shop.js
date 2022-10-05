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
  const [filter, setFilter] = useState([])

  const updateFilter = term => {
    var index = filter.indexOf(term);
    if(index !== -1) {
      var filterFiltered = filter.filter(v => v !== term)
      setFilter(filterFiltered)
    } else {
      setFilter(prevArray => [...prevArray, term])
    }
  }
      
  return (
    <div className="store-container">
      <Sidebar
      updateFilter={updateFilter}
      />
      <div className="store-header">Choose Your Seeds</div>
      <div className="store-products">
        <div className="store-buttons-container">
        <button className="filter-products-mobile">
          <div>Filter Products</div>
          <div className="filter-products-mobile-plus">+</div>
        </button>
        <DropDown selected={selected} setSelected={setSelected}/>
        </div>
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
  )
}
