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

// images
import Cannabis from "../../images/cannabis-outline.svg"

// components
import Product from "../../components/Product"
import Filters from "../../components/Filters"
import DropDown from "../../components/DropDown"

// react
import { useState, useEffect, useRef } from 'react';

export default function Store() {
  // dropdown menu
  const [selected, setSelected] = useState("Sort by featured")
  const productCategories = ["Chakra", "Strain", "THC"]

  // products information 
  const products = {"Chakra": [{"id": "1", "image": Crown, "text": "Crown", "textColor": "#8f009c"}, {"id": "2", "image": ThirdEye, "text": "ThirdEye", "textColor": "#00489c"},
  {"id": "3", "image": Throat, "text": "Throat", "textColor": "#00b5db"}, {"id": "4", "image": Heart, "text": "Heart", "textColor": "#8cbf00"}, {"id": "5", "image": Solar, "text": "Solar", "textColor": "#e3c101"},
  {"id": "6", "image": Sacral, "text": "Sacral", "textColor": "#ff9200"}, {"id": "7", "image": Root, "text": "Root", "textColor": "#e60000"}], "Strain": [{"id": "1", "image": Cannabis, "text": "Sativa", "textColor": "#46b430"}, {"id": "2", "image": Cannabis, "text": "Indica", "textColor": "#46b430"},
  {"id": "3", "image": Cannabis, "text": "Hybird", "textColor": "#46b430"}], "THC": [{"id": "1", "image": Cannabis, "text": "Delta-9", "textColor": "#46b430"}, {"id": "2", "image": Cannabis, "text": "Delta-8", "textColor": "#46b430"},
  {"id": "3", "image": Cannabis, "text": "Delta-10", "textColor": "#46b430"}, {"id": "4", "image": Cannabis, "text": "THCa", "textColor": "#46b430"}, {"id": "5", "image": Cannabis, "text": "THCv", "textColor": "#46b430"},
  {"id": "6", "image": Cannabis, "text": "THCp", "textColor": "#46b430"}]}

  const [stickyClass, setStickyClass] = useState("store-sidebar");

  const ChildRef = useRef([]);

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

    const closeMenu = () => {
        ChildRef.Chakra.callChildFunction()
        ChildRef.Strain.callChildFunction()
        ChildRef.THC.callChildFunction()
    }
    
    
  return (
    <div className="store-container">
      <div className={stickyClass} style={{ paddingTop: stickyClass[0], position: stickyClass[1] }}>
        <div className="filter-products-container">
          <div className="filter-products-label">Filter Products</div>
          <div className="filter-products-buttons">
           {productCategories.map(product => (
            <Filters
              key={product}
              ref={theRef => ChildRef[product] = theRef}
              product={product}
              content={products[product]}
              closeMenu={closeMenu}/>
            ))}
          </div>
        </div>
      </div>
      <div className="store-header">Choose Your Seeds</div>
      <div className="store-products">
        <DropDown selected={selected} setSelected={setSelected}/>
        <div className="store-product">
      {productCategories.map(product => (
          <Product
          key={product}
          />
        ))}
        </div>
      </div>
    </div>
  )
}
