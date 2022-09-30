// styles
import "./Filter.css"

// react
import { useState } from 'react';

// chakras
import Crown from "../images/chakras/crown-chakra.svg"
import ThirdEye from "../images/chakras/third-eye-chakra.svg"
import Throat from "../images/chakras/throat-chakra.svg"
import Heart from "../images/chakras/heart-chakra.svg"
import Solar from "../images/chakras/solar-chakra.svg"
import Sacral from "../images/chakras/sacral-chakra.svg"
import Root from "../images/chakras/root-chakra.svg"

export default function Filters({ product }) {
    const chakras = [{"id": "1", "image": Crown, "text": "Crown", "textColor": "#8f009c"}, {"id": "2", "image": ThirdEye, "text": "ThirdEye", "textColor": "#00489c"},
    {"id": "3", "image": Throat, "text": "Throat", "textColor": "#00b5db"}, {"id": "4", "image": Heart, "text": "Heart", "textColor": "#8cbf00"}, {"id": "5", "image": Solar, "text": "Solar", "textColor": "#e3c101"},
    {"id": "6", "image": Sacral, "text": "Sacral", "textColor": "#ff9200"}, {"id": "7", "image": Root, "text": "Root", "textColor": "#e60000"}]
    
    const [clicked, setClicked] = useState(false)

    const expandMenu = () => {
        if(clicked === false) {
          setClicked(true)
        } else {
          setClicked(false)
        }
        console.log(clicked)
      }

  return (
    <div key={product} 
          className={clicked ? "filter-products-button-expanded" : "filter-products-button"} >
            <div className="filter-container" onClick={expandMenu}>
          <button>{product}</button>
          <div>+</div>
          </div>
          <div>
            {chakras.map(chakra => (
                <div className="filter-list-container">
            <input type="checkbox"/>
            <img />
            <div>{chakra.text}</div>
            </div>
            ))}
          </div>
          </div>
  )
}
