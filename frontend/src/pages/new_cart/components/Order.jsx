import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// chakra ui
import { DeleteIcon } from '@chakra-ui/icons'

// redux
import { useDispatch } from 'react-redux';
import { deleteItem } from '../../../redux/slices/cartSlice'

// styles
import './Order.css'

const CARTS_API_URL = '/api/carts/'
const PRODUCTS_API_URL = '/api/products/'

export default function Order( {item, user }) {
    const dispatch = useDispatch();
    const [product, setProduct] = useState('')
    const price = (item.price/100).toFixed(2)
  
    useEffect(() => {
      const url = PRODUCTS_API_URL+item.product;
      fetch(url)
          .then((response) => {
              return response.json();
          })
          .then((data) => {
              setProduct(data)
          })
  }, [])
  
    const handleDelete = async () => { 
      const response = await fetch(CARTS_API_URL+item._id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user:  user.id,
            product: product._id
        })
    });
      const json = await response.json(); // need to refactor backend so the response is the cart object
      if(response.ok) {
        dispatch(deleteItem(json));
      }
    }

  return (
    <div className="cart-order-container">
        <div className="cart-order-details-container">
            <div>
                <Link to={`/shop/products/${item.product}`} style={{ textDecoration: "none"}}>
                    <img src={product.image}/>
                </Link>
            </div>
            <div className="cart-order-details">
                <div className="details-wrapper">
                    <div>
                    <Link to={`/shop/products/${item.product}`} style={{ textDecoration: "none"}}>{product.name}</Link>
                        <div>{`$${price}`}</div>
                    </div>
                    <div>
                        <DeleteIcon onClick={handleDelete}/>
                        <div className="order-adjust-quantity-container">
                            <div className="order-adjust-quantity">
                                <button className="order-adjust-quantity-btn">
                                    <div>-</div>
                                </button>
                                <div>{item.quantity}</div>
                                <button className="order-adjust-quantity-btn">
                                    <div>+</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
