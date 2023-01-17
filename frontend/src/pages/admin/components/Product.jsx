import React from 'react'
import { Link } from 'react-router-dom'

// styles
import "./Product.css"

// images
import Cannabis from "../../../images/cannabis-leaf-green.svg"

export default function Product( {item} ) {
  const price = (item.price/100).toFixed(2)
  return (
    <Link to={`/admin/products/${item._id}`} style={{ textDecoration: "none", color: "inherit" }}>
    <div className="recent-product">
    <div className="product-title">{item.name}</div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <img src={Cannabis} style={{ width: '60%', height: '60%', margin: 'auto' }} />
            <div style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="product-price">${price}</div>
                <button>More Info</button>
              </div>
            </div>
          </div>
        </div>
        </Link>
  )
}
