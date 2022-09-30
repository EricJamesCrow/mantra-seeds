// styles
import "./Shop.css"

// images
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// components
import Product from "../../components/Product"
import Filters from "../../components/Filters"

// react
import { useState, useEffect } from 'react';

export default function Store() {
    const products = ["Chakra", "Strain", "THC"]
    const [stickyClass, setStickyClass] = useState("store-sidebar");

    useEffect(() => {
      window.addEventListener('scroll', whatsWindowHeight);
  
      return () => {
        window.removeEventListener('scroll', whatsWindowHeight);
      };
    }, []);

    const whatsWindowHeight = () => {
      let windowHeight = window.scrollY;
      windowHeight > 170 ? setStickyClass('store-sidebar-sticky') : setStickyClass("store-sidebar");
      };
    
    
  return (
    <div className="store-container">
      <div className={stickyClass} style={{ paddingTop: stickyClass[0], position: stickyClass[1] }}>
        <div className="filter-products-container">
          <div className="filter-products-label">Filter Products</div>
          <div className="filter-products-buttons">
           {products.map(product => (
            <Filters
              product={product}
            />
           ))}
          </div>
        </div>
        {/* <div className="categories">
          <div className="category">
        <FontAwesomeIcon icon={faEye} style={{ fontSize: "50px", color: "#5E044F" }}/>
        <div style={{ color: "#5E044F" }}>View All</div>
        </div>
        </div>
          {chakras.map(chakra => (
            <div className="categories">
              <div className="category">
            <img src={chakra.image}/>
            <div style={ { color: chakra.textColor } }>{chakra.text}</div>
            </div>
            </div>
          ))} */}
      </div>
      <div className="store-header">Choose Your Seeds</div>
      <div className="store-products">
        <div className="store-product">
      {products.map(product => (
          <Product/>
        ))}
        </div>
      </div>
    </div>
  )
}
