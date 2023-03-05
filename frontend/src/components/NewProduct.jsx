import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

// hooks
import useAddToCart from '../hooks/useAddToCart';

// styles
import './NewProduct.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function NewProduct( { product } ) {
    const price = (product.price/100).toFixed(2);
    const user = useSelector(state => state.auth.user);
    const { addToCart } = useAddToCart();

  return (
    <Link to={`/shop/products/${product._id}`} style={{ textDecoration: "none", color: "inherit"}}>
        <div className="product-card-container">
        <img src={product.image} className="product-card-image"/>
        <div className="product-card-info-container">
            <div className="rating">
                {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    style={{
                        color: index < 4 ? "#669c54" : "#E2E8F0",
                        fontSize: "0.8rem",
                    }}
                    />
                ))}
                <div className="num-of-reviews">12 reviews</div>
            </div>
            <div>{product.name}</div>
            <div>{`$${price}`}</div>
            <button className="add-to-cart-btn" onClick={(event) => {
        event.preventDefault(); // prevent the link from navigating
        addToCart(user.id, product._id, 1, product.price);
      }}>Add to Cart</button>
        </div>
        </div>
    </Link>
  )
}
