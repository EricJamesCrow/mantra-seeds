// styles
import "./Filter.css"

// react
import { useState, forwardRef, useImperativeHandle} from 'react';

const Filters = forwardRef(({ product, content, closeMenu, updateFilter }, ref) => {
    const [clicked, setClicked] = useState(false)
    const [classHeight, setClassHeight] = useState("50px")

    useImperativeHandle(ref, () =>({
      callChildFunction() {
          setClicked(false)
          setClassHeight("50px")
      }
    }))

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
          closeMenu()
          setClicked(true)
          expandClass()
        } else if(clicked === true) {
          setClicked(false)
          setClassHeight("50px")
        }
      }

    const handleChange = (event, stuff) => {
      if (event.target.checked) {
        updateFilter(stuff.text)
      } else {
        updateFilter('')
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
            <input type="checkbox" onChange={(e) => handleChange(e, stuff)}/>
            <img src={stuff.image} style={ product !== "Chakra" ? {borderRadius: "none", border: "none"}: null}/>
            <div style={{ color: stuff.textColor }}>{stuff.text}</div>
            </div>
            ))}
          </div>
          </div>
  )
})

export default Filters
