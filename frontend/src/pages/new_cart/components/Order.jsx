import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

// chakra ui
import { Input } from '@chakra-ui/react'

// chakra ui
import { DeleteIcon } from '@chakra-ui/icons'

// lodash
import { debounce } from 'lodash';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, updateCart } from '../../../redux/slices/cartSlice'
import { setRemovedItem, setRemovedItemName } from '../../../redux/slices/notificationsSlice';
import { setError, setErrorName } from '../../../redux/slices/notificationsSlice';

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
            if(!response.ok) {
                dispatch(setError(true));
                dispatch(setErrorName('Requested quantity exceeds available stock.'));
                setTimeout(() => {
                    dispatch(setError(false));
                    dispatch(setErrorName(''));
                }, 3000);    
            }
    }, 500), [product]);

    const handleQuantityChange = (delta) => {
        setUpdatingSubtotal(true)
        const newQuantity = Math.max(1, quantity + delta);
        setQuantity(newQuantity);
        updateQuantity(newQuantity);
      };

          // quantity input functionality
    const handleInput = (e) => {
        const inputValue = parseInt(e.target.value, 10);
        if (inputValue > 0 && inputValue <= product.quantity) {
          setQuantity(inputValue); // Clear the input value
          updateQuantity(inputValue);
        }
      };

    const validateInput = (e) => {
        const inputValue = e.target.value;
        const isValid = inputValue >= 1 && inputValue <= product.quantity;
        if (!isValid) {
            e.target.value = inputValue.slice(0, -1); // Remove the last character if it's not valid
        }
        };

  return (
    <div className="cart-order-container">
        <div className="cart-order-details-container">
            <div>
                <Link to={`/shop/products/${item.product}`} style={{ textDecoration: "none"}} aria-label={`Link to ${product.name} details page`}>
                    <img src={product.image} alt={`${product.name} image`}/>
                </Link>
            </div>
            <div className="cart-order-details">
                <div className="details-wrapper">
                    <div>
                    <Link to={`/shop/products/${item.product}`} style={{ textDecoration: "none"}} aria-label={`Link to ${product.name} details page`}>{product.name}</Link>
                        <div>{`$${price}`}</div>
                    </div>
                    <div>
                        <DeleteIcon onClick={() => handleDelete(cart._id, product)} aria-label={`Delete ${product.name} from cart`}/>
                        <div className="order-adjust-quantity-container">
                            <div className="order-adjust-quantity">
                                <button className="order-adjust-quantity-btn" onClick={() => handleQuantityChange(-1)} aria-label={`Decrease quantity for ${product.name}`}>
                                    <div>-</div>
                                </button>
                                <Input placeholder={quantity} onInput={handleInput} onChange={validateInput} size='xs'/>
                                <button className="order-adjust-quantity-btn" onClick={() => handleQuantityChange(1)} aria-label={`Increase quantity for ${product.name}`}>
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
