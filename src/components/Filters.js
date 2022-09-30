// styles
import "./Filter.css"

// react
import { useState } from 'react';

export default function Filters({ product }) {
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
          className={clicked ? "filter-products-button-expanded" : "filter-products-button"} 
          onClick={expandMenu}>
          <button>{product}</button>
          <div>+</div>
          </div>
  )
}
