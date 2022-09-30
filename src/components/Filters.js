// styles
import "./Filter.css"

// react
import { useState } from 'react';

export default function Filters({ product, content }) {
    const [clicked, setClicked] = useState(false)
    const [classHeight, setClassHeight] = useState("50px")

    const expandClass = () => {
      if (product === "Chakra") {
        return setClassHeight("520px")
      } else if(product === "Strain") {
        return setClassHeight("255px")
      } else if(product === "THC") {
        return setClassHeight("455px")
      }
    }

    const expandMenu = () => {
        if(clicked === false) {
          setClicked(true)
          expandClass()
        } else {
          setClicked(false)
          setClassHeight("50px")
        }
      }

  return (
    <div key={product} 
          className={clicked ? "filter-products-button-expanded" : "filter-products-button"} style={ {height: classHeight }}>
            <div className="filter-container" onClick={expandMenu}>
          <button>{product}</button>
          <div>+</div>
          </div>
          <div>
            {content.map(stuff => (
                <div className="filter-list-container">
            <input type="checkbox"/>
            <img src={stuff.image}/>
            <div style={{ color: stuff.textColor }}>{stuff.text}</div>
            </div>
            ))}
          </div>
          </div>
  )
}
