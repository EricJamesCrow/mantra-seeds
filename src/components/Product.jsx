// styles
import "./Product.css"

// images
import Cannabis from "../images/cannabis-leaf-green.svg"
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function Product( {item} ) {
  return (
    <div className="product">
        <img src={Cannabis}/>
        <div className="product-container">
        <div className="add-to-cart">
        <FontAwesomeIcon className="cart-icon" icon={faCartPlus} style={{color: "#ECEBE8"}}></FontAwesomeIcon>
        <div className="add-to-cart-text">Add to Cart</div>
        </div>
        <div className="product-price">{`$${item.price}`}</div>
        </div>
    </div>
  )
}
