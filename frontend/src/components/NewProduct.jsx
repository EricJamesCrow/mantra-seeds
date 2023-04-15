import React from 'react'
import { Link } from 'react-router-dom'

// hooks
import useAddToCart from '../hooks/useAddToCart';

// styles
import './NewProduct.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function NewProduct( { product } ) {
    const price = (product.price/100).toFixed(2);
    const { addToCart, loading, error } = useAddToCart();

    const inStock = product.quantity > 0;

  return (
        <div className="product-card-container">
        <Link to={`/shop/products/${product._id}`} style={{ textDecoration: "none", color: "inherit"}}>
        <img src={product.image} alt={product.image} className="product-card-image"/>
        </Link>
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
            <Link to={`/shop/products/${product._id}`} style={{ textDecoration: "none", color: "inherit"}}>{product.name}</Link>
            <div>{`$${price}`}</div>
            {inStock ? (<button disabled={loading} className="add-to-cart-btn" onClick={(event) => {
        event.preventDefault(); // prevent the link from navigating
        addToCart(product._id, 1, product.price);
      }}>Add to Cart</button>) : (<button disabled={true} className="add-to-cart-btn out-of-stock">Out of Stock</button>)}
      {error && <div className="error-message">{error}</div>}
        </div>
        </div>
  )
}
