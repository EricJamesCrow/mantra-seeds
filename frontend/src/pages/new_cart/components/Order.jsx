import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

// chakra ui
import { DeleteIcon } from '@chakra-ui/icons'

// lodash
import { debounce } from 'lodash';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, updateCart } from '../../../redux/slices/cartSlice'
import { setRemovedItem, setRemovedItemName } from '../../../redux/slices/notificationsSlice';

// hooks
import { useCart } from '../../../hooks/useCart'

// styles
import './Order.css'

const CARTS_API_URL = '/api/carts/'
const PRODUCTS_API_URL = '/api/products/'

export default function Order( {item, user, setUpdatingSubtotal }) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const [product, setProduct] = useState('')
    const price = (item.price/100).toFixed(2)
    const [quantity, setQuantity] = useState(item.quantity);
    const { handleDelete } = useCart();
  
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

    const updateQuantity = useCallback(
        debounce(async (newQuantity) => {
            const response = await fetch(CARTS_API_URL + cart._id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product: product._id,
                    quantity: newQuantity,
                }),
            });
            const json = await response.json();
            if (!response.ok) {
            // Show an error message if the update fails
            console.error('Failed to update cart item quantity');
            }
            if(response.ok) {
                dispatch(updateCart(json));
                setUpdatingSubtotal(false)
            }
    }, 500), [product]);

    const handleQuantityChange = (delta) => {
        setUpdatingSubtotal(true)
        const newQuantity = Math.max(1, quantity + delta);
        setQuantity(newQuantity);
        updateQuantity(newQuantity);
      };

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
                        <DeleteIcon onClick={() => handleDelete(cart._id, product)}/>
                        <div className="order-adjust-quantity-container">
                            <div className="order-adjust-quantity">
                                <button className="order-adjust-quantity-btn" onClick={() => handleQuantityChange(-1)}>
                                    <div>-</div>
                                </button>
                                <div>{quantity}</div>
                                <button className="order-adjust-quantity-btn" onClick={() => handleQuantityChange(1)}>
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
