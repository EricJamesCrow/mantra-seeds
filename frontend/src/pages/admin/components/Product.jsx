import React from 'react'

// styles
import "./Product.css"

// images
import Cannabis from "../../../images/cannabis-leaf-green.svg"

export default function Product() {
  return (
    <div className="recent-product">
    <div className="product-title">Indica Seeds</div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <img src={Cannabis} style={{ width: '60%', height: '60%', margin: 'auto' }} />
            <div style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>$11.99</div>
                <button>More Info</button>
              </div>
            </div>
          </div>
        </div>
  )
}
