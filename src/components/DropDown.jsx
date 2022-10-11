// styles
import "./DropDown.css"

// react
import ReactDom, { useState } from 'react'

// images
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function DropDown({ selected, setSelected }) {
    const [isActive, setIsActive] = useState(false)
    const options = ["Sort by featured", "Sort by newest", "Sort by price: high to low", "Sort by price: low to high"]

  return ReactDom.createPortal(
    <div className="dropdown">
        <div className="dropdown-btn" 
        onClick={(e) => setIsActive(!isActive)}>
            {selected}
            <FontAwesomeIcon icon={faCaretDown}/>
        </div>
        {isActive && (
        <div className="dropdown-content">
            {options.map((option) => (
                <div
                onClick={(e) => {
                    setSelected(option);
                    setIsActive(false);
                }}
                className="dropdown-item">
                    {option}
                </div>
            ))}
        </div>
        )}
    </div>
  )
}
