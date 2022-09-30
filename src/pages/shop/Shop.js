// styles
import "./Shop.css"

// chakras
import Crown from "../../images/chakras/crown-chakra.svg"
import ThirdEye from "../../images/chakras/third-eye-chakra.svg"
import Throat from "../../images/chakras/throat-chakra.svg"
import Heart from "../../images/chakras/heart-chakra.svg"
import Solar from "../../images/chakras/solar-chakra.svg"
import Sacral from "../../images/chakras/sacral-chakra.svg"
import Root from "../../images/chakras/root-chakra.svg"

// components
import Product from "../../components/Product"
import Filters from "../../components/Filters"

// react
import { useState, useEffect } from 'react';

export default function Store() {
  const productCategories = ["Chakra", "Strain", "THC"]

  const products = {"Chakra": [{"id": "1", "image": Crown, "text": "Crown", "textColor": "#8f009c"}, {"id": "2", "image": ThirdEye, "text": "ThirdEye", "textColor": "#00489c"},
  {"id": "3", "image": Throat, "text": "Throat", "textColor": "#00b5db"}, {"id": "4", "image": Heart, "text": "Heart", "textColor": "#8cbf00"}, {"id": "5", "image": Solar, "text": "Solar", "textColor": "#e3c101"},
  {"id": "6", "image": Sacral, "text": "Sacral", "textColor": "#ff9200"}, {"id": "7", "image": Root, "text": "Root", "textColor": "#e60000"}], "Strain": [{"id": "1", "image": Crown, "text": "Sativa", "textColor": "#8f009c"}, {"id": "2", "image": ThirdEye, "text": "Indica", "textColor": "#00489c"},
  {"id": "3", "image": Throat, "text": "Hybird", "textColor": "#00b5db"}], "THC": [{"id": "1", "image": Crown, "text": "Delta-9", "textColor": "#8f009c"}, {"id": "2", "image": ThirdEye, "text": "Delta-8", "textColor": "#00489c"},
  {"id": "3", "image": Throat, "text": "Delta-10", "textColor": "#00b5db"}, {"id": "4", "image": Heart, "text": "THCa", "textColor": "#8cbf00"}, {"id": "5", "image": Solar, "text": "THCv", "textColor": "#e3c101"},
  {"id": "6", "image": Sacral, "text": "THCp", "textColor": "#ff9200"}]}

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
           {productCategories.map(product => (
            <Filters
              product={product}
              content={products[product]}            />
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
      {productCategories.map(product => (
          <Product/>
        ))}
        </div>
      </div>
    </div>
  )
}
